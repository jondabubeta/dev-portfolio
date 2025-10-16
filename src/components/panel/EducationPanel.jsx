import React from "react";
import education from "../../data/education.json";

export default function EducationPanel() {
  return (
    <div className="section-container">
      <h3>Education</h3>
      <div className="scrollable-table">
        <div className="panel-table">
          {education.map((ed) => (
            <div key={ed.institution} className="panel-row">
              <span className="panel-label">{ed.degree}</span>
              <span className="panel-meta">{ed.field}</span>
              <span className="panel-extra">{ed.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
