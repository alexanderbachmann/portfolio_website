'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3, Bot, Database, Code2, Cloud, Globe, Target, Lightbulb, Users,
} from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { skillCategories } from '@/data/skills';
import './tech-stack.css';

const ICONS = {
  BarChart3, Bot, Database, Code2, Cloud, Globe, Target, Lightbulb, Users,
};

const TechStack = () => {
  return (
    <section className="tech-stack-section">
      <div className="tech-stack-wrapper">
        <SectionHeading subtitle="Product leadership capabilities and the tools that enable them">
          Competencies & Toolkit
        </SectionHeading>

        <div className="tech-stack-grid">
          {skillCategories.map((cat, catIdx) => {
            const Icon = ICONS[cat.icon];
            return (
              <motion.div
                key={cat.title}
                className="tech-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: catIdx * 0.06 }}
              >
                <div className="tech-category-header">
                  {Icon && <Icon size={18} />}
                  <span>{cat.title}</span>
                </div>
                <div className="tech-pills">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="tech-pill"
                      title={tool.detail}
                    >
                      <span className="tech-pill-name">{tool.name}</span>
                      <span className="tech-pill-detail">{tool.detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
