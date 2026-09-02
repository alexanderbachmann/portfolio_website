'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3, Bot, Database, Code2, Cloud, Globe, Target, Lightbulb, Users,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import { skillCategories } from '@/data/skills';
import { sections } from '@/data/site';
import './tech-stack.css';

const ICONS = {
  BarChart3, Bot, Database, Code2, Cloud, Globe, Target, Lightbulb, Users,
};

const TechStack = () => {
  const copy = sections.skills;

  return (
    <div className="tech-stack-section">
      <div className="tech-stack-wrapper">
        <SectionHeading
          index={copy.index}
          eyebrow={copy.eyebrow}
          description={copy.description}
        >
          <HighlightedTitle text={copy.title} highlight={copy.highlight} />
        </SectionHeading>

        <div className="tech-stack-grid">
          {skillCategories.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <motion.div
                key={cat.title}
                className="tech-cell"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              >
                <article className="card tech-category" data-spotlight>
                  <header className="tech-category-header">
                    <span className="tech-icon" aria-hidden="true">
                      {Icon && <Icon size={18} />}
                    </span>
                    <h3 className="tech-category-title">{cat.title}</h3>
                  </header>
                  <ul className="tech-pills">
                    {cat.tools.map((tool) => (
                      <li key={tool.name} className="tech-pill">
                        <span className="tech-pill-name">{tool.name}</span>
                        <span className="tech-pill-detail">{tool.detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
