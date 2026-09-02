import PostCard from '@/components/blog/PostCard';
import BlogOwnerBar from '@/components/blog/BlogOwnerBar';
import { getAllPosts } from '@/lib/posts';
import { sections } from '@/data/site';

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
  const copy = sections.writing;

  return (
    <main className="section blog-index">
      <header className="blog-index-header">
        <p className="blog-index-eyebrow">{copy.eyebrow}</p>
        <h1 className="blog-index-title">{copy.pageTitle}</h1>
        <p className="blog-index-intro">{copy.description}</p>
        <BlogOwnerBar />
      </header>

      {posts.length === 0 ? (
        <p className="blog-empty">No posts yet. Check back soon.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
