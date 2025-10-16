import React from "react";
import projects from "../../data/projects.json";

export default function ProjectsPanel({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Projects</h3>
      <div className="scrollable-table">
        <div className="panel-table">
          {projects.map((p) => (
            <div
              key={p.title}
              className="panel-row clickable"
              onClick={() =>
                onCommand?.(`view project --name="${p.title}"`)
              }
            >
              <span className="panel-label">{p.title}</span>
              <span className="panel-meta">{p.tech?.slice(0, 2).join(", ")}</span>
              <span className="panel-extra">{p.tags?.[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
