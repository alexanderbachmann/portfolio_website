'use client';

import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import './reading-progress.css';

/* Scroll-linked bar across the top of a post. Orange is allowed: it is an
   active indicator, like the nav highlight. Under reduced motion it still
   tracks scroll (it is information, not decoration) but without the spring. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
