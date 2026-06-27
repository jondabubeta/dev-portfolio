import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/index.css';
import '../styles/resume.css';

import ExperienceViewer from '../components/commands/view/experience';
import SkillsViewer from '../components/commands/view/skills';
import EducationViewer from '../components/commands/view/education';
import ProjectsViewer from '../components/commands/view/projects';

export default function ResumePage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'education', label: 'Education' },
      { id: 'projects', label: 'Projects' },
    ],
    []
  );

  const [active, setActive] = useState('overview');
  const manualLockUntil = useRef(0);
  const showToc = sections.length > 1;

  const handleJump = (id) => (e) => {
    e.preventDefault();
    setActive(id);
    manualLockUntil.current = performance.now() + 700;

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (id === 'overview') {
      requestAnimationFrame(() => {
        setTimeout(() => window.scrollTo(0, 0), 120);
      });
    }
  };

  useEffect(() => {
    const ANCHOR_Y = 96;
    const TAKEOVER_PAD = 6;

    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const pickActive = () => {
      if (performance.now() < manualLockUntil.current) return;

      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;
      if (nearBottom) {
        setActive('projects');
        return;
      }

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
        setActive('overview');
      }
    };

    window.scrollTo(0, 0);
    setActive('overview');
    manualLockUntil.current = performance.now() + 800;
    requestAnimationFrame(() => requestAnimationFrame(pickActive));

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
      <div className="resume-grid no-toc">
        <main className="resume-content">
          {showToc ? (
            <aside className="inline-toc">
              <div className="toc-card">
                <div className="toc-title">Contents</div>
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
          ) : null}

          <div className="resume-page-header">
            <div>
              <div className="terminal-h1">Jonathan Dabu</div>
              <div className="subtitle">Software Testing, Automation, Development & AI/ML</div>
            </div>
          </div>

          <section id="overview" className="resume-section">
            <div><span className="text-orange">Email:</span> jonathandabu86@gmail.com</div>
            <div><span className="text-orange">LinkedIn:</span> https://www.linkedin.com/in/jbdabu</div>
          </section>

          <section id="experience" className="resume-section">
            <h2>Experience</h2>
            <ExperienceViewer full={true} />
          </section>

          <section id="skills" className="resume-section">
            <h2>Skills</h2>
            <SkillsViewer full={true} />
          </section>

          <section id="education" className="resume-section">
            <h2>Education</h2>
            <EducationViewer full={true} />
          </section>

          <section id="projects" className="resume-section">
            <h2>Projects</h2>
            <ProjectsViewer full={true} />
          </section>

          <div style={{ height: 140 }} />
        </main>
      </div>
    </div>
  );
}
