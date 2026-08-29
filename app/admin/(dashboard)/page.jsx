import Link from 'next/link';
import { getAllPostsForAdmin, formatDate } from '@/lib/posts';
import DeletePostButton from '@/components/admin/DeletePostButton';

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <main className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">janio@admin:~$ ls -la posts/</p>
          <h1>Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--primary">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="admin-empty">
          No posts yet.{' '}
          <Link href="/admin/posts/new">Write the first one.</Link>
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Published</th>
                <th>Updated</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="admin-table-title"
                    >
                      {post.title}
                    </Link>
                    <span className="admin-table-slug">/blog/{post.slug}</span>
                  </td>
                  <td>
                    <span className={`admin-pill admin-pill--${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="admin-table-date">
                    {post.publishedAt ? formatDate(post.publishedAt) : 'not yet'}
                  </td>
                  <td className="admin-table-date">
                    {formatDate(post.updatedAt)}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="admin-btn admin-btn--ghost"
                      >
                        Edit
                      </Link>
                      <a
                        href={
                          post.status === 'published'
                            ? `/blog/${post.slug}`
                            : `/admin/preview/${post.id}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="admin-btn admin-btn--ghost"
                      >
                        View
                      </a>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
