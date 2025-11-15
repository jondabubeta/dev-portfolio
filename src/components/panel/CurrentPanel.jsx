import React from "react";
import TerminalIcon from "../common/TerminalIcon";
import TabIcon from "../common/TabIcon";
import projects from "../../data/projects.json";

function slugify(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CurrentPanel({ onCommand }) {
  const currentProjects = projects.filter((p) => p.current);
  return (
    <div className="section-container projects-section">
      <h3>Current</h3>
      <div className="scrollable-section current-scrollable">
        <div className="panel-table projects-table">
          {currentProjects.map((p) => {
            const pageUrl = `/projects/${slugify(p.title)}`;
            const cmd = `view projects --name="${p.title}"`;
            // Use blurb for summary
            const short = p.blurb || "";
            return (
              <div
                key={p.title}
                className="panel-row clickable"
                onClick={() => onCommand?.(cmd)}
                title={p.description || cmd}
              >
                <span className="panel-label">{p.title}</span>
                <span className="panel-meta">{short || (p.tech ? p.tech.join(" · ") : "")}</span>
                <span className="panel-extra project-icons" onClick={(e) => e.stopPropagation()}>
                  <TerminalIcon command={cmd} onCommand={onCommand} title={`View ${p.title} in terminal`} />
                  <TabIcon url={pageUrl} title={`Open ${p.title} page`} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
