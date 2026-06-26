import { useEffect, useState } from "react";
import skillsData from "../../data/skills.json";

const MIN_VISIBLE_SKILLS = 12;

function getVisibleSkillLimit(totalSkills) {
  if (typeof window === "undefined") return MIN_VISIBLE_SKILLS;

  const { innerHeight, innerWidth } = window;
  let visibleCount = MIN_VISIBLE_SKILLS;

  if (innerHeight >= 760) visibleCount += 2;
  if (innerHeight >= 860) visibleCount += 2;
  if (innerHeight >= 980) visibleCount += 2;
  if (innerHeight >= 1120) visibleCount += 4;

  if (innerWidth >= 1440) visibleCount += 2;
  if (innerWidth >= 1920) visibleCount += 2;
  if (innerWidth >= 2560) visibleCount += 2;

  return Math.min(totalSkills, visibleCount);
}

export default function SkillsPanel({ onCommand, onNavigatePage }) {
  const allSkills = Object.entries(skillsData).flatMap(([cat, arr]) =>
    arr.map((s) => ({ ...s, category: cat }))
  );
  const [visibleSkillLimit, setVisibleSkillLimit] = useState(() =>
    getVisibleSkillLimit(allSkills.length)
  );
  const showMore = visibleSkillLimit < allSkills.length;
  const visibleSkills = allSkills.slice(0, visibleSkillLimit);

  useEffect(() => {
    const updateVisibleSkillLimit = () => {
      setVisibleSkillLimit(getVisibleSkillLimit(allSkills.length));
    };

    updateVisibleSkillLimit();
    window.addEventListener("resize", updateVisibleSkillLimit);

    return () => window.removeEventListener("resize", updateVisibleSkillLimit);
  }, [allSkills.length]);

  const handleSkillClick = (skillName) => {
    const cmd = `view skills --name="${skillName}"`;
    onCommand?.(cmd);
  };

  const handleOpenAllSkills = (e) => {
    if (!onNavigatePage) return;
    e.preventDefault();
    onNavigatePage('/skills');
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
            onClick={handleOpenAllSkills}
            style={{ textDecoration: 'none' }}
          >
            +MORE
          </a>
        )}
      </div>
    </div>
  );
}
