import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/posts';
import PostArticle from '@/components/blog/PostArticle';

export const metadata = { title: 'Preview' };

/* Owner-only preview of any post (drafts included), rendered exactly like
   the public page. Gated by proxy.js and the dashboard layout. */
export default async function PreviewPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return <PostArticle post={post} preview />;
}
