import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';
import { experiences } from '../../data/experiences';
import SectionHeading from '../shared/SectionHeading';
import './experience.css';

const Experience = () => {
  const [expanded, setExpanded] = useState(new Set());

  const toggle = (index) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <div className="experience-container">
      <SectionHeading subtitle="Where I've built, analyzed, and delivered">
        Experience
      </SectionHeading>

      <div className="exp-timeline">
        {experiences.map((exp, index) => {
          const isExpanded = expanded.has(index);
          const isFirst = index === 0;

          return (
            <motion.div
              key={index}
              className={`exp-item ${isFirst ? 'exp-item--current' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              {/* Node dot */}
              <div className="exp-node" />

              <div className="exp-card">
                {/* Top row: date badge */}
                <div className="exp-card-top">
                  <span className="exp-date">{exp.period}</span>
                </div>

                {/* Company header */}
                <div className="exp-header">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="exp-logo"
                    />
                  )}
                  <div>
                    <h3 className="exp-company">{exp.company}</h3>
                    <p className="exp-role">
                      {exp.role}
                      <span className="exp-location">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Description — first bullet always visible */}
                <ul className="exp-bullets">
                  <li>{exp.description[0]}</li>
                </ul>

                {/* Remaining bullets — expand/collapse */}
                <AnimatePresence initial={false}>
                  {isExpanded && exp.description.length > 1 && (
                    <motion.ul
                      className="exp-bullets"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      {exp.description.slice(1).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Toggle */}
                {exp.description.length > 1 && (
                  <button
                    className="exp-toggle"
                    onClick={() => toggle(index)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
