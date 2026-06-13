import React from "react";
import latestEntries from "../../../data/latest.json";

export default function LatestViewer() {
  return (
    <div className="output">
      <div className="experience-list">
        {latestEntries.map((entry) => (
          <div key={entry.slug} className="experience-group" style={{ marginBottom: "1rem" }}>
            <div className="exp-company" style={{ color: "var(--color-blue)" }}>
              {entry.title}
            </div>
            <div className="experience-entry">
              <div className="exp-summary">
                &gt; {entry.summary} Uploaded {entry.date}.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
