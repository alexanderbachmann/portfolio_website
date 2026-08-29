import 'server-only';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
};

/* GitHub's schema plus the few tags BlockNote's HTML export uses. */
const schema = {
  ...defaultSchema,
  clobberPrefix: '',
  tagNames: [
    ...defaultSchema.tagNames,
    'u',
    'figure',
    'figcaption',
    'colgroup',
    'col',
  ],
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema.attributes.img ?? []), 'width', 'height'],
    col: ['span'],
  },
};

/* The post title is the page's h1; keep the document outline valid. */
function demoteH1() {
  return (tree) =>
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') node.tagName = 'h2';
    });
}

/* Images whose src the sanitizer rejected (data: URIs and the like) would
   otherwise render as broken image icons. */
function dropEmptyImages() {
  return (tree) =>
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img' && !node.properties?.src && parent) {
        parent.children.splice(index, 1);
        return index;
      }
      return undefined;
    });
}

/* Same behaviour the MDX renderer had: external links open safely. */
function externalLinks() {
  return (tree) =>
    visit(tree, 'element', (node) => {
      const href = node.properties?.href;
      if (node.tagName === 'a' && typeof href === 'string' && /^https?:\/\//.test(href)) {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener', 'noreferrer'];
      }
    });
}

const renderer = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, schema)
  .use(dropEmptyImages)
  .use(demoteH1)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: { className: ['prose-anchor'] },
  })
  .use(externalLinks)
  .use(rehypePrettyCode, prettyCodeOptions)
  .use(rehypeStringify);

const sanitizer = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, schema)
  .use(dropEmptyImages)
  .use(rehypeStringify);

const stripPlaceholders = (html) =>
  String(html ?? '').replace(/￼/g, '');

/** Full render for the public page (anchors, external links, shiki). */
export async function renderPostHtml(html) {
  const file = await renderer.process(stripPlaceholders(html));
  return String(file);
}

/** Save-time sanitization so the database never holds unsafe markup. */
export async function sanitizeHtml(html) {
  const file = await sanitizer.process(stripPlaceholders(html));
  return String(file);
}
