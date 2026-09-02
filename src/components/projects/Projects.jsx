'use client';

import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import HighlightedTitle from '@/components/shared/HighlightedTitle';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';
import { sections } from '@/data/site';
import './projects.css';

const Projects = () => {
  const copy = sections.projects;

  return (
    <div className="projects-section">
      <div className="projects-wrapper">
        <SectionHeading index={copy.index} eyebrow={copy.eyebrow}>
          <HighlightedTitle text={copy.title} highlight={copy.highlight} />
        </SectionHeading>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} data={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
