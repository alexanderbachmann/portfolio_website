import React from 'react';
import SectionHeading from '../shared/SectionHeading';
import FeaturedCard from './FeaturedCard';
import AccomplishmentCard from './AccomplishmentCard';
import { accomplishments } from '../../data/accomplishments';
import './accomplishments.css';

const Accomplishments = () => {
  const featured = accomplishments.find((a) => a.featured);
  const others = accomplishments.filter((a) => !a.featured);

  return (
    <section className="accomplishments-section dot-pattern-bg">
      <div className="accomplishments-wrapper">
        <SectionHeading subtitle="Career highlights and community impact">
          Accomplishments
        </SectionHeading>

        {featured && <FeaturedCard data={featured} />}

        {others.length > 0 && (
          <div className="accomplishments-grid">
            {others.map((item, i) => (
              <AccomplishmentCard key={item.id} data={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Accomplishments;
