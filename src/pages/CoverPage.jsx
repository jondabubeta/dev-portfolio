import React from 'react';
import '../styles/index.css';
import '../styles/resume.css';

import CvViewer from '../components/commands/view/cv';

export default function CoverPage() {
  const tocItems = [{ id: 'cover-letter', label: 'Cover Letter' }];
  const showToc = tocItems.length > 1;

  return (
    <div className="resume-page">
      <div className={`resume-grid${showToc ? '' : ' no-toc'}`}>
        {showToc ? (
          <aside className="resume-toc">
            <div className="toc-card">
              <div className="toc-title">Contents</div>
              <nav className="toc-list">
                {tocItems.map((item) => (
                  <span key={item.id} className="toc-link active">{item.label}</span>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}

        <main className="resume-content">
          <section className="resume-section">
            <CvViewer />
          </section>
        </main>
      </div>
    </div>
  );
}
