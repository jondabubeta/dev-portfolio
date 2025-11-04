import React from "react";
import TerminalIcon from "../common/TerminalIcon";
import TabIcon from "../common/TabIcon";

function slugify(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const items = [
  {
    label: "Checkout UI → JBTF",
    meta: "Migration",
    extra: "Active",
    cmd: 'view projects --name="Checkout UI Migration"',
  },
  {
    label: "Terminal Portfolio",
    meta: "React · Vite",
    extra: "Ongoing",
    cmd: 'view projects --name="Terminal Portfolio"',
  },
  {
    label: "Identity Scenario Tests",
    meta: "Spring Boot · Jenkins",
    extra: "Maintaining",
    cmd: 'view projects --name="Identity Scenario Tests"',
  },
];

export default function CurrentPanel({ onCommand }) {
  return (
    <div className="section-container">
      <h3>Current</h3>

      <div className="scrollable-table">
        <div className="panel-table">
          {items.map((row) => {
            const pageUrl = `/projects/${slugify(row.label)}`;
            return (
              <div
                key={row.label}
                className="panel-row clickable"
                onClick={() => onCommand?.(row.cmd)}
                title={row.cmd}
              >
                <span className="panel-label">{row.label}</span>
                <span className="panel-meta">{row.meta}</span>

                {/* New action column: terminal + tab icons (prevents row click) */}
                <span className="panel-extra project-icons" onClick={(e) => e.stopPropagation()}>
                  <TerminalIcon command={row.cmd} onCommand={onCommand} title={`View ${row.label} in terminal`} />
                  <TabIcon url={pageUrl} title={`Open ${row.label} page`} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
