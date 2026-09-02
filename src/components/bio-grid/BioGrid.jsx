'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import SqlQuery from './cards/SqlQuery';
import ProfileCard from './cards/ProfileCard';
import CatDashboard from './cards/CatDashboard';
import BookCard from './cards/BookCard';
import ExportCV from './cards/ExportCV';
import { sections } from '@/data/site';
import './bio-grid.css';

/* d3/topojson geometry + react-tooltip are DOM-dependent: client-only */
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

/* `key` doubles as the grid-area name (see bio-grid.css). */
const cards = [
  { key: 'map', Component: CountriesMap },
  { key: 'sql', Component: SqlQuery },
  { key: 'profile', Component: ProfileCard },
  { key: 'cat', Component: CatDashboard },
  { key: 'book', Component: BookCard },
  { key: 'cv', Component: ExportCV },
];

const BioGrid = () => {
  const copy = sections.about;

  return (
    <div className="bio-grid-section">
      <div className="bio-grid-wrapper">
        <SectionHeading
          index={copy.index}
          eyebrow={copy.eyebrow}
          description={copy.description}
        >
          <HighlightedTitle text={copy.title} highlight={copy.highlight} />
        </SectionHeading>

        <div className="bio-grid">
          {cards.map(({ key, Component }, i) => (
            /* The reveal wrapper keeps motion's inline transform off the
               glass card, so the card's own hover lift still works. */
            <motion.div
              key={key}
              className="bio-cell"
              style={{ gridArea: key }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className={`card bio-card bio-card--${key}`} data-spotlight>
                <div className="bio-card-body">
                  <Component />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BioGrid;
