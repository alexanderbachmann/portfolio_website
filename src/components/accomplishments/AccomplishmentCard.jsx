import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, BookOpen } from 'lucide-react';
import KaggleIcon from '@/components/shared/KaggleIcon';
import AnimatedNumber, { formatThousands } from '@/components/shared/AnimatedNumber';

const recognitionIcons = { BookOpen };

/* Numeric stats count up (the section's one highlighted metric, in white);
   text stats render as-is. */
const Stat = ({ stat }) => {
  if (!stat) return null;
  return (
    <p className="accomplishment-stat">
      <span className="accomplishment-stat-value">
        {typeof stat.value === 'number' ? (
          <>
            <AnimatedNumber target={stat.value} duration={1400} format={formatThousands} />
            {stat.suffix}
          </>
        ) : (
          stat.text
        )}
      </span>
      <span className="accomplishment-stat-label">{stat.label}</span>
    </p>
  );
};

const AccomplishmentCard = ({ data, index = 0 }) => {
  const Icon = data.icon === 'kaggle' ? KaggleIcon : Award;
  const RecognitionIcon = data.recognition
    ? recognitionIcons[data.recognition.icon] || BookOpen
    : null;

  return (
    <motion.div
      className={`accomplishment-cell${data.featured ? ' accomplishment-cell--featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <article className="card accomplishment-card" data-spotlight>
        <header className="accomplishment-card-top">
          <Stat stat={data.stat} />
          <span className="accomplishment-card-icon" aria-hidden="true">
            <Icon size={20} />
          </span>
        </header>

        <h3 className="accomplishment-card-title">{data.title}</h3>
        {data.subtitle && (
          <p className="accomplishment-card-subtitle">{data.subtitle}</p>
        )}
        <p className="accomplishment-card-description">{data.description}</p>

        {data.recognition && (
          <p className="accomplishment-recognition">
            <RecognitionIcon size={16} aria-hidden="true" />
            {data.recognition.text}
          </p>
        )}

        <footer className="accomplishment-card-footer">
          <ul className="accomplishment-card-tags">
            {data.tags.map((tag) => (
              <li key={tag} className="accomplishment-tag">{tag}</li>
            ))}
          </ul>
          {data.link && (
            <a
              href={data.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="accomplishment-link"
            >
              {data.link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </footer>
      </article>
    </motion.div>
  );
};

export default AccomplishmentCard;
