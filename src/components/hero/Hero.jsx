'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, FileDown, MapPin } from 'lucide-react';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import { socialIconByLabel } from '@/components/shared/socialIcons';
import useTilt from '@/components/shared/useTilt';
import { CV_PATH, hero, metrics, site, socials } from '@/data/site';
import { experiences } from '@/data/experiences';
import profilePic from '@/assets/speaker.jpeg';
import './hero.css';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const current = experiences[0];
const nameParts = site.name.split(' ');
const surname = nameParts.pop();
const givenNames = nameParts.join(' ');

const statusText = {
  availability: hero.availabilityText,
  location: `${current.location} · ${current.role} at ${current.company}`,
  none: null,
}[hero.status];

const Hero = () => {
  const reduce = useReducedMotion();
  const tilt = useTilt(5, 800);

  return (
    <div className="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          {statusText && (
            <motion.p
              className={`hero-status hero-status--${hero.status}`}
              {...fadeUp(0)}
            >
              <span className="hero-status-dot" aria-hidden="true" />
              {statusText}
            </motion.p>
          )}

          <motion.p className="hero-kicker" {...fadeUp(0.05)}>
            {site.role}
          </motion.p>

          <motion.h1 className="hero-name" {...fadeUp(0.1)}>
            {givenNames} <span className="gradient-text">{surname}</span>
          </motion.h1>

          <motion.p className="hero-description" {...fadeUp(0.2)}>
            {site.tagline}
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.3)}>
            {/* data-hero-cta: the navbar keeps its own CTA ghost while this
                one is on screen (one orange CTA per viewport). */}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary hero-cta"
              data-hero-cta
            >
              {hero.primaryCta}
              <ArrowUpRight size={18} className="hero-cta-icon" aria-hidden="true" />
            </a>
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <FileDown size={18} aria-hidden="true" />
              {hero.cvCta}
            </a>
            <ul className="hero-socials" aria-label="Profiles">
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
          </motion.div>

          <motion.dl className="hero-stats" {...fadeUp(0.45)}>
            {metrics.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <dt className="hero-stat-label">{stat.label}</dt>
                <dd className="hero-stat-value">
                  <AnimatedNumber target={stat.value} />
                  {stat.suffix}
                </dd>
                <dd className="hero-stat-desc">{stat.description}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Entrance (outer) and idle float (inner) are separate motion
            elements so the loop never replays the entrance offset. */}
        <motion.div
          className="hero-figure"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="hero-float"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              ref={tilt.ref}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              className="card card--static hero-card"
            >
              <div className="hero-card-photo">
                <Image
                  src={profilePic}
                  alt={`${site.name} presenting on stage`}
                  priority
                  sizes="(max-width: 900px) 360px, 520px"
                />
              </div>
              <div className="hero-card-caption">
                <p className="hero-card-name">{site.name}</p>
                <p className="hero-card-role">{site.role}</p>
                <p className="hero-card-chip">
                  <MapPin size={12} aria-hidden="true" />
                  {current.location}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
