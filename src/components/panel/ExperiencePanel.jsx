import React from "react";
import experienceData from "../../data/experience.json";

const items = experienceData.map((row) => {
    const position = row.sidePanelTitle || row.title;
    return {
      company: row.company,
      position,
      years: row.years,
      cmd: `view experience --company="${row.company}" --position="${position}"`,
    };
  });

export default function ExperiencePanel({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Experience</h3>

      <div className="scrollable-table data-scrollable">
        <div className="panel-table experience-table">
          {items.map((row, i) => (
            <div
              key={`${row.company}::${row.position}::${i}`}
              className="panel-row clickable"
              onClick={() => onCommand?.(row.cmd)}
              title={row.cmd}
            >
              <span className="panel-label">{row.company}</span>
              <span className="panel-meta">{row.position}</span>
              <span className="panel-extra">{row.years}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
