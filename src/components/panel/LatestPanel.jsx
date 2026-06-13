import React, { useState } from "react";
import { TerminalIcon, TabIcon } from "../icons";
import latestEntries from "../../data/latest.json";

export default function LatestPanel({ onCommand, onNavigateLatest }) {
  const [openSlug, setOpenSlug] = useState(null);

  const toggleEntry = (slug) => {
    setOpenSlug((value) => value === slug ? null : slug);
  };

  return (
    <div className="section-container latest-section">
      <h3>Latest</h3>

      <div className="scrollable-section latest-scrollable">
        <div className="panel-table latest-table">
          {latestEntries.map((entry) => {
            const pageUrl = `/latest/${entry.slug}`;
            const isOpen = openSlug === entry.slug;

            return (
              <React.Fragment key={entry.slug}>
                <div
                  className={`panel-row latest-row clickable${isOpen ? " is-open" : ""}`}
                  onClick={() => toggleEntry(entry.slug)}
                  title={entry.title}
                  aria-expanded={isOpen}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleEntry(entry.slug);
                    }
                  }}
                >
                  <span className="latest-main">
                    <span className={`latest-toggle-icon${isOpen ? " is-open" : ""}`} aria-hidden="true">
                      ▶
                    </span>
                    <span className="latest-title">{entry.title}</span>
                  </span>
                  <span className="latest-date">{entry.date}</span>
                  <span className="panel-extra" onClick={(e) => e.stopPropagation()}>
                    <TerminalIcon
                      command="view latest"
                      onCommand={onCommand}
                      title="Open latest in Terminal"
                    />
                    <TabIcon
                      url={pageUrl}
                      onNavigate={onNavigateLatest}
                      title={`Open ${entry.title} page`}
                    />
                  </span>
                </div>
                {isOpen && (
                  <div className="latest-dropdown">
                    <span className="latest-description">{entry.summary}</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
