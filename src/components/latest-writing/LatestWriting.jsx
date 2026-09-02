import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import PostCard from '@/components/blog/PostCard';
import { sections } from '@/data/site';
import './latest-writing.css';

/* Server component (PostCard needs the server-only posts lib). Renders
   nothing when nothing is published, so the home page has no empty slot. */
export default function LatestWriting({ posts = [] }) {
  if (posts.length === 0) return null;
  const copy = sections.writing;

  return (
    <section id="writing" className="latest-writing">
      <div className="latest-writing-wrapper">
        <div className="latest-writing-header">
          <SectionHeading
            index={copy.index}
            eyebrow={copy.eyebrow}
            description={copy.description}
          >
            <HighlightedTitle text={copy.title} highlight={copy.highlight} />
          </SectionHeading>
          <Link href="/blog" className="btn btn--ghost btn--sm latest-writing-all">
            {copy.allPosts}
          </Link>
        </div>

        <ul className="latest-writing-grid">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
