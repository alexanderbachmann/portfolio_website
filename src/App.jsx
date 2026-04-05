import React, { useState } from 'react';
import NavBar from './components/navbar';
import About from './components/about';
import Experience from './components/experience';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-pushed' : ''}`}>
      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="main-content">
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
      </main>
    </div>
  );
}

export default App;
