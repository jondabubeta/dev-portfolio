import React from "react";
import skillsData from "../../data/skills.json";

export default function SkillsPanel() {
  const allSkills = Object.entries(skillsData).flatMap(([cat, arr]) =>
    arr.map((s) => ({ ...s, category: cat }))
  );

  return (
    <div className="section-container">
      <h3>Skills</h3>
      <div className="scrollable-table">
        <div className="skill-cloud">
          {allSkills.map((s) => (
            <div
              key={s.name}
              className={`skill-pill ${s.category.toLowerCase()}-skill`}
              title={s.description}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
