import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand gradient-text">JMB</span>
        <span className="footer-copy">
          Built with React &middot; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
