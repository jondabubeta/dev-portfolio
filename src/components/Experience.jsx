// src/components/Experience.jsx
import { useState } from 'react';
import experienceData from '../data/experience.json';
import TabIcon from './common/TabIcon';

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
      // Include the position so clicking the row filters to the specific role
      const companyItem = uniqueCompanies.find((u) => u.company === company);
      const position = companyItem?.position;
      const positionFlag = position ? ` --position="${position}"` : '';
      onCommand(`view experience --company="${company}"${positionFlag}`);
    }
  };

  // Helper to generate a portfolio subpage URL for each company
  const createCompanyUrl = (company) => {
    const slug = company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `/experience/${slug}`;
  };

  return (
    <div className="section-container sm">
      <h3>Experience</h3>
      <div className="scrollable-experience">
        <div className="experience-table">
          {latestCompanies.map((item, idx) => {
            const subPageUrl = createCompanyUrl(item.company);

            return (
              <div className="experience-row" key={`${item.company}-${idx}`}>
                <span
                  className={`experience-label clickable${
                    activeCompany === item.company ? ' active' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCompanyClick(item.company)}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && handleCompanyClick(item.company)
                  }
                >
                  {item.company}
                </span>

                <div className="experience-meta">
                  {onCommand ? (
                    <span
                      role="button"
                      tabIndex={0}
                      className="clickable"
                      onClick={() =>
                        onCommand(
                          `view experience --company="${item.company}" --position="${item.position}"`
                        )
                      }
                      onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') &&
                        onCommand(
                          `view experience --company="${item.company}" --position="${item.position}"`
                        )
                      }
                    >
                      {item.position}
                    </span>
                  ) : (
                    item.position
                  )}
                </div>

                <div className="experience-dates">{item.years}</div>

                <div className="experience-tab">
                  <TabIcon
                    url={subPageUrl}
                    title={`Open ${item.company} page`}
                    size={16}
                    className="ml-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
