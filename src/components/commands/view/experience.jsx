import experienceData from '../../../data/experience.json';

export default function ExperienceViewer({ filter = {} }) {
  const normalize = (str) => str.toLowerCase();

  const matchesFilter = (exp) => {
    if (
      filter.company &&
      !normalize(exp.company).includes(normalize(filter.company))
    ) {
      return false;
    }
    if (
      filter.title &&
      !normalize(exp.title).includes(normalize(filter.title))
    ) {
      return false;
    }
    if (filter.tags) {
      const tags = Array.isArray(filter.tags)
        ? filter.tags
        : filter.tags.split(',');
      const lowerTags = tags.map(normalize);
      if (!lowerTags.some((tag) => exp.tags?.map(normalize).includes(tag))) {
        return false;
      }
    }
    return true;
  };

  const filtered = experienceData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div className="terminal-error">No matching experience found.</div>;
  }

  return (
    <div className="experience-list">
      {filtered.map((exp, index) => (
        <div key={index} className="experience-entry">
          <div className="exp-company">{exp.company}</div>
          <div className="exp-title">{exp.title}</div>
          <div className="exp-years">{exp.years}</div>

          <div className="exp-summary">
            &gt; {exp.summary}
          </div>

          {exp.responsibilities?.length > 0 && (
            <ul className="exp-responsibilities">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>&gt; {resp}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
