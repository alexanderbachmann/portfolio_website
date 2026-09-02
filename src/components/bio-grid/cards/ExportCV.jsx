import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { CV_PATH, hero } from '@/data/site';

const ExportCV = () => {
  const [hovering, setHovering] = useState(false);
  const on = () => setHovering(true);
  const off = () => setHovering(false);

  return (
    <div className="bio-cv">
      <FileDown size={28} className="bio-cv-icon" aria-hidden="true" />

      <div>
        <div className="bio-cv-kicker">Data Export</div>
        <div className="bio-cv-status" aria-live="polite">
          {hovering ? 'Preparing export...' : 'Profile Summary (.pdf)'}
        </div>
      </div>

      <a
        href={CV_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--ghost btn--sm"
        onMouseEnter={on}
        onMouseLeave={off}
        onFocus={on}
        onBlur={off}
      >
        <FileDown size={16} aria-hidden="true" />
        {hero.cvCta}
      </a>
    </div>
  );
};

export default ExportCV;
