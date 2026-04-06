import React from 'react';
import { motion } from 'motion/react';
import { experiences } from '../../data/experiences';
import SectionHeading from '../shared/SectionHeading';
import './experience.css';

const Experience = () => {
  return (
    <div className="experience-container">
      <SectionHeading subtitle="Where I've built, analyzed, and delivered">
        Experience
      </SectionHeading>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -40 : 40,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className="timeline-content">
              <div className="timeline-header">
                <div className="logo-container">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="company-logo"
                    />
                  )}
                </div>
                <div className="timeline-date">{exp.period}</div>
              </div>
              <h3 className="timeline-company">{exp.company}</h3>
              <h4 className="timeline-role">{exp.role}</h4>
              <div className="timeline-location">{exp.location}</div>
              <ul className="timeline-description">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
