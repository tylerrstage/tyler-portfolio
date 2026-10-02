import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import SectionFrame from './components/SectionFrame/SectionFrame';
import ProjectCard from './components/ProjectCard/ProjectCard';
import { projects, sheets } from './data/content';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SectionFrame id="projects" sheet={sheets.projects}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </SectionFrame>
      </main>
      <footer style={{ height: 120 }} />
    </>
  );
}
