import React, { useState } from "react";
import skillsData from "../data/skills.json";

const CATEGORY_LABELS = {
  qa: "QA & Automation",
  web: "Web Development",
};

export default function SkillsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const categories = Object.entries(skillsData);

  return (
    <div className="skills-page-root">
      <h1>Skills</h1>
      {categories.map(([category, skills], idx) => (
        <div key={category} className="skills-category-section">
          <button
            className="skills-category-btn"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
          {openIndex === idx && (
            <ul className="skills-list">
              {skills.map((skill) => (
                <li key={skill.name} className="skills-list-item">
                  <div className="skills-list-name">{skill.name}</div>
                  <div className="skills-list-desc">{skill.description}</div>
                  <div className="skills-list-exp">{skill.experience}</div>
                  {skill.tags && (
                    <div className="skills-list-tags">
                      {skill.tags.map(tag => (
                        <span key={tag} className="skills-list-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}