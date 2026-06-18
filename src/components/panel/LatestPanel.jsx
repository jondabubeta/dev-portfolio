import React, { useState } from "react";
import { TerminalIcon, TabIcon } from "../icons";
import latestEntries from "../../utils/latestEntries";

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
                  className={`panel-row latest-row${isOpen ? " is-open" : ""}`}
                  title={entry.title}
                >
                  <span className="latest-main">
                    <button
                      className={`latest-toggle-icon${isOpen ? " is-open" : ""}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`latest-description-${entry.slug}`}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${entry.title} description`}
                      onClick={() => toggleEntry(entry.slug)}
                    >
                      ▶
                    </button>
                    <a
                      className="latest-title"
                      href={pageUrl}
                      onClick={(e) => {
                        if (!onNavigateLatest) return;
                        e.preventDefault();
                        onNavigateLatest(pageUrl);
                      }}
                    >
                      {entry.title}
                    </a>
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
                  <div id={`latest-description-${entry.slug}`} className="latest-dropdown">
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
