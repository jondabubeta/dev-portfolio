// src/components/panel/ExperiencePanel.jsx
import React from "react";
import experienceData from "../../data/experience.json";

export default function ExperiencePanel({ onCommand }) {
  // Deduplicate by company for side-panel summary
  const seen = new Set();
  const rows = experienceData
    .filter((item) => {
      if (seen.has(item.company)) return false;
      seen.add(item.company);
      return true;
    })
    .slice(0, 5); // keep top few

  return (
    <div className="section-container">
      <h3>Experience</h3>
      <div className="scrollable-table">
        <div className="panel-table">
          {rows.map((exp) => (
            <div
              key={exp.company}
              className="panel-row clickable"
              onClick={() =>
                onCommand?.(`view experience --company="${exp.company}"`)
              }
            >
              <span className="panel-label">{exp.company}</span>
              <span className="panel-meta">
                {exp.sidePanelTitle || exp.title}
              </span>
              <span className="panel-extra">{exp.years}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
