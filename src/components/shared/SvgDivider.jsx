import React from 'react';

const waves = {
  'wave-a': (
    <path d="M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,160 L0,160 Z" />
  ),
  'wave-b': (
    <path d="M0,96 C240,40 480,128 720,80 C960,32 1200,120 1440,64 L1440,160 L0,160 Z" />
  ),
  'wave-c': (
    <path d="M0,80 C360,140 720,20 1080,80 C1260,110 1380,60 1440,48 L1440,160 L0,160 Z" />
  ),
};

const SvgDivider = ({ variant = 'wave-a', flip = false, fillColor }) => {
  const fill = fillColor || 'var(--color-bg-deep)';

  return (
    <div
      className="svg-divider"
      style={{
        transform: flip ? 'scaleY(-1)' : 'none',
        lineHeight: 0,
        overflow: 'hidden',
        margin: '-1px 0',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 'clamp(60px, 8vw, 120px)',
          display: 'block',
          fill,
        }}
      >
        {waves[variant]}
      </svg>
    </div>
  );
};

export default SvgDivider;
