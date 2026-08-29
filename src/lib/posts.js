import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function parsePost(filename) {
  const slug = filename.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? null,
    tags: data.tags ?? [],
    draft: data.draft ?? false,
    cover: data.cover ?? null,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parsePost)
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  const safe = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  const file = ['.mdx', '.md']
    .map((ext) => path.join(POSTS_DIR, `${safe}${ext}`))
    .find((p) => fs.existsSync(p));

  if (!file) return null;

  const post = parsePost(path.basename(file));
  return post.draft ? null : post;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
