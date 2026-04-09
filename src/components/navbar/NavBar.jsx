import React, { useState, useEffect, useRef, useCallback } from 'react';
import './nav.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Competencies', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const NavBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [activeSection, setActiveSection] = useState('about');
  const activeSectionRef = useRef('about');

  const updateActive = useCallback((id) => {
    if (activeSectionRef.current !== id) {
      activeSectionRef.current = id;
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href)
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
  }, [updateActive]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`nav ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <a href="#about" className="nav-logo" onClick={closeMenu}>
          JMB
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
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
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={label} style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="nav-overlay" onClick={closeMenu} />
      )}
    </nav>
  );
};

export default NavBar;
