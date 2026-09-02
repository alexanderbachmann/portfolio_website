'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'motion/react';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import { experiences } from '@/data/experiences';
import { sections } from '@/data/site';
import './experience.css';

const isCurrent = (exp) => /present/i.test(exp.period);

const Experience = () => {
  const railRef = useRef(null);
  /* 0 when the top of the list crosses 70% of the viewport, 1 when its
     bottom does: the rail fills just ahead of the reader. Reduced motion
     is handled in CSS (a full rail), so the render never branches on the
     client-only media query and hydration stays clean. */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 70%'],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const copy = sections.experience;

  return (
    <div className="experience-container">
      <SectionHeading
        index={copy.index}
        eyebrow={copy.eyebrow}
        description={copy.description}
      >
        <HighlightedTitle text={copy.title} highlight={copy.highlight} />
      </SectionHeading>

      <ol className="timeline" ref={railRef}>
        <span className="timeline-rail" aria-hidden="true" />
        <motion.span
          className="timeline-progress"
          aria-hidden="true"
          style={{ scaleY: fill }}
        />

        {experiences.map((exp, index) => {
          const current = isCurrent(exp);
          return (
            <motion.li
              key={`${exp.company}-${exp.period}`}
              className={`timeline-item${current ? ' timeline-item--current' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.06 }}
            >
              <div className="timeline-when">
                <span className="timeline-period">{exp.period}</span>
                <span className="timeline-location">{exp.location}</span>
              </div>

              <span className="timeline-node" aria-hidden="true">
                <Image src={exp.logo} alt="" width={40} height={40} />
              </span>

              <article className="card timeline-card" data-spotlight>
                <header className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                  {current && <span className="timeline-badge">Current</span>}
                </header>

                <p className="timeline-meta">
                  <span>
                    <MapPin size={14} aria-hidden="true" />
                    {exp.location}
                  </span>
                  <span>
                    <Calendar size={14} aria-hidden="true" />
                    {exp.period}
                  </span>
                </p>

                <ul className="timeline-bullets">
                  {exp.description.map((item) => (
                    <li key={item}>
                      <ChevronRight size={14} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

export default Experience;
