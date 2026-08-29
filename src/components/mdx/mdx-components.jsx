import Link from 'next/link';
import CopyButton from './CopyButton';
import Callout from './Callout';

const slugify = (children) =>
  String(children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const heading = (Tag) => {
  const Heading = ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <Tag id={id} {...props}>
        <a href={`#${id}`} className="prose-anchor">
          {children}
        </a>
      </Tag>
    );
  };
  Heading.displayName = `MdxHeading(${Tag})`;
  return Heading;
};

export const mdxComponents = {
  h2: heading('h2'),
  h3: heading('h3'),
  a: ({ href = '', children, ...props }) => {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  pre: CopyButton,
  Callout,
};
