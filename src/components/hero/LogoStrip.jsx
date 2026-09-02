'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { experiences } from '@/data/experiences';
import { hero } from '@/data/site';

/* One chip per employer, newest first, deduped by company name. */
const employers = experiences.filter(
  (exp, i, all) => all.findIndex((e) => e.company === exp.company) === i
);

/* The marquee (below 900px) needs the list twice; the copy is hidden from
   assistive tech and from the static row above 900px. */
const Chips = ({ hidden = false }) => (
  <ul className="logo-strip-list" aria-hidden={hidden || undefined}>
    {employers.map(({ company, logo }) => (
      <li key={company} className="logo-chip">
        <span className="logo-chip-mark">
          <Image src={logo} alt="" width={28} height={28} />
        </span>
        <span className="logo-chip-name">{company}</span>
      </li>
    ))}
  </ul>
);

const LogoStrip = () => (
  <motion.div
    className="logo-strip"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.65 }}
  >
    <p className="logo-strip-label">{hero.logoStripLabel}</p>
    <div className="logo-marquee">
      <div className="logo-marquee-track">
        <Chips />
        <Chips hidden />
      </div>
    </div>
  </motion.div>
);

export default LogoStrip;
