import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, ExternalLink } from 'lucide-react';

const KaggleSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
  </svg>
);

const iconMap = { BookOpen };

const AnimatedStat = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref} className="featured-stat-glow">
      <div className="featured-stat-value gradient-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="featured-stat-label">{label}</div>
    </div>
  );
};

const FeaturedCard = ({ data }) => {
  const cardRef = useRef(null);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const handleMouseMove = useCallback((e) => {
    if (!canHover) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = ((centerY - y) / centerY) * 4;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, [canHover]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  }, []);

  const RecognitionIcon = data.recognition ? iconMap[data.recognition.icon] : null;

  return (
    <motion.div
      ref={cardRef}
      className="featured-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="featured-card-inner">
        {/* Stat block */}
        <div className="featured-stat-block">
          <div className="featured-stat-icon">
            {data.icon === 'kaggle' ? <KaggleSvg /> : null}
          </div>
          <AnimatedStat
            value={data.stat.value}
            suffix={data.stat.suffix}
            label={data.stat.label}
          />
          <div className="featured-stat-highlight">{data.highlight}</div>
        </div>

        {/* Content block */}
        <div className="featured-content">
          <h3 className="featured-title">{data.title}</h3>
          <p className="featured-subtitle">{data.subtitle}</p>
          <p className="featured-description">{data.description}</p>

          <div className="featured-tags">
            {data.tags.map((tag) => (
              <span key={tag} className="featured-tag">{tag}</span>
            ))}
          </div>

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

          {data.recognition && (
            <motion.div
              className="featured-recognition"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {RecognitionIcon && (
                <RecognitionIcon size={18} className="featured-recognition-icon" />
              )}
              <span className="featured-recognition-text">
                {data.recognition.text}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
