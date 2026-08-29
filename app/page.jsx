import Hero from '@/components/hero';
import BioGrid from '@/components/bio-grid';
import TechStack from '@/components/tech-stack';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Accomplishments from '@/components/accomplishments';
import Contact from '@/components/contact';

export default function HomePage() {
  return (
    <main>
      <section id="about">
        <Hero />
        <BioGrid />
      </section>

      <section id="skills">
        <TechStack />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <Accomplishments />

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
