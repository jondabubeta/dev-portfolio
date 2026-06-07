import React from "react";
import { TerminalIcon } from "../icons";

export default function LatestPanel({ onCommand }) {
  const cmd = "view latest";

  return (
    <div className="section-container latest-section">
      <h3>Latest</h3>

      <div className="scrollable-section latest-scrollable">
        <div className="panel-table latest-table">
          <div className="panel-row clickable" onClick={() => onCommand?.(cmd)} title="No updates yet">
            <span className="panel-label">—</span>
            <span className="panel-meta">Nothing to show yet</span>
            <span className="panel-extra" onClick={(e) => e.stopPropagation()}>
              <TerminalIcon command={cmd} onCommand={onCommand} title="View latest in terminal" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}