'use client';

import React from 'react';
import { motion } from 'motion/react';
import './section-heading.css';

const EASE = [0.22, 1, 0.36, 1];

/* <SectionHeading index="03" eyebrow="Experience" description="...">
     Where I've built and <span className="gradient-text">shipped</span>
   </SectionHeading>
   Back-compat: `title` prop or children; `subtitle` acts as description. */
const SectionHeading = ({
  index,
  eyebrow,
  title,
  description,
  subtitle,
  children,
  align = 'left',
  className = '',
}) => {
  const heading = title ?? children;
  const copy = description ?? subtitle;
  const classes = [
    'section-heading',
    copy ? 'section-heading--split' : '',
    align === 'center' ? 'section-heading--center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.header
      className={classes}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {(index || eyebrow) && (
        <p className="section-heading-eyebrow">
          {index && <span className="section-heading-index">{index}</span>}
          <span className="section-heading-rule" aria-hidden="true" />
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <h2 className="section-heading-title">{heading}</h2>
      {copy && <p className="section-heading-description">{copy}</p>}
    </motion.header>
  );
};

export default SectionHeading;
