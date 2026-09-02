'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { navLinks, site } from '@/data/site';
import OwnerOnly from '@/components/admin/OwnerOnly';
import './nav.css';

/* Every home section, not only the ones with a nav link: while the reader
   is in Skills or Recognition no link is highlighted, instead of the
   previous section staying lit. */
const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'accomplishments', 'writing', 'contact'];
const SCROLL_THRESHOLD = 24;
/* --nav-top + --nav-h in px: the hero CTA counts as gone once it slides
   under the pill. */
const NAV_OFFSET = 64;

const indicatorSpring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 };

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const activeSectionRef = useRef('about');
  const scrolledRef = useRef(false);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const updateActive = useCallback((id) => {
    if (activeSectionRef.current !== id) {
      activeSectionRef.current = id;
      setActiveSection(id);
    }
  }, []);

  /* Scroll-spy, home only. */
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

  /* Scrolled look. The state starts false on server and client and only
     changes after mount, so hydration never mismatches. */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      if (scrolledRef.current !== next) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* One orange CTA per viewport: while the hero's primary button is on
     screen the nav CTA stays ghost. Hero.jsx marks that button with
     data-hero-cta. */
  useEffect(() => {
    if (!isHome) return;
    const target = document.querySelector('[data-hero-cta]');
    if (!target) {
      setHeroCtaVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { rootMargin: `-${NAV_OFFSET}px 0px 0px 0px` }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isHome]);

  /* Drawer: body scroll lock, Escape, focus in and back out. */
  useEffect(() => {
    if (!isMenuOpen) return;
    const drawer = drawerRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (drawer?.contains(document.activeElement)) {
        toggle?.focus();
      }
    };
  }, [isMenuOpen]);

  /* Close on route change. Hash-only changes keep the pathname, so the
     links also close it on click. */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /* The admin area has its own bar. */
  if (pathname.startsWith('/admin')) return null;

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) => {
    if (href.startsWith('/#')) {
      return isHome && activeSection === href.slice(2);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const ctaPrimary = !isHome || !heroCtaVisible;

  return (
    <>
      <nav className={clsx('nav', scrolled && 'nav--scrolled')} aria-label="Primary">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          JMB
        </Link>

        <ul className="nav-links">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label} className="nav-item">
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="nav-active"
                    transition={indicatorSpring}
                    aria-hidden="true"
                  />
                )}
                <Link
                  href={href}
                  className={clsx('nav-link', active && 'is-active')}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <OwnerOnly>
            <li className="nav-item">
              <Link href="/admin" className="nav-link">
                Write
              </Link>
            </li>
          </OwnerOnly>
        </ul>

        {/* The one orange element in the nav, and only once the hero's own
            primary CTA has scrolled away. */}
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx('btn', 'btn--sm', 'nav-cta', ctaPrimary ? 'btn--primary' : 'btn--ghost')}
        >
          Get in touch
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="nav-drawer"
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Overlay and drawer are siblings of the pill on purpose: the pill's
          backdrop-filter would make it the containing block for any
          position: fixed descendant. */}
      <div
        className={clsx('nav-overlay', isMenuOpen && 'is-open')}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="nav-drawer"
        ref={drawerRef}
        className={clsx('nav-drawer', isMenuOpen && 'is-open')}
        inert={!isMenuOpen}
      >
        <div className="nav-drawer-head">
          <span className="nav-drawer-brand">Menu</span>
          <button
            ref={closeRef}
            type="button"
            className="btn btn--icon nav-drawer-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="nav-drawer-list">
            {navLinks.map(({ label, href }, i) => (
              <li key={label} style={{ transitionDelay: isMenuOpen ? `${80 + i * 50}ms` : '0ms' }}>
                <Link
                  href={href}
                  className={clsx('nav-drawer-link', isActive(href) && 'is-active')}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
            <OwnerOnly>
              <li style={{ transitionDelay: isMenuOpen ? `${80 + navLinks.length * 50}ms` : '0ms' }}>
                <Link href="/admin" className="nav-drawer-link" onClick={closeMenu}>
                  Write
                </Link>
              </li>
            </OwnerOnly>
          </ul>
        </nav>

        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary nav-drawer-cta"
          onClick={closeMenu}
        >
          Get in touch
        </a>
      </div>
    </>
  );
};

export default NavBar;
