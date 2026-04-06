import React, { useState } from 'react';
import NavBar from './components/navbar';
import Hero from './components/hero';
import BioGrid from './components/bio-grid';
import TechStack from './components/tech-stack';
import Experience from './components/experience';
import MetricsStrip from './components/metrics';
import Contact from './components/contact';
import Footer from './components/footer';
import SvgDivider from './components/shared/SvgDivider';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-pushed' : ''}`}>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <section id="about">
          <Hero />
          <SvgDivider variant="wave-a" fillColor="var(--color-bg-deep)" />
          <BioGrid />
        </section>

        <SvgDivider variant="wave-b" fillColor="var(--color-bg-base)" />

        <section id="skills">
          <TechStack />
        </section>

        <SvgDivider variant="wave-c" fillColor="var(--color-bg-deep)" />

        <section id="experience">
          <Experience />
        </section>

        <SvgDivider variant="wave-a" fillColor="var(--color-bg-base)" />

        <MetricsStrip />

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
