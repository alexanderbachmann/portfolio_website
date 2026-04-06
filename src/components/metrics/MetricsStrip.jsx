import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { motion } from 'motion/react';
import './metrics.css';

const stats = [
  { value: 6, label: 'Years in Data', description: 'Building analytics solutions since 2019' },
  { value: 5, label: 'Countries', description: 'Dominican Republic, Germany, Canada, Ireland, Spain' },
  { value: 6, label: 'Global Companies', description: 'Including Google, ECB, Roche' },
];

const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 1000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

const MetricsStrip = () => {
  return (
    <section className="metrics-section">
      <div className="metrics-wrapper">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="metric-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="metric-value">
              <AnimatedNumber target={stat.value} />
            </div>
            <div className="metric-label">{stat.label}</div>
            <div className="metric-description">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MetricsStrip;
