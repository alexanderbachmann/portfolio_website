import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { getAllPosts, getPost, formatDate } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { site } from '@/data/site';

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
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
      publishedTime: post.date,
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
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: site.name, url: site.url },
    url: `${site.url}/blog/${post.slug}`,
  };

  return (
    <main className="section blog-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="blog-post-header">
        <Link href="/blog" className="blog-back">
          ← All posts
        </Link>
        <div className="post-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1>{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </article>
    </main>
  );
}
