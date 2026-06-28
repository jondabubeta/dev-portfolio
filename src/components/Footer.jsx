import statusData from '../data/status.json';

export default function Footer() {
  const statuses = statusData;

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-status-wrapper">
          <div className="footer-status-marquee">
            {/* Render statuses twice for seamless loop */}
            {[...statuses, ...statuses].map((item, index) => (
              <div key={index} className="status-item">
                <span className="status-emoji">{item.emoji}</span>
                <span className="status-text">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-text">
          <p>(c) 2026 Jonathan Dabu</p>
        </div>
      </div>
    </footer>
  );
}
