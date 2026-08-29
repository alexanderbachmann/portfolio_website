import Link from 'next/link';
import { formatDate } from '@/lib/posts';
import { renderPostHtml } from '@/lib/render-post-html';
import CodeCopyButtons from './CodeCopyButtons';
import OwnerOnly from '@/components/admin/OwnerOnly';

/* Shared renderer for the public post page and the owner's draft preview. */
export default async function PostArticle({ post, preview = false }) {
  const html = await renderPostHtml(post.contentHtml);
  const date = post.publishedAt ?? post.updatedAt;

  return (
    <main className="section blog-post">
      {preview && (
        <div className="blog-preview-banner" role="status">
          Draft preview, not public.{' '}
          <Link href={`/admin/posts/${post.id}`}>Back to editor</Link>
        </div>
      )}

      <header className="blog-post-header">
        {!preview && (
          <Link href="/blog" className="blog-back">
            ← All posts
          </Link>
        )}
        <div className="post-card-meta">
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          {!preview && (
            <OwnerOnly>
              <Link href={`/admin/posts/${post.id}`} className="blog-edit-link">
                Edit
              </Link>
            </OwnerOnly>
          )}
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
        {post.coverUrl && (
          <img className="blog-cover" src={post.coverUrl} alt="" />
        )}
      </header>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <CodeCopyButtons />
    </main>
  );
}
