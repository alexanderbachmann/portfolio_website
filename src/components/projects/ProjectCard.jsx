import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, BarChart3, Building2, ShieldAlert, TrendingUp,
} from 'lucide-react';

const iconMap = { TrendingUp, BarChart3, Building2, ShieldAlert };
const external = { target: '_blank', rel: 'noopener noreferrer' };

const ProjectCard = ({ data, index = 0 }) => {
  const Icon = iconMap[data.icon] || Building2;
  const hue = data.hue ?? (210 + index * 50) % 360;
  const { link } = data;

  return (
    <motion.div
      className="project-cell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <article
        className="card project-card"
        style={{ '--project-hue': hue }}
        data-spotlight
      >
        <div className="project-cover">
          <Icon size={48} className="project-cover-icon" aria-hidden="true" />
          {data.badge && <span className="project-badge">{data.badge}</span>}
          {link && (
            /* Pointer shortcut only: keyboard and screen-reader users get
               exactly two links per card, the title and the footer. */
            <a
              href={link.url}
              {...external}
              className="project-cover-link"
              tabIndex={-1}
              aria-hidden="true"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        <div className="project-body">
          <h3 className="project-card-title">
            {link ? <a href={link.url} {...external}>{data.title}</a> : data.title}
          </h3>

          <p className="project-card-description">{data.description}</p>

          <div className="project-card-footer">
            <ul className="project-card-tags">
              {data.tags.map((tag) => (
                <li key={tag} className="project-tag">{tag}</li>
              ))}
            </ul>
            {link && (
              <a href={link.url} {...external} className="project-card-link">
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default ProjectCard;
