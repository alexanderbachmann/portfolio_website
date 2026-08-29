'use client';

import React from 'react';
import SectionHeading from '../shared/SectionHeading';
import AccomplishmentCard from './AccomplishmentCard';
import { accomplishments } from '../../data/accomplishments';
import './accomplishments.css';

const Accomplishments = () => {
  return (
    <section className="accomplishments-section">
      <div className="accomplishments-wrapper">
        <SectionHeading subtitle="Career highlights and community impact">
          Accomplishments
        </SectionHeading>

        <div className="accomplishments-grid">
          {accomplishments.map((item, i) => (
            <AccomplishmentCard key={item.id} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;