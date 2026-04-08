import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3, Database, Code2, Cloud, Target, Lightbulb,
} from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import './tech-stack.css';

const categories = [
  {
    title: 'Product Leadership',
    icon: Target,
    tools: [
      { name: 'Stakeholder Management', detail: 'Alignment & buy-in' },
      { name: 'Prioritization', detail: 'Frameworks & trade-offs' },
      { name: 'Roadmap Delivery', detail: 'Vision to execution' },
    ],
  },
  {
    title: 'Discovery & Impact',
    icon: Lightbulb,
    tools: [
      { name: 'Requirements Elicitation', detail: 'Business needs → specs' },
      { name: 'KPI Design', detail: 'Outcome tracking' },
      { name: 'A/B Testing', detail: 'Data-driven decisions' },
    ],
  },
  {
    title: 'Visualization',
    icon: BarChart3,
    tools: [
      { name: 'Tableau', detail: 'Daily driver' },
      { name: 'Looker', detail: 'Google era' },
      { name: 'PowerBI', detail: 'Enterprise' },
    ],
  },
  {
    title: 'Languages',
    icon: Code2,
    tools: [
      { name: 'SQL', detail: '6+ years' },
      { name: 'Python', detail: 'Automation & ML' },
      { name: 'R', detail: 'Statistical analysis' },
    ],
  },
  {
    title: 'Data Engineering',
    icon: Database,
    tools: [
      { name: 'Snowflake', detail: 'Cloud DW' },
      { name: 'dbt', detail: 'Transform layer' },
      { name: 'Salesforce', detail: 'CRM analytics' },
    ],
  },
  {
    title: 'Platforms & Tools',
    icon: Cloud,
    tools: [
      { name: 'Google Cloud', detail: 'BigQuery, GCS' },
      { name: 'React', detail: 'This site' },
      { name: 'Git', detail: 'Version control' },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="tech-stack-section">
      <div className="tech-stack-wrapper">
        <SectionHeading subtitle="Product leadership capabilities and the tools that enable them">
          Competencies & Toolkit
        </SectionHeading>

        <div className="tech-stack-grid">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                className="tech-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              >
                <div className="tech-category-header">
                  <Icon size={18} />
                  <span>{cat.title}</span>
                </div>
                <div className="tech-pills">
                  {cat.tools.map((tool, toolIdx) => (
                    <motion.div
                      key={tool.name}
                      className="tech-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + toolIdx * 0.06 }}
                      title={tool.detail}
                    >
                      <span className="tech-pill-name">{tool.name}</span>
                      <span className="tech-pill-detail">{tool.detail}</span>
                    </motion.div>
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
