import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import CV from '../../../assets/CV.pdf';

const ExportCV = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 'var(--space-md)',
    }}>
      <FileDown size={28} style={{ color: 'var(--color-accent)' }} />

      <div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>
          Data Export
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          {hovering ? 'Preparing export...' : 'Profile Summary (.pdf)'}
        </div>
      </div>

      <a
        href={CV}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          padding: 'var(--space-sm) var(--space-lg)',
          border: '2px solid var(--color-border-accent)',
          borderRadius: 'var(--radius-md)',
          background: hovering ? 'var(--color-accent)' : 'transparent',
          color: hovering ? 'white' : 'var(--color-text-primary)',
          textDecoration: 'none',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          transition: 'all var(--duration) var(--ease-out)',
          boxShadow: hovering ? 'var(--shadow-glow)' : 'none',
        }}
      >
        <FileDown size={16} />
        Download CV
      </a>
    </div>
  );
};

export default ExportCV;
