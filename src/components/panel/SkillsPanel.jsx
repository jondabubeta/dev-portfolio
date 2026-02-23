import React from "react";
import skillsData from "../../data/skills.json";

export default function SkillsPanel({ onCommand }) {
  const MAX_VISIBLE = 12;  // show 12 skills in sidebar
  const allSkills = Object.entries(skillsData).flatMap(([cat, arr]) =>
    arr.map((s) => ({ ...s, category: cat }))
  );
  const showMore = true;  // always show "more" button for future skills
  const visibleSkills = showMore ? allSkills.slice(0, MAX_VISIBLE) : allSkills;

  const handleSkillClick = (skillName) => {
    const cmd = `view skills --name="${skillName}"`;
    onCommand?.(cmd);
  };

  return (
    <div className="section-container">
      <h3>Skills</h3>
      <div className="skills-scrollable">
        <div className="skill-cloud">
          {visibleSkills.map((s) => (
            <div
              key={s.name}
              className={`skill-pill ${s.category.toLowerCase()}-skill clickable`}
              title={s.description}
              onClick={() => handleSkillClick(s.name)}
            >
              {s.name}
            </div>
          ))}
        </div>
        {showMore && (
          <a
            className="skills-more-link"
            href="/skills"
            title="See all skills"
            style={{ textDecoration: 'none' }}
          >
            +MORE
          </a>
        )}
      </div>
    </div>
  );
}
