import skillsData from '../data/skills.json';

export default function Skills({ onCommand }) {
  const categories = Object.keys(skillsData);

  return (
    <div className="section-container sm">
      <h3>Skills</h3>
      <div className="scrollable-skills">
        <div className="skill-cloud">
          {categories.flatMap((category) =>
            skillsData[category].map((skill, idx) => (
              <span
                key={`${category}:${skill.name}:${idx}`}  // unique key per pill
                className={`skill-pill ${category}-skill clickable`}
                onClick={() => onCommand?.(`view skills --name="${skill.name}"`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCommand?.(`view skills --name="${skill.name}"`);
                  }
                }}
                title={`Filter by ${skill.name}`}
              >
                {skill.name}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
