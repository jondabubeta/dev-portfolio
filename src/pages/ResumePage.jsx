import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/index.css';
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
  const manualLockUntil = useRef(0); // timestamp in ms

  const handleJump = (id) => (e) => {
    e.preventDefault();
    setActive(id);                                // immediately highlight clicked link
    manualLockUntil.current = performance.now() + 700; // lock scroll-spy briefly

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Clamp to very top when selecting "Overview" (avoid overshoot)
    if (id === 'overview') {
      requestAnimationFrame(() => {
        setTimeout(() => window.scrollTo(0, 0), 120);
      });
    }
  };

  useEffect(() => {
    const ANCHOR_Y = 96;     // must match scroll-margin-top
    const TAKEOVER_PAD = 6;  // small cushion below the anchor

    const els = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean);

    const pickActive = () => {
      if (performance.now() < manualLockUntil.current) return; // skip during lock

      // If near the bottom, force "projects"
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;
      if (nearBottom) {
        setActive('projects');
        return;
      }

      // Prefer the last section whose top is <= anchor line
      const candidates = [];
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= ANCHOR_Y + TAKEOVER_PAD) {
          candidates.push(el.id);
        }
      }

      if (candidates.length > 0) {
        setActive(candidates[candidates.length - 1]);
      } else {
        setActive('overview'); // top of page
      }
    };

    // Force initial state and scroll to top
    window.scrollTo(0, 0);
    setActive('overview');
    manualLockUntil.current = performance.now() + 800;
    // Wait 2 frames so layout settles before first check
    requestAnimationFrame(() => requestAnimationFrame(pickActive));

    // Throttled scroll listener
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
            <div className="terminal-h2 mb">Software Development, AI/ML, Testing & Automation</div>
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
