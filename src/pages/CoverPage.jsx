import React from 'react';
import '../styles/index.css';
import '../styles/resume.css';

import CvViewer from '../components/commands/view/cv';

export default function CoverPage() {
  return (
    <div className="resume-page">
      <div className="resume-grid">
        <aside className="resume-toc">
          <div className="toc-card">
            <div className="toc-title">Cover Letter</div>
          </div>
        </aside>

        <main className="resume-content">
          <section className="resume-section">
            <div className="terminal-h1">Cover Letter</div>
            <div className="terminal-h2 mb">Jonathan Dabu</div>
            <CvViewer />
          </section>
        </main>
      </div>
    </div>
  );
}
