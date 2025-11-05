import React, { useEffect, useState } from 'react';
import { STATUS_CLASS } from '../../constants/projectStatuses';
import { marked } from 'marked';

// Vite glob to load project markdown files as raw text
const mdModules = import.meta.glob('../../content/projects/*.md', { as: 'raw' });

export default function ProjectTemplate({ project }) {
  const [html, setHtml] = useState('');

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
        const rendered = marked.parse(raw || '');
        if (mounted) setHtml(rendered);
      } catch (err) {
        if (mounted) setHtml('');
      }
    }

    loadMarkdown();
    return () => {
      mounted = false;
    };
  }, [project]);

  if (!project) return <div className="output">Project not found</div>;

  return (
    <div className="project-page resume-page">
      <div className="project-grid resume-grid">
        <aside className="project-toc resume-toc">
          <div className="toc-card">
            <div className="toc-title">{project.title}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: 8 }}>
              {project.shortDescription || project.description}
            </div>
          </div>
        </aside>

        <main className="project-content resume-content">
          <section className="project-section resume-section">
            <div className="terminal-h1">{project.title}</div>
            <div className="terminal-h2 mb">{project.role || (project.tech || []).join(' · ')}</div>

            <div style={{ marginTop: 8 }}>
              <strong>Status: </strong>
              <span className={STATUS_CLASS[(project.status || '').toLowerCase()] || ''}>
                {project.status || 'Unknown'}
              </span>
            </div>

            <div className="mt">
              <div className="project-summary exp-summary">{project.description}</div>
            </div>

            {Array.isArray(project.tech) && project.tech.length > 0 && (
              <div className="mt project-tech">
                <div className="cv-subhead">Tech stack</div>
                <div>{project.tech.join(', ')}</div>
              </div>
            )}

            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <div className="mt project-tags">
                <div className="cv-subhead">Tags</div>
                <div>{project.tags.join(', ')}</div>
              </div>
            )}

            {project.details && (
              <div className="mt project-details">
                <div className="cv-subhead">Details</div>
                <div>{project.details}</div>
              </div>
            )}

            {html ? (
              <div className="mt project-markdown" dangerouslySetInnerHTML={{ __html: html }} />
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}
