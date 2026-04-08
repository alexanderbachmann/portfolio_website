import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, BookOpen } from 'lucide-react';
import './hero.css';

const socials = [
  { href: 'https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/alexanderbachmann', icon: Github, label: 'GitHub' },
  {
    href: 'https://www.kaggle.com/janiobachmann',
    label: 'Kaggle',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
      </svg>
    ),
  },
  { href: 'https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann', icon: BookOpen, label: 'GoodReads' },
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Janio Martinez Bachmann
        </motion.h1>

        <motion.p
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Global Product Owner &middot; Data & BI
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Data without ownership is just noise. I take products from vision
          to scalable adoption&mdash;aligning teams, shaping strategy, and
          building solutions designed to grow with the business.
        </motion.p>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {socials.map(({ href, icon: Icon, svg, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              title={label}
            >
              {svg || <Icon size={20} />}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
