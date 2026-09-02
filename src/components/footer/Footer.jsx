'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { site, socials } from '@/data/site';
import { useOwner } from '@/components/admin/OwnerOnly';
import { socialIconByLabel } from '@/components/shared/socialIcons';
import './footer.css';

const Footer = () => {
  const pathname = usePathname();
  const isOwner = useOwner();
  /* The admin area has its own chrome. */
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Home">
            {site.shortName}
          </Link>
          <p className="footer-role">{site.role}</p>
        </div>

        <nav className="footer-social" aria-label="Social profiles">
          {socials.map(({ href, label }) => {
            const Icon = socialIconByLabel[label] || BookOpen;
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--icon"
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </nav>

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
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {site.name}
        </span>
        <span className="footer-meta">Built with Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
};

export default Footer;
