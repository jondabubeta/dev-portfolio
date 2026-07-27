import { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

// Configure marked with the heading ID extension
marked.use(gfmHeadingId());

// Vite glob to load project markdown files as raw text
const mdModules = import.meta.glob('../../content/projects/*.md', { as: 'raw' });

function buildTocTree(items) {
  const roots = [];
  const stack = [];

  items.forEach((item) => {
    const node = { ...item, children: [] };

    while (stack.length && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length) {
      stack[stack.length - 1].children.push(node);
    } else {
      roots.push(node);
    }

    stack.push(node);
  });

  return roots;
}

function TocBranch({ items, active, handleJump, depth = 0 }) {
  return items.map((item) => {
    const containsActive = item.children.some(
      (child) => child.anchor === active || child.children.some((nested) => nested.anchor === active)
    );

    return (
      <div
        className={`project-toc-item project-toc-level-${Math.min(depth + 2, 4)}${containsActive ? ' has-active-child' : ''}`}
        key={item.anchor}
      >
        <a
          href={`#${item.anchor}`}
          onClick={handleJump(item.anchor)}
          className={`toc-link${active === item.anchor ? ' active' : ''}`}
        >
          <span>{item.text}</span>
        </a>
        {item.children.length > 0 && (
          <div className="project-toc-children">
            <TocBranch
              items={item.children}
              active={active}
              handleJump={handleJump}
              depth={depth + 1}
            />
          </div>
        )}
      </div>
    );
  });
}

export default function ProjectTemplate({ project, embedded = false }) {
  const [html, setHtml] = useState('');
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState('top');
  const manualLockUntil = useRef(0);

  // Handle ToC link click with smooth scroll
  const handleJump = (id) => (e) => {
    e.preventDefault();
    setActive(id);
    manualLockUntil.current = performance.now() + 700;

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        const normalizedRaw = String(raw || '').replace(/^\uFEFF/, '');

        const rendered = marked.parse(normalizedRaw, { 
          mangle: false
        });
        
        // Extract the document hierarchy using the exact generated heading IDs.
        const parser = new DOMParser();
        const doc = parser.parseFromString(rendered, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3, h4');
        const tocSections = buildTocTree(
          Array.from(headingElements).map((heading) => ({
            text: heading.textContent.trim(),
            anchor: heading.id,
            level: Number(heading.tagName.slice(1)),
          }))
        );
        
        if (mounted) {
          setToc(tocSections);
          setHtml(rendered);
        }
      } catch {
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
    const flattenAnchors = (items) =>
      items.flatMap((item) => [item.anchor, ...flattenAnchors(item.children)]);
    const sectionIds = ['top', ...flattenAnchors(toc)];
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const scrollTarget = embedded
      ? document.querySelector('.terminal-body') || window
      : window;

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

    if (embedded && scrollTarget instanceof HTMLElement) {
      scrollTarget.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
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

    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    if (scrollTarget === window) {
      scrollTarget.addEventListener('resize', onScroll);
    }
    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
      if (scrollTarget === window) {
        scrollTarget.removeEventListener('resize', onScroll);
      }
    };
  }, [toc, embedded]);

  if (!project) return <div className="output">Project not found</div>;

  const showToc = toc.length > 0;

  const content = (
    <div className="project-page resume-page" id="top">
      <div className="project-grid resume-grid no-toc">
        <main className="project-content resume-content">
          {showToc ? (
            <aside className="inline-toc">
              <details className="toc-card project-toc-disclosure">
                <summary className="project-toc-summary">
                  <span className="toc-title">Contents</span>
                  <span className="project-toc-meta">
                    {toc.length} {toc.length === 1 ? 'section' : 'sections'}
                  </span>
                  <span className="project-toc-chevron" aria-hidden="true" />
                </summary>
                <nav className="toc-list" aria-label={`${project.title} contents`}>
                  <a
                    href="#top"
                    onClick={handleJump('top')}
                    className={`toc-link project-toc-overview${active === 'top' ? ' active' : ''}`}
                  >
                    <span>Project overview</span>
                  </a>
                  <div className="project-toc-sections">
                    <TocBranch items={toc} active={active} handleJump={handleJump} />
                  </div>
                </nav>
              </details>
            </aside>
          ) : null}

          <section className="project-section resume-section">
            {html ? (
              <div className="project-markdown" dangerouslySetInnerHTML={{ __html: html }} />
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );

  if (!embedded) return content;

  return <div className="project-embedded-shell">{content}</div>;
}
