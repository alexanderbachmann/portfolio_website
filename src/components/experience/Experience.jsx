import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
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

      <div className="exp-terminal">
        {/* Chrome bar */}
        <div className="exp-terminal-chrome">
          <div className="exp-chrome-dots">
            <span className="exp-dot exp-dot--red" />
            <span className="exp-dot exp-dot--yellow" />
            <span className="exp-dot exp-dot--green" />
          </div>
          <span className="exp-chrome-title">experience.log</span>
          <div className="exp-chrome-spacer" />
        </div>

        {/* Terminal body */}
        <div className="exp-terminal-body">
          {/* Initial command */}
          <motion.div
            className="exp-cmd"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="exp-prompt">$</span> cat experience.log
          </motion.div>

          {/* Experience entries */}
          {experiences.map((exp, index) => {
            const isExpanded = expanded.has(index);
            const isFirst = index === 0;

            return (
              <motion.div
                className="exp-entry"
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
              >
                {/* Header: logo + [period] Company/Role */}
                <div className="exp-entry-header">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="exp-entry-logo"
                    />
                  )}
                  <span className="exp-entry-period">[{exp.period}]</span>
                  <span className="exp-entry-path">
                    {exp.company.replace(/\s+/g, '')}
                    <span className="exp-entry-slash">/</span>
                    <span className="exp-entry-role">
                      {exp.role.replace(/\s+/g, '')}
                    </span>
                  </span>
                </div>

                {/* Meta lines */}
                <div className="exp-entry-meta">
                  <motion.div
                    className="exp-meta-line"
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.1 + 0.06 }}
                  >
                    <span className="exp-meta-key">&gt; location:</span>{' '}
                    {exp.location}
                  </motion.div>
                  <motion.div
                    className="exp-meta-line"
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.1 + 0.12 }}
                  >
                    <span className="exp-meta-key">&gt; status:</span>{' '}
                    {isFirst ? (
                      <span className="exp-status exp-status--active">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="exp-status exp-status--done">
                        COMPLETED
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="exp-separator">───</div>

                {/* First bullet always visible */}
                <motion.div
                  className="exp-output-line"
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.1 + 0.18 }}
                >
                  <span className="exp-meta-key">&gt;</span>{' '}
                  {exp.description[0]}
                </motion.div>

                {/* Expandable bullets */}
                <AnimatePresence initial={false}>
                  {isExpanded &&
                    exp.description.slice(1).map((item, i) => (
                      <motion.div
                        className="exp-output-line"
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, delay: i * 0.06 }}
                      >
                        <span className="exp-meta-key">&gt;</span> {item}
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Toggle styled as command */}
                {exp.description.length > 1 && (
                  <button
                    className="exp-cmd-toggle"
                    onClick={() => toggle(index)}
                    aria-expanded={isExpanded}
                  >
                    <span className="exp-prompt">$</span>{' '}
                    {isExpanded ? 'clear' : 'cat details.log'}
                    <ChevronDown
                      size={12}
                      style={{
                        transform: isExpanded
                          ? 'rotate(180deg)'
                          : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>
                )}
              </motion.div>
            );
          })}

          {/* Blinking cursor */}
          <div className="exp-cursor" />
        </div>
      </div>
    </div>
  );
};

export default Experience;
