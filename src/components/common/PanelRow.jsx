
// src/components/common/PanelRow.jsx
export function PanelRow({ c1, c2, c3, onClick }) {
  return (
    <div className={`panel-row${onClick ? " clickable" : ""}`} onClick={onClick}>
      <span className="panel-label">{c1}</span>
      <span className="panel-meta">{c2}</span>
      <span className="panel-extra">{c3}</span>
    </div>
  );
}
