import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import latestEntries from '../data/latest.json';
import '../styles/resume.css';

marked.use(gfmHeadingId());

const mdModules = import.meta.glob('../content/latest/*.md', { as: 'raw' });

export default function LatestPage({ slug }) {
  const [html, setHtml] = useState('');
  const entry = latestEntries.find((item) => item.slug === slug);

  useEffect(() => {
    let mounted = true;

    async function loadMarkdown() {
      if (!entry) {
        setHtml('');
        return;
      }

      const key = Object.keys(mdModules).find((path) => path.endsWith(`/${entry.content}`));
      if (!key) {
        setHtml('');
        return;
      }

      try {
        const raw = await mdModules[key]();
        const normalizedRaw = String(raw || '').replace(/^\uFEFF/, '');
        const rendered = marked.parse(normalizedRaw, { mangle: false });
        if (mounted) setHtml(rendered);
      } catch (error) {
        if (mounted) setHtml('');
      }
    }

    loadMarkdown();
    return () => {
      mounted = false;
    };
  }, [entry]);

  if (!entry) {
    return <div className="output">Latest entry not found</div>;
  }

  return (
    <div className="resume-page">
      <div className="resume-grid no-toc">
        <main className="resume-content">
          <section className="resume-section">
            {html ? (
              <div className="project-markdown" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div className="loading">Loading...</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
