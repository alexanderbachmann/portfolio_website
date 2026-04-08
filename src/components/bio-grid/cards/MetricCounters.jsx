import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { TrendingUp, Globe, Building2, Layers } from 'lucide-react';
import { metrics } from '../../../data/bio-metrics';

const iconMap = { TrendingUp, Globe, Building2, Layers };

const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const MetricCounters = () => {
  return (
    <div style={{
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-md)',
      alignContent: 'center',
    }}>
      {metrics.map((m) => {
        const Icon = iconMap[m.icon];
        return (
          <div
            key={m.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: 'var(--space-sm)',
            }}
          >
            <Icon size={18} style={{ color: 'var(--color-accent)', marginBottom: 6 }} />
            <div style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
            }}>
              <Counter target={m.value} suffix={m.suffix || ''} />
            </div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              marginTop: 2,
              lineHeight: 1.3,
            }}>
              {m.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCounters;
