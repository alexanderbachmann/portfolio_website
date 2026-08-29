import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/posts';
import PostEditor from '@/components/admin/PostEditor';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  return { title: post ? `Edit: ${post.title}` : 'Edit post' };
}

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return <PostEditor key={post.id} post={post} />;
}
