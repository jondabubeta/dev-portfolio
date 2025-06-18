import experienceData from '../../../data/experience.json';

export default function ExperienceViewer({ filter = {} }) {
  const normalize = (str) => str.toLowerCase();

  const matchesFilter = (exp) => {
    if (filter.company && !normalize(exp.company).includes(normalize(filter.company))) {
      return false;
    }
    if (filter.title && !normalize(exp.title).includes(normalize(filter.title))) {
      return false;
    }
    if (filter.tags) {
      const tags = Array.isArray(filter.tags) ? filter.tags : filter.tags.split(',');
      const lowerTags = tags.map(normalize);
      if (!lowerTags.some(tag => exp.tags.map(normalize).includes(tag))) {
        return false;
      }
    }
    return true;
  };

  const filtered = experienceData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div>No matching experience found.</div>;
  }

  return (
    <div>
      {filtered.map((exp, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <div><strong>{exp.company}</strong> — {exp.title} ({exp.years})</div>
          <div>{exp.summary}</div>
        </div>
      ))}
    </div>
  );
}
