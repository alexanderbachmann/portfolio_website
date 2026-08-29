'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { useOwner } from '@/components/admin/OwnerOnly';
import './footer.css';

const Footer = () => {
  const pathname = usePathname();
  const isOwner = useOwner();
  /* The admin area has its own chrome. */
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">{site.shortName}</span>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/blog">Blog</Link>
          <a href="/rss.xml">RSS</a>
          {/* The only way in for the owner. Visitors can open it, but the
              password gate and every admin action stay server-side.
              prefetch is off: this footer is on every public page, and
              /admin/login is dynamic, so prefetching it would run the proxy
              and a server render for every visitor who scrolls to the
              bottom, to warm a link only one person ever clicks. */}
          <Link
            href={isOwner ? '/admin' : '/admin/login'}
            prefetch={false}
            className="footer-owner-link"
          >
            {isOwner ? 'Write' : 'Sign in'}
          </Link>
        </nav>
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
