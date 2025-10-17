import React from "react";
import education from "../../data/education.json";

const keyFor = (ed, i) =>
  [ed.id, ed.institution, ed.degree, ed.field, ed.year, i]
    .filter(Boolean)
    .join("::");

export default function EducationPanel() {
  return (
      <div className="section-container education-section">
        <h3>Education</h3>

        <div className="scrollable-table">
          <div className="panel-table education-table">
            {education.map((ed, i) => (
              <div className="panel-row" key={keyFor(ed, i)}>
                <span className="panel-label">{ed.institution}</span>
                <span className="panel-meta">{ed.degree || ed.field || ""}</span>
                <span className="panel-extra">{ed.year || ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
