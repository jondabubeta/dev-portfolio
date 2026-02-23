import React from "react";
import education from "../../data/education.json";

export default function EducationPanel() {
  return (
    <div className="section-container education-section">
      <h3>Education</h3>

      <div className="scrollable-table data-scrollable">
        <div className="panel-table education-table">
          {education.map((ed, i) => {
            const key = `${ed.s_degree}-${ed.s_institution}-${ed.year}-${i}`;

            return (
              <div className="panel-row" key={key}>
                <span className="panel-label">{ed.s_degree}</span>
                <span className="panel-meta">{ed.s_institution}</span>
                <span className="panel-extra">{ed.year}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
