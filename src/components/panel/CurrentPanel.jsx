import React from "react";

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
          {items.map((row) => (
            <div
              key={row.label}
              className="panel-row clickable"
              onClick={() => onCommand?.(row.cmd)}
              title={row.cmd}
            >
              <span className="panel-label">{row.label}</span>
              <span className="panel-meta">{row.meta}</span>
              <span className="panel-extra">{row.extra}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
