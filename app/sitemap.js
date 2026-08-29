import { getAllPosts } from '@/lib/posts';
import { site } from '@/data/site';

export default function sitemap() {
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/blog`, lastModified: new Date() },
    ...posts,
  ];
}
