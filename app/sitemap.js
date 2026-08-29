import { getAllPosts } from '@/lib/posts';
import { site } from '@/data/site';

export const revalidate = 3600;

export default async function sitemap() {
  const posts = (await getAllPosts()).map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/blog`, lastModified: new Date() },
    ...posts,
  ];
}
