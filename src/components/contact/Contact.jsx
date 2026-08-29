'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <motion.p
          className="contact-kicker"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          What&rsquo;s next?
        </motion.p>

        <motion.h2
          className="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Let&rsquo;s build something.
        </motion.h2>

        <motion.p
          className="contact-description"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Have a question, want to collaborate, or just want to connect?
          I&rsquo;m always happy to hear from product, data, and analytics
          leaders.
        </motion.p>

        <motion.div
          className="contact-links"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <a href={`mailto:${site.email}`} className="contact-button primary">
            <Mail size={18} />
            Say hello
          </a>
          <a
            href="https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button ghost"
          >
            <Linkedin size={18} />
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
