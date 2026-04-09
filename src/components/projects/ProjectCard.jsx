import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, Building2, ShieldAlert, ExternalLink } from 'lucide-react';

const iconMap = { TrendingUp, BarChart3, Building2, ShieldAlert };

const ProjectCard = ({ data, index = 0 }) => {
  const Icon = iconMap[data.icon] || Building2;

  return (
    <motion.div
      className="accomplishment-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="accomplishment-card-header">
        <Icon size={20} className="accomplishment-card-icon" />
        <h3 className="accomplishment-card-title">{data.title}</h3>
      </div>

      <p className="accomplishment-card-description">{data.description}</p>

      <div className="accomplishment-card-footer">
        {data.tags && (
          <div className="accomplishment-card-tags">
            {data.tags.map((tag) => (
              <span key={tag} className="accomplishment-card-tag">{tag}</span>
            ))}
          </div>
        )}

        {data.link && (
          <a
            href={data.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="featured-link"
          >
            {data.link.label}
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
