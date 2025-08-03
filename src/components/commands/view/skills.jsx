import skillsData from '../../../data/skills.json';

export default function SkillsViewer({ args = [] }) {
  const filters = {
    category: null,
    name: null
  };

  // Parse arguments like: --category=qa or --name=React
  args.forEach(arg => {
    if (arg.startsWith('--category=')) {
      filters.category = arg.split('=')[1].toLowerCase();
    }
    if (arg.startsWith('--name=')) {
      filters.name = arg.split('=')[1].toLowerCase();
    }
  });

  // Flatten skills into one array with categories
  const allSkills = Object.entries(skillsData).flatMap(([category, items]) =>
    items.map((skill) => ({ ...skill, category }))
  );

  // Apply filters
  const filtered = allSkills.filter((skill) => {
    const matchesCategory = filters.category ? skill.category.toLowerCase() === filters.category : true;
    const matchesName = filters.name ? skill.name.toLowerCase() === filters.name : true;
    return matchesCategory && matchesName;
  });

  return (
    <div>
      {filtered.map((skill) => (
        <div key={skill.name} style={{ marginBottom: '1.5rem' }}>
          <div><strong>{skill.name}</strong> {skill.tags ? `(${skill.tags.join(', ')})` : ''}</div>
          <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{skill.description}</div>
          <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{skill.experience}</div>
          {skill.image && (
            <img
              src={`/src/assets/skills/${skill.image}`}
              alt={`${skill.name} logo`}
              style={{ width: '40px', height: '40px', marginTop: '4px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
