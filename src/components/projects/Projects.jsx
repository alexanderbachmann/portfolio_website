import React from 'react';
import SectionHeading from '../shared/SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

const Projects = () => (
  <section className="accomplishments-section dot-pattern-bg">
    <div className="accomplishments-wrapper">
      <SectionHeading subtitle="Apps, dashboards, and data products I've built">
        Projects
      </SectionHeading>

      <div className="accomplishments-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} data={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
