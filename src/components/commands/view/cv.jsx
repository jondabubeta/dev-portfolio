import React from 'react';
import cover from '../../../data/coverletter.json';

export default function CvViewer() {
  const paragraphs = String(cover.body || '').split('\n\n');

  return (
    <div className="output">
      <div className="terminal-h2">{cover.title}</div>
      <div className="mb">{cover.date}</div>

      {paragraphs.map((p, i) => (
        <div key={i} className="exp-summary">{p}</div>
      ))}
    </div>
  );
}
