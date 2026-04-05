import React from 'react';
import './about.css';
import profilePic from '../../assets/fotos_with_dogs.jpg';
import CV from '../../assets/CV.pdf';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-columns">
          {/* Left Card */}
          <div className="about-left">
            <h1 className="about-title">
              Hola! I'm <em className="highlight">Janio.</em>
            </h1>
            <h2 className="about-subtitle"> Full-Stack BI Developer </h2>

            <p className="about-description">
              Hi, I'm Janio — a data-driven full-stack developer who's half Dominican 🇩🇴, half German 🇩🇪, and fully
              obsessed with turning complexity into clarity.
              <br/><br/>
              I love building things that are simple, useful, and feel good to use — whether it's clean code,
              thoughtful design, or sharing what I've learned with others.
              <br/><br/>
              When I'm not building or teaching, I'm probably out for a run, lost in a book, or hanging out with my
              Himalayan cat.
              <div className="tooltip-container">
                <span className="tooltip-trigger">?</span>
                <div className="tooltip-text">
                  <u> Fun Fact</u>:  She's lived in three different countries
                </div>
              </div>
              <br/><br/>
              Glad you're here — feel free to say hi! 👋
            </p>

            <div className="about-button-wrapper">
              <a href={CV} target="_blank" rel="noopener noreferrer" className="download-cv">
                <svg xmlns="http://www.w3.org/2000/svg" className="cv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="about-right">
            <img src={profilePic} alt="Profile" className="about-image" />
            <ul className="about-socials">
              <li>
                <a
                    href="https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                >
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                    href="https://github.com/alexanderbachmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                >
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                    href="https://www.kaggle.com/janiobachmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Kaggle"
                >
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                  </svg>
                </a>
              </li>
              <li>
                <a className="social-links icon"
                   href="https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann" target="_blank"
                   rel="noreferrer noopener" title="GoodReads">
                  <span className="sr-only">GoodReads</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"
                       className="h-6 w-6" aria-hidden="true">
                    <path
                        d="M663.8 382.4c10.2 74.6-9.4 158-71.8 201.4-44.6 31-105.6 28.2-141.6 11.4-74.2-34.6-99-117.2-93.6-194.4 8.6-121.8 81.8-175.8 150.6-175 93.8-0.4 143.6 63.6 156.4 156.6zM960 176v672c0 61.8-50.2 112-112 112H176c-61.8 0-112-50.2-112-112V176c0-61.8 50.2-112 112-112h672c61.8 0 112 50.2 112 112zM724 626.4s-0.2-68-0.2-434.6h-58v80.6c-1.6 0.6-2.4-1-3.2-2.4-19.2-41.4-71.8-92.6-152-92-103.8 0.8-174.4 62.4-201.2 155.6-8.6 29.8-11.6 60.2-11 91.2 3.4 155.8 90.2 235.6 224.8 230.4 57.8-2.2 109-34 138-90.4 1-2 2.2-3.8 3.4-5.8 0.4 0.2 0.8 0.2 1.2 0.4 0.6 7.6 0.4 61.4 0.2 69-0.4 29.6-4 59-14.4 87-15.6 42-44.6 69.4-89 79-35.6 7.8-71.2 7.6-106.4-2.4-43-12.2-73-38-82.2-83.6-0.6-3.2-2.6-2.6-4.6-2.6h-53.6c1.6 21.2 6.4 40.6 17 58.4 48.4 81 165.4 97 256.4 74.8 99.8-24.6 134.6-109.8 134.8-212.6z"
                        fill=""></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;