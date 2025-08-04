import skillsData from '../data/skills.json';

export default function Skills({ onCommand }) {
  const categories = Object.keys(skillsData);

  return (
    <div className="section-container sm">
      <h3>Skills</h3>
      <div className="scrollable-skills">
        <div className="skill-cloud">
          {categories.flatMap((category) =>
            skillsData[category].map((skill) => (
              <span
                key={skill.name}
                className={`skill-pill ${category}-skill`}
                onClick={() => onCommand(`view skill --name="${skill.name}"`)}
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
