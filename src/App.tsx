import DropIntro from './components/DropIntro/DropIntro';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import SectionFrame from './components/SectionFrame/SectionFrame';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Skills from './components/Skills/Skills';
import ResumeView from './components/ResumeView/ResumeView';
import Contact from './components/Contact/Contact';
import { projects, sheets, ui } from './data/content';

export default function App() {
  return (
    <>
      <DropIntro />
      <a className="skip-link" href="#main">
        {ui.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <SectionFrame id="projects" sheet={sheets.projects}>
          <div className="projectGrid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </SectionFrame>
        <Skills />
        <ResumeView />
        <Contact />
      </main>
      <footer className="footer">
        <div className="stripes" aria-hidden="true" />
        <p>
          <span>{ui.footer}</span>
          <a href="#top">{ui.backToTop} ↑</a>
        </p>
      </footer>
    </>
  );
}
