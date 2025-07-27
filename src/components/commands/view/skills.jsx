import skillsData from '../../../data/skills.json';

export default function SkillsViewer() {
  const categories = Object.keys(skillsData);

  return (
    <div>
      <div className="skills-grid">
        {categories.map((category) => (
          <div key={category} className="skills-column">
            <div className="exp-company">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <ul className="exp-responsibilities">
              {skillsData[category].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
