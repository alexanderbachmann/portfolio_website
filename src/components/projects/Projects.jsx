'use client';

import React from 'react';
import SectionHeading from '../shared/SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';
import './projects.css';

const Projects = () => (
  <section className="projects-section">
    <div className="projects-wrapper">
      <SectionHeading subtitle="Apps, dashboards, and data products I've built">
        Projects
      </SectionHeading>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} data={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
