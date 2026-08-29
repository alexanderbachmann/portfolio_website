'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import SqlQuery from './cards/SqlQuery';
import ProfileCard from './cards/ProfileCard';
import CatDashboard from './cards/CatDashboard';
import BookCard from './cards/BookCard';
import ExportCV from './cards/ExportCV';
import './bio-grid.css';

/* d3/topojson geometry + react-tooltip are DOM-dependent — client-only */
const CountriesMap = dynamic(() => import('./cards/CountriesMap'), {
  ssr: false,
});

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const cards = [
  { key: 'map', area: 'map', Component: CountriesMap },
  { key: 'sql', area: 'sql', Component: SqlQuery },
  { key: 'profile', area: 'profile', Component: ProfileCard },
  { key: 'cat', area: 'cat', Component: CatDashboard },
  { key: 'book', area: 'book', Component: BookCard },
  { key: 'cv', area: 'cv', Component: ExportCV },
];

const BioGrid = () => {
  return (
    <section className="bio-grid-section dot-pattern-bg">
      <div className="bio-grid-wrapper">
        <motion.p
          className="bio-grid-intro"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          A few things about how I work and who I am:
        </motion.p>

        <div className="bio-grid">
          {cards.map(({ key, area, Component }, i) => (
            <motion.div
              key={key}
              className="bio-card"
              style={{ gridArea: area }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <Component />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BioGrid;
