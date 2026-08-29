'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/data/site';
import './nav.css';

const SECTION_IDS = ['about', 'experience', 'projects', 'contact'];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const activeSectionRef = useRef('about');
  const pathname = usePathname();
  const isHome = pathname === '/';

  const updateActive = useCallback((id) => {
    if (activeSectionRef.current !== id) {
      activeSectionRef.current = id;
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, updateActive]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) => {
    if (href.startsWith('/#')) {
      return isHome && activeSection === href.slice(2);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          JMB
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={isActive(href) ? 'active' : ''}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="nav-cta">
              Get in touch
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="nav-mobile-close" onClick={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <ul>
          {navLinks.map(({ label, href }, i) => (
            <li key={label} style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
              <Link
                href={href}
                className={isActive(href) ? 'active' : ''}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
          <li style={{ transitionDelay: `${(navLinks.length + 1) * 0.08}s` }}>
            <Link href="/#contact" className="nav-cta" onClick={closeMenu}>
              Get in touch
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}
    </nav>
  );
};

export default NavBar;
