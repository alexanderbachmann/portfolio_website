import React, { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import { catStats } from '../../../data/bio-metrics';

const funFacts = [
  "She's lived in 3 different countries",
  "She once slept through an entire thunderstorm",
  "Her favorite spot is on top of the router",
  "She judges every Zoom call I take",
  "She has a passport with more stamps than most humans",
];

const Bar = ({ label, value, max, highlighted, icon }) => {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: 'var(--space-sm)' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--text-xs)',
        color: highlighted ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        marginBottom: 3,
        transition: 'color 0.2s ease',
      }}>
        <span>{icon} {label}</span>
        <span>{value}h</span>
      </div>
      <div style={{
        height: 7,
        background: 'hsla(220, 20%, 30%, 0.3)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: highlighted
            ? 'var(--color-accent)'
            : 'linear-gradient(90deg, var(--color-chart-2), var(--color-chart-1))',
          borderRadius: 4,
          transition: 'all 0.3s ease',
          transform: highlighted ? 'scaleY(1.4)' : 'scaleY(1)',
          transformOrigin: 'bottom',
        }} />
      </div>
    </div>
  );
};

const barIcons = ['\u{1F634}', '\u{1F3BE}', '\u{1F440}']; // sleep, play, eyes

const CatDashboard = () => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % funFacts.length);
        setFactVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Cat size={16} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Cat Analytics
          </span>
        </div>
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-bg-deep)',
          background: 'var(--color-accent)',
          padding: '1px 8px',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
        }}>
          Himalayan
        </span>
      </div>

      {/* Bar chart */}
      <div style={{ flex: 1 }}>
        {catStats.metrics.map((m, i) => (
          <div
            key={m.label}
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <Bar {...m} highlighted={hoveredBar === i} icon={barIcons[i]} />
          </div>
        ))}
      </div>

      {/* Mood + countries row */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-sm)',
        marginTop: 'var(--space-sm)',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-sm)',
          background: 'hsla(222, 38%, 14%, 0.5)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Mood
          </span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-chart-4)' }}>
            {catStats.mood} {'\u{1F451}'}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-sm) var(--space-md)',
          background: 'hsla(222, 38%, 14%, 0.5)',
          borderRadius: 'var(--radius-sm)',
          gap: 4,
        }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {'\u{1F30D}'}
          </span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {catStats.countriesLived}
          </span>
        </div>
      </div>

      {/* Rotating fun fact */}
      <div style={{
        marginTop: 'var(--space-sm)',
        padding: 'var(--space-sm) var(--space-md)',
        background: 'hsla(20, 88%, 48%, 0.08)',
        border: '1px solid hsla(20, 88%, 48%, 0.15)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minHeight: 36,
      }}>
        <span style={{ fontSize: 'var(--text-base)', flexShrink: 0 }}>{'\u{1F43E}'}</span>
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
          transition: 'opacity 0.3s ease',
          opacity: factVisible ? 1 : 0,
        }}>
          {funFacts[factIndex]}
        </span>
      </div>
    </div>
  );
};

export default CatDashboard;
