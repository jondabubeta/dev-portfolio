import React from "react";
import latestEntries from "../../../utils/latestEntries";

export default function LatestViewer() {
  return (
    <div className="output">
      <div className="experience-list">
        {latestEntries.map((entry) => (
          <div key={entry.slug} className="experience-group" style={{ marginBottom: "1rem" }}>
            <a
              className="exp-company"
              href={`/latest/${entry.slug}`}
              style={{ color: "var(--color-blue)" }}
            >
              {entry.title}
            </a>
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
