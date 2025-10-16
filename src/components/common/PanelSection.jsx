export default function PanelSection({ title, children }) {
  return (
    <div className="section-container">
      <h3>{title}</h3>
      <div className="scrollable-table">{children}</div>
    </div>
  );
}
