import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/global.css';
import '../styles/resume.css';

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
  const elemRefs = useRef({});

  const handleJump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // Cache elements
    sections.forEach(s => {
      elemRefs.current[s.id] = document.getElementById(s.id);
    });

    const ANCHOR_Y = 96;

    const pickActive = () => {
      let bestId = sections[0].id;
      let bestScore = Number.POSITIVE_INFINITY;

      for (const s of sections) {
        const el = elemRefs.current[s.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const score = Math.abs(rect.top - ANCHOR_Y);
        if (score < bestScore) {
          bestScore = score;
          bestId = s.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 8;

      setActive(nearBottom ? 'projects' : bestId);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          pickActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    pickActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  return (
    <div className="resume-page">
      <div className="resume-grid">
        <aside className="resume-toc">
          <div className="toc-card">
            <div className="toc-title">Table of Contents</div>
            <nav className="toc-list">
              {sections.map((s) => (
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

        <main className="resume-content">
          <section id="overview" className="resume-section">
            <div className="terminal-h1">Jonathan Dabu</div>
            <div className="terminal-h2 mb">
              Software Development, Testing, & Automation
            </div>
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

          <div style={{ height: 140 }} />
        </main>
      </div>
    </div>
  );
}
