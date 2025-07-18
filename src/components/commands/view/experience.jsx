import experienceData from '../../../data/experience.json';

export default function ExperienceViewer({ filter = {}, full = false }) {
  const normalize = (str) => str.toLowerCase();

  const matchesFilter = (exp) => {
    if (!full && exp.fullOnly) return false;

    if (
      filter.company &&
      !normalize(exp.company).includes(normalize(filter.company))
    ) return false;

    if (
      filter.title &&
      !normalize(exp.title).includes(normalize(filter.title))
    ) return false;

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

  // Group by company
  const grouped = filtered.reduce((acc, exp) => {
    if (!acc[exp.company]) acc[exp.company] = [];
    acc[exp.company].push(exp);
    return acc;
  }, {});

  // Sort roles in each company by most recent (assumes descending string works)
  Object.values(grouped).forEach((roles) =>
    roles.sort((a, b) => (b.years || '').localeCompare(a.years || ''))
  );

  return (
    <div className="experience-list">
      {Object.entries(grouped).map(([company, roles]) => (
        <div key={company} className="experience-group">
          <div className="exp-company">{company}</div>

          {roles.map((exp, index) => (
            <div key={index} className="experience-entry">
              <div className="exp-title">
                {exp.title}
                <span className="exp-years"> ({exp.years})</span>
              </div>

              <div className="exp-summary">&gt; {exp.summary}</div>

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
      ))}
    </div>
  );
}
