import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '@/lib/posts';
import PostArticle from '@/components/blog/PostArticle';
import { site } from '@/data/site';

/* ISR: served from cache, refreshed hourly as a safety net, and
   revalidated immediately by every admin save/publish/delete. */
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (err) {
    console.warn('generateStaticParams: skipping prerender,', err.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      ...(post.coverUrl ? { images: [post.coverUrl] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: site.name, url: site.url },
    url: `${site.url}/blog/${post.slug}`,
    ...(post.coverUrl ? { image: post.coverUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostArticle post={post} />
    </>
  );
}
