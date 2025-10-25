import React from "react";

// Static items list so the sidebar can be edited manually (matches CurrentPanel style)
const items = [
  {
    company: "Blizzard Entertainment",
    position: "Senior SDET",
    years: "2022–Present",
    cmd: 'view experience --company="Blizzard Entertainment" --position="Senior SDET" --years="Present"',
  },
  {
    company: "Dexcom",
    position: "SDET II",
    years: "2021–2022",
    cmd: 'view experience --company="Dexcom" --position="SDET II" --years="2022"',
  },
  {
    company: "Dexcom",
    position: "SDET I",
    years: "2019–2021",
    cmd: 'view experience --company="Dexcom" --position="SDET I" --years="2019"',
  },
  {
    company: "Neustar",
    position: "SDET",
    years: "2017–2019",
    cmd: 'view experience --company="Neustar" --position="SDET" --years="2017"',
  },
];

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
  return (
    <div className="section-container">
      <h3>Experience</h3>

      <div className="scrollable-table">
        <div className="panel-table">
          {items.map((row, i) => (
            <div
              key={`${row.company}::${row.position}::${i}`}
              className="panel-row clickable"
              onClick={() => onCommand?.(row.cmd)}
              title={row.cmd}
            >
              <span className="panel-label">{row.company}</span>
              <span className="panel-meta">{row.position}</span>
              <span className="panel-extra">{row.years}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
