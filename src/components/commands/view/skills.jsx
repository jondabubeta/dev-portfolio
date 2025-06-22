import skillsData from '../../../data/skills.json';

export default function SkillsViewer() {
  const categories = Object.keys(skillsData);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      {categories.map((category) => (
        <div key={category}>
          <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong><br />
          {skillsData[category].join(', ')}
        </div>
      ))}
    </div>
  );
}
