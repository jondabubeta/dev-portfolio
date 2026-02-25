import React, { useEffect, useState, useRef } from 'react';
import { STATUS_CLASS } from '../../constants/projectStatuses';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

// Configure marked with the heading ID extension
marked.use(gfmHeadingId());

// Vite glob to load project markdown files as raw text
const mdModules = import.meta.glob('../../content/projects/*.md', { as: 'raw' });

export default function ProjectTemplate({ project }) {
  const [html, setHtml] = useState('');
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState('top');
  const manualLockUntil = useRef(0);

  // Handle ToC link click with smooth scroll
  const handleJump = (id) => (e) => {
    e.preventDefault();
    setActive(id);
    manualLockUntil.current = performance.now() + 700;
    
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadMarkdown() {
      if (!project) return setHtml('');

      // If project.content is provided, prefer that; otherwise match by slug
      const keyByContent = project.content
        ? Object.keys(mdModules).find((k) => k.endsWith(`/${project.content}`))
        : null;

      const slug = String(project.title || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const keyBySlug = Object.keys(mdModules).find((k) => k.includes(`/${slug}.md`));
      const key = keyByContent || keyBySlug;

      if (!key) return setHtml('');

      try {
        const raw = await mdModules[key]();
        
        const rendered = marked.parse(raw || '', { 
          mangle: false
        });
        
        // Extract ## headings from the rendered HTML to get exact IDs
        const parser = new DOMParser();
        const doc = parser.parseFromString(rendered, 'text/html');
        const h2Elements = doc.querySelectorAll('h2');
        const tocSections = Array.from(h2Elements).map(h2 => ({
          text: h2.textContent.trim(),
          anchor: h2.id
        }));
        
        if (mounted) {
          setToc(tocSections);
          setHtml(rendered);
        }
      } catch (err) {
        if (mounted) setHtml('');
      }
    }

    loadMarkdown();
    return () => {
      mounted = false;
    };
  }, [project]);

  // Scroll spy for active section highlighting
  useEffect(() => {
    if (toc.length === 0) return;

    const ANCHOR_Y = 96;
    const TAKEOVER_PAD = 6;
    const sectionIds = ['top', ...toc.map(s => s.anchor)];
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const pickActive = () => {
      if (performance.now() < manualLockUntil.current) return;
      
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
        setActive('top');
      }
    };

    window.scrollTo(0, 0);
    setActive('top');
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
  }, [toc]);

  if (!project) return <div className="output">Project not found</div>;

  return (
    <div className="project-page resume-page" id="top">
      <div className="project-grid resume-grid">
        <aside className="project-toc resume-toc">
          <div className="toc-card">
            <div className="toc-title">Contents</div>
            <nav className="toc-list">
              <a
                href="#top"
                onClick={handleJump('top')}
                className={`toc-link${active === 'top' ? ' active' : ''}`}
              >
                {project.title}
              </a>
              {toc.map((section) => (
                <a
                  key={section.anchor}
                  href={`#${section.anchor}`}
                  onClick={handleJump(section.anchor)}
                  className={`toc-link${active === section.anchor ? ' active' : ''}`}
                >
                  {section.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="project-content resume-content">
          <section className="project-section resume-section">
            {html ? (
              <div className="project-markdown" dangerouslySetInnerHTML={{ __html: html }} />
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}
