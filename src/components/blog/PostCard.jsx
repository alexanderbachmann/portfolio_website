import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/posts';

/* Server component: formatDate comes from the server-only posts lib, so
   this must never be imported from a 'use client' file. Shared by the
   blog index and the home page's latest-writing section. */
export default function PostCard({ post, headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <Link href={`/blog/${post.slug}`} className="card post-card" data-spotlight>
      <div className="post-card-meta">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>
      <Heading className="post-card-title">{post.title}</Heading>
      <p className="post-card-description">{post.description}</p>
      <div className="post-card-footer">
        {post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="post-card-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
