import skillsData from '../../../data/skills.json';

export default function SkillsViewer({ args = {} }) {
  const filters = {
    category: args.category || null,
    name: args.name || null
  };

  // Flatten skills into one array with categories
  const allSkills = Object.entries(skillsData).flatMap(([category, items]) =>
    items.map((skill) => ({ ...skill, category }))
  );

  // Apply filters
  const filtered = allSkills.filter((skill) => {
    if (filters.name) {
      return skill.name.trim().toLowerCase().includes(filters.name.trim().toLowerCase());
    }
    return true; // If no name filter is provided, include all skills
  });

  // Remove duplicates based on skill name
  const uniqueFiltered = filtered.filter((skill, index, self) =>
    index === self.findIndex((s) => s.name.toLowerCase() === skill.name.toLowerCase())
  );

  return (
    <div>
      {uniqueFiltered.map((skill, index) => (
        <div key={`${skill.name}-${index}`} style={{ marginBottom: '1.5rem' }}>
          <div className="text-green"><strong>{skill.name}</strong> {skill.tags ? `(${skill.tags.join(', ')})` : ''}</div>
          <div className="text-blue" style={{ fontSize: '0.9rem' }}>{skill.description}</div>
          <div style={{ fontSize: '0.85rem' }}>{skill.experience}</div>
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
