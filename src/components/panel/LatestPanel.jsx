import React from "react";
import { useState } from "react";
import { TabIcon } from "../icons";

export default function LatestPanel({ onCommand }) {
  const cmd = "view latest";
  const latestDate = "06/11/26";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="section-container latest-section">
      <h3>Latest</h3>

      <div className="scrollable-section latest-scrollable">
        <div className="panel-table latest-table">
          <div
            className={`panel-row latest-row clickable${isOpen ? " is-open" : ""}`}
            onClick={() => setIsOpen((value) => !value)}
            title="Fairness testing through AI and ML"
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsOpen((value) => !value)}
          >
            <span className="latest-main">
              <span className={`latest-toggle-icon${isOpen ? " is-open" : ""}`} aria-hidden="true">
                ▶
              </span>
              <span className="latest-title">Fairness Testing Through AI and ML</span>
            </span>
            <span className="latest-date">{latestDate}</span>
            <span className="panel-extra" onClick={(e) => e.stopPropagation()}>
              <TabIcon command={cmd} onCommand={onCommand} title="View latest in tab" />
            </span>
          </div>
          {isOpen && (
            <div className="latest-dropdown">
              <span className="latest-description">
                Bias detection, measurement gaps, and evaluation workflows.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}