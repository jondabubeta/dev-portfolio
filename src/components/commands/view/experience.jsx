import experienceData from '../../../data/experience.json';

export default function ExperienceViewer({ filter = {}, full = false }) {
  // Normalize and strip optional surrounding quotes
  const normalize = (v) =>
    String(v ?? '')
      .toLowerCase()
      .trim()
      .replace(/^"(.*)"$|^'(.*)'$/, (_, d1, d2) => d1 || d2 || '');

  // Accept a few aliases from the terminal parser
  const companyFilter = normalize(filter.company ?? filter.name);
  const titleFilter = normalize(filter.title ?? filter.role ?? filter.position);
  const tagsFilter = (() => {
    const raw =
      filter.tags == null
        ? []
        : Array.isArray(filter.tags)
        ? filter.tags
        : String(filter.tags).split(',');
    return raw.map(normalize).filter(Boolean);
  })();

  const matchesFilter = (exp) => {
    if (!full && exp.fullOnly) return false;

    if (companyFilter) {
      if (!normalize(exp.company).includes(companyFilter)) return false;
    }

    if (titleFilter) {
      if (!normalize(exp.title).includes(titleFilter)) return false;
    }

    if (tagsFilter.length) {
      const expTags = (exp.tags || []).map(normalize);
      if (!tagsFilter.some((t) => expTags.includes(t))) return false;
    }

    return true;
  };

  const filtered = experienceData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div className="terminal-error">No matching experience found.</div>;
  }

  // Group by company
  const grouped = filtered.reduce((acc, exp) => {
    (acc[exp.company] ||= []).push(exp);
    return acc;
  }, {});

  // Robust year parsing for sorting
  const parseYears = (years = '') => {
    const [startRaw = '', endRaw = ''] = String(years).split(/–|-/);
    const start = parseInt(startRaw, 10) || -Infinity;
    const end = /present/i.test(endRaw) ? Infinity : parseInt(endRaw, 10) || start || -Infinity;
    return { start, end };
  };

  // Sort roles per company by most recent first
  Object.values(grouped).forEach((roles) =>
    roles.sort((a, b) => {
      const A = parseYears(a.years);
      const B = parseYears(b.years);
      return B.end - A.end || B.start - A.start || String(b.title).localeCompare(String(a.title));
    })
  );

  // Sort companies by most recent role
  const companies = Object.keys(grouped).sort((c1, c2) => {
    const r1 = grouped[c1][0];
    const r2 = grouped[c2][0];
    const A = parseYears(r1?.years);
    const B = parseYears(r2?.years);
    return B.end - A.end || B.start - A.start || c1.localeCompare(c2);
  });

  return (
    <div className="experience-list">
      {companies.map((company) => {
        const roles = grouped[company];
        return (
          <div key={company} className="experience-group">
            <div className="exp-company">{company}</div>

            {roles.map((exp, index) => (
              <div key={`${company}-${index}`} className="experience-entry">
                <div className="exp-title">
                  {exp.title}
                  {exp.years && <span className="exp-years"> ({exp.years})</span>}
                </div>

                {exp.summary && <div className="exp-summary">&gt; {exp.summary}</div>}

                {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                  <ul className="exp-responsibilities">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={`${company}-${index}-resp-${i}`}>&gt; {resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
