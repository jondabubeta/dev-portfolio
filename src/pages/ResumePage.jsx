import React, { useEffect, useMemo, useState } from 'react';
import '../styles/global.css';

import ExperienceViewer from '../components/commands/view/experience';
import SkillsViewer from '../components/commands/view/skills';
import EducationViewer from '../components/commands/view/education';
import ProjectsViewer from '../components/commands/view/projects';

export default function ResumePage() {
  const sections = useMemo(
    () => [
      { id: 'overview',   label: 'Overview' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills',     label: 'Skills' },
      { id: 'education',  label: 'Education' },
      { id: 'projects',   label: 'Projects' },
    ],
    []
  );

  const [active, setActive] = useState('overview');

  const handleJump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);

    const pickActive = () => {
      const anchorY = 80;
      const scores = els.map(el => {
        const r = el.getBoundingClientRect();
        return { id: el.id, score: Math.abs(r.top - anchorY) };
      });
      scores.sort((a, b) => a.score - b.score);
      if (scores[0]) setActive(scores[0].id);
    };

    pickActive();
    window.addEventListener('scroll', pickActive, { passive: true });
    window.addEventListener('resize', pickActive);
    return () => {
      window.removeEventListener('scroll', pickActive);
      window.removeEventListener('resize', pickActive);
    };
  }, [sections]);

  return (
    <div className="resume-page">
      <div className="resume-grid">
        {/* Left: sticky TOC */}
        <aside className="resume-toc">
          <div className="toc-card">
            <div className="toc-title">Table of Contents</div>
            <nav className="toc-list">
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={handleJump(s.id)}
                  className={`toc-link ${active === s.id ? 'active' : ''}`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right: content */}
        <main className="resume-content">
          <section id="overview" className="resume-section">
            <div className="terminal-h1">Jonathan Dabu</div>
            <div className="terminal-h2 mb">Software Development, Testing, & Automation</div>
            <div>Email: jonathandabu86@gmail.com</div>
            <div>LinkedIn: https://www.linkedin.com/in/jbdabu</div>
          </section>

          <section id="experience" className="resume-section">
            <div className="terminal-h2 mt">Experience</div>
            <ExperienceViewer full={true} />
          </section>

          <section id="skills" className="resume-section">
            <div className="terminal-h2 mt">Skills</div>
            <SkillsViewer full={true} />
          </section>

          <section id="education" className="resume-section">
            <div className="terminal-h2 mt">Education</div>
            <EducationViewer full={true} />
          </section>

          <section id="projects" className="resume-section">
            <div className="terminal-h2 mt">Projects</div>
            <ProjectsViewer full={true} />
          </section>
        </main>
      </div>
    </div>
  );
}
