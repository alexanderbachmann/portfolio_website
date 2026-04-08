import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <motion.h2
          className="gradient-text contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Get in touch
        </motion.h2>

        <motion.p
          className="contact-description"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a question, want to collaborate, or just want to connect?
          I'm always happy to hear from product, data, and analytics leaders.
        </motion.p>

        <motion.div
          className="contact-links"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button primary"
          >
            <Linkedin size={18} />
            Connect on LinkedIn
          </a>
          <a
            href="mailto:janio.bachmann@gmail.com"
            className="contact-button secondary"
          >
            <Mail size={18} />
            Send an Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
