import React from "react";
import experience from "../../data/experience.json";

/* Utility to parse end date for sorting */
function parseEndDate(item) {
  const present = /present/i;

  if (item.end) {
    const t = Date.parse(item.end);
    if (!Number.isNaN(t)) return t;
  }
  if (item.endDate) {
    const t = Date.parse(item.endDate);
    if (!Number.isNaN(t)) return t;
  }
  if (item.endYear) {
    const y = parseInt(String(item.endYear), 10);
    if (!Number.isNaN(y)) return Date.UTC(y, 11, 31);
  }
  if (item.years) {
    const parts = String(item.years).split(/[-–—]/).map(s => s.trim());
    const right = parts[1] || parts[0];
    if (present.test(right)) return Date.now();
    const yr = parseInt(right, 10);
    if (!Number.isNaN(yr)) return Date.UTC(yr, 11, 31);
    const t = Date.parse(right);
    if (!Number.isNaN(t)) return t;
  }
  if (item.current === true) return Date.now();
  return Date.UTC(1970, 0, 1);
}

/* Format years text */
function yearsText(item) {
  if (item.years) return item.years;
  if (item.startYear || item.endYear) {
    const s = item.startYear ? String(item.startYear) : "";
    const e = item.endYear ? String(item.endYear) : "Present";
    return `${s}–${e}`;
  }
  if (item.start || item.end) {
    const s = item.start ? new Date(item.start).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "";
    const e = item.end ? new Date(item.end).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";
    return `${s}–${e}`;
  }
  return "";
}

export default function ExperiencePanel({ onCommand }) {
  // Sort all experiences by end date descending
  const latest = [...experience]
    .sort((a, b) => parseEndDate(b) - parseEndDate(a))
    .slice(0, 4); // limit to latest 3

  return (
    <div className="section-container">
      <h3>Experience</h3>

      <div className="scrollable-table">
        <div className="panel-table">
          {latest.map((exp, i) => {
            const key = [
              exp.company,
              exp.title,
              exp.sidePanelTitle,
              exp.years,
              i,
            ]
              .filter(Boolean)
              .join("::");

            const company = exp.company || "—";
            const position = exp.sidePanelTitle || exp.title || "";
            const when = yearsText(exp);
                    const positionFlag = position ? ` --position="${position}"` : "";
                    const yearsFlag = when ? ` --years="${when}"` : "";
                    const cmd = `view experience --company="${company}"${positionFlag}${yearsFlag}`;

            return (
              <div
                key={key}
                className="panel-row clickable"
                onClick={() => onCommand?.(cmd)}
                title={`${company} • ${position} ${when ? `• ${when}` : ""}`}
              >
                <span className="panel-label">{company}</span>
                <span className="panel-meta">{position}</span>
                <span className="panel-extra">{when}</span>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
