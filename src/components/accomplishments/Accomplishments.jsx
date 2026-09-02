'use client';

import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import AccomplishmentCard from './AccomplishmentCard';
import { accomplishments } from '@/data/accomplishments';
import { sections } from '@/data/site';
import './accomplishments.css';

const Accomplishments = () => {
  const copy = sections.accomplishments;

  return (
    <div className="accomplishments-section">
      <div className="accomplishments-wrapper">
        <SectionHeading index={copy.index} eyebrow={copy.eyebrow}>
          <HighlightedTitle text={copy.title} highlight={copy.highlight} />
        </SectionHeading>

        <div className="accomplishments-grid">
          {accomplishments.map((item, i) => (
            <AccomplishmentCard key={item.id} data={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accomplishments;
