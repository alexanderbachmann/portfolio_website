import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import BlogOwnerBar from '@/components/blog/BlogOwnerBar';

export const metadata = {
  title: 'Blog',
  description:
    'Writing on data products, ownership, and building things that scale.',
  alternates: { canonical: '/blog' },
};

/* ISR: refreshed hourly and immediately after every admin write. */
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="section blog-index">
      <header className="blog-index-header">
        <h1>Writing</h1>
        <p className="blog-index-intro">
          Notes on data products, ownership, and building things that scale.
        </p>
        <BlogOwnerBar />
      </header>

      {posts.length === 0 ? (
        <p className="blog-empty">No posts yet. Check back soon.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="post-card">
                <div className="post-card-meta">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="post-card-title">{post.title}</h2>
                <p className="post-card-description">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="post-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
