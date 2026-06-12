import React from "react";

export default function LatestViewer() {
  return (
    <div className="output">
      <div className="experience-list">
        <div className="experience-group" style={{ marginBottom: "1rem" }}>
          <div className="exp-company" style={{ color: "var(--color-blue)" }}>
            Latest
          </div>
          <div className="experience-entry">
            <div className="exp-summary">
              &gt; Fairness testing through AI and ML, focused on bias detection, measurement gaps,
              and evaluation workflows. Uploaded 06/11/26.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}