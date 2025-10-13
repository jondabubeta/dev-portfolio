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

  // Lock scroll-spy briefly after a manual click so the chosen item stays selected
  const manualLockUntil = useRef(0);  // timestamp (ms)

  const handleJump = (id) => (e) => {
    e.preventDefault();
    setActive(id);                                // immediately reflect the click
    manualLockUntil.current = performance.now() + 700; // lock for ~0.7s during scroll
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const ANCHOR_Y = 96; // keep in sync with .resume-section { scroll-margin-top: 96px; }
    const ids = sections.map(s => s.id);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);

    const pickActive = () => {
      // Respect manual lock during smooth-scroll
      if (performance.now() < manualLockUntil.current) return;

      // If near the absolute bottom, prefer "projects"
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;

      if (nearBottom) {
        setActive('projects');
        return;
      }

      // Otherwise, choose the section whose top is closest to ANCHOR_Y
      let bestId = sections[0].id;
      let bestScore = Number.POSITIVE_INFINITY;

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const score = Math.abs(rect.top - ANCHOR_Y);
        if (score < bestScore) {
          bestScore = score;
          bestId = el.id;
        }
      }
      setActive(bestId);
    };

    // rAF throttle for smoothness
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          pickActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial + listeners
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

          {/* Spacer so last section can scroll to top cleanly */}
          <div style={{ height: 140 }} />
        </main>
      </div>
    </div>
  );
}
