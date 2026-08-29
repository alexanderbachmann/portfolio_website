'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Linkedin, Github, BookOpen } from 'lucide-react';
import CartoonJanio from './CartoonJanio';
import { metrics, site } from '@/data/site';
import './hero.css';

const socials = [
  { href: 'https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/alexanderbachmann', icon: Github, label: 'GitHub' },
  {
    href: 'https://www.kaggle.com/janiobachmann',
    label: 'Kaggle',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
      </svg>
    ),
  },
  { href: 'https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann', icon: BookOpen, label: 'GoodReads' },
];

const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }
    let frame;
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, shouldReduceMotion]);

  return <span ref={ref}>{count}</span>;
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          <motion.p className="hero-kicker" {...fadeUp(0)}>
            {site.role}
          </motion.p>

          <motion.h1 className="hero-name" {...fadeUp(0.1)}>
            Janio Martinez <span className="hero-name-accent">Bachmann</span>
          </motion.h1>

          <motion.p className="hero-description" {...fadeUp(0.2)}>
            Data without ownership is just noise. I take products from vision
            to scalable adoption&mdash;aligning teams, shaping strategy, and
            building solutions designed to grow with the business.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.3)}>
            <Link href="/#contact" className="hero-btn hero-btn--primary">
              Get in touch
            </Link>
            <Link href="/blog" className="hero-btn hero-btn--ghost">
              Read the blog
            </Link>
            <div className="hero-socials">
              {socials.map(({ href, icon: Icon, svg, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  title={label}
                  aria-label={label}
                >
                  {svg || <Icon size={18} />}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl className="hero-stats" {...fadeUp(0.45)}>
            {metrics.map((stat) => (
              <div key={stat.label} className="hero-stat" title={stat.description}>
                <dd className="hero-stat-value">
                  <AnimatedNumber target={stat.value} />
                  {stat.suffix}
                </dd>
                <dt className="hero-stat-label">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="cartoon-janio-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, -8, 0] }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
        >
          <CartoonJanio />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
