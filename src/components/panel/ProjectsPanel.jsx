import React from "react";
import projects from "../../data/projects.json";
import TerminalIcon from "../common/TerminalIcon";
import TabIcon from "../common/TabIcon";
import GitHubPng from "../../assets/github.png"; // PNG

// simple slug: "Anirepo" -> "anirepo", "BlizzMemory" -> "blizzmemory"
function slugify(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectsPanel({ onCommand }) {
  return (
    <div className="section-container projects-section">
      <h3>Projects</h3>

      <div className="scrollable-table">
        <div className="panel-table projects-table">
          {projects.map((p, i) => {
            const key = `${p.title}-${i}`;
            const cmd = `view project --name="${p.title}"`;
            const slug = slugify(p.title);
            // Build site page like jondabu.com/projects/(project name)
            const pageUrl = `/projects/${slug}`;

            // Make a short description on the fly if you didn't provide one
            const short =
              p.shortDescription ||
              (p.description ? p.description.slice(0, 120).replace(/\s+\S*$/, "") + "…" : "");

            return (
              <div
                key={key}
                className="panel-row clickable"
                onClick={() => onCommand?.(cmd)}
                title={p.description}
              >
                {/* 1) Project name (compact) */}
                <span className="panel-label">{p.title}</span>

                {/* 2) Description (gets most space) */}
                <span className="panel-meta">{short}</span>

                {/* 3) Action icons (right aligned) */}
                <span className="panel-extra project-icons" onClick={(e) => e.stopPropagation()}>
                  <TerminalIcon command={cmd} onCommand={onCommand} title={`View ${p.title} in terminal`} />
                  <TabIcon url={pageUrl} title={`Open ${p.title} page`} />
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" title={`Open ${p.title} on GitHub`}>
                      <img className="icon-sm" src={GitHubPng} alt="GitHub" />
                    </a>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
