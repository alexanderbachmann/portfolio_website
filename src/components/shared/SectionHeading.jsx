import React from 'react';
import { motion } from 'motion/react';

const SectionHeading = ({ children, subtitle }) => (
  <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
    <motion.h2
      className="gradient-text"
      style={{ marginBottom: subtitle ? 'var(--space-sm)' : 0 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
