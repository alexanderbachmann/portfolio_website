'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Linkedin } from 'lucide-react';
import { socialIconByLabel } from '@/components/shared/socialIcons';
import { contact, site, socials } from '@/data/site';
import { experiences } from '@/data/experiences';
import './contact.css';

const Contact = () => (
  <div className="contact-section">
    <div className="contact-wrapper">
      <motion.div
        className="card card--static contact-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <p className="contact-kicker">{contact.kicker}</p>

        <h2 className="contact-heading">
          {contact.heading}{' '}
          <span className="gradient-text">{contact.headingAccent}</span>
        </h2>

        <p className="contact-description">{contact.description}</p>

        <div className="contact-links">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            <Linkedin size={18} aria-hidden="true" />
            {contact.cta}
          </a>
        </div>

        <ul className="contact-socials" aria-label="Profiles">
          {socials.map(({ href, label }) => {
            const Icon = socialIconByLabel[label];
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--icon"
                  title={label}
                  aria-label={label}
                >
                  {Icon && <Icon size={18} aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>

        <p className="contact-based">
          {contact.basedInLabel} {experiences[0].location}
        </p>
      </motion.div>
    </div>
  </div>
);

export default Contact;
