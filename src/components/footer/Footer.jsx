'use client';

import React from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">{site.shortName}</span>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/blog">Blog</Link>
          <a href="/rss.xml">RSS</a>
        </nav>
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
