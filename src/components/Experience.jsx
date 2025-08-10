// src/components/Experience.jsx
import { useState } from 'react';
import experienceData from '../data/experience.json';

export default function Experience({ onCommand }) {
  const uniqueCompanies = [];
  const seen = new Set();

  for (const item of experienceData) {
    if (!seen.has(item.company)) {
      seen.add(item.company);
      uniqueCompanies.push({
        company: item.company,
        position: item.sidePanelTitle || item.title,
        years: item.years,
      });
    }
  }

  const latestCompanies = uniqueCompanies.slice(0, 3);
  const [activeCompany, setActiveCompany] = useState(null);

  const handleCompanyClick = (company) => {
    if (!onCommand) return;
    if (activeCompany === company) {
      setActiveCompany(null);
      onCommand('view experience'); // clear
    } else {
      setActiveCompany(company);
      onCommand(`view experience --company="${company}"`);
    }
  };

  return (
    <div className="section-container sm">
      <h3>Experience</h3>
      <div className="scrollable-experience">
        <div className="experience-table">
          {latestCompanies.map((item, idx) => (
            <div className="experience-row" key={`${item.company}-${idx}`}>
              <span
                className={`experience-label clickable${activeCompany === item.company ? ' active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => handleCompanyClick(item.company)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCompanyClick(item.company)}
                title={`Filter by ${item.company}`}
              >
                {item.company}
              </span>
              <div className="experience-meta">{item.position}</div>
              <div className="experience-dates">{item.years}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
