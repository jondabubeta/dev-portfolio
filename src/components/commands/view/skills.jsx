import skillsData from '../../../data/skills.json';

export default function SkillsViewer({ filter = {} }) {
  const categories = Object.keys(skillsData);

  return (
    <div>
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: '1rem' }}>
          <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {skillsData[category].map((skill, index) => (
              <li key={index}>{typeof skill === 'string' ? skill : skill.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
