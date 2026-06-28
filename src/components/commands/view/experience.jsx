import experienceData from '../../../data/experience.json';

export default function ExperienceViewer({ filter = {}, full = false }) {
  const normalize = (v) =>
    String(v ?? '')
      .toLowerCase()
      .trim()
      .replace(/^"(.*)"$|^'(.*)'$/, (_, d1, d2) => d1 || d2 || '');

  // Accept common flag aliases
  const companyFilter = normalize(filter.company ?? filter.name);
  const titleFilter   = normalize(filter.title ?? filter.role ?? filter.position);
  const yearsFilter   = normalize(filter.years ?? filter.when ?? filter.y);
  const tagsFilter = (() => {
    const raw =
      filter.tags == null
        ? []
        : Array.isArray(filter.tags)
        ? filter.tags
        : String(filter.tags).split(',');
    return raw.map(normalize).filter(Boolean);
  })();

  // Treat string "true"/"false" as booleans
  const includeFull =
    typeof full === 'string' ? full.toLowerCase() === 'true' : !!full;

  // Year parsing helper (used by filtering and sorting)
  const parseYears = (years = '') => {
    const [startRaw = '', endRaw = ''] = String(years).split(/-|-/);
    const start = parseInt(startRaw, 10) || -Infinity;
    const end = /present/i.test(endRaw) ? Infinity : parseInt(endRaw, 10) || start || -Infinity;
    return { start, end };
  };

  // Any filter means we ignore fullOnly
  const anyFilter = !!companyFilter || !!titleFilter || !!yearsFilter || tagsFilter.length > 0;

  const matchesFilter = (exp) => {
    // Only enforce fullOnly when NO filters are provided
    if (!anyFilter && !includeFull && exp.fullOnly) return false;

    if (companyFilter && !normalize(exp.company).includes(companyFilter)) return false;
    if (titleFilter) {
      const titleMatch = normalize(exp.title).includes(titleFilter);
      const sideTitleMatch = String(exp.sidePanelTitle ?? '')
        .toLowerCase()
        .includes(titleFilter);
      if (!titleMatch && !sideTitleMatch) return false;
    }

    if (yearsFilter) {
      const f = String(yearsFilter).trim();
      // range like 2019-2021 or 2019-2021
      const rangeMatch = f.match(/(\d{4})\s*(?:-|-|-|to)\s*(\d{4}|present)/i);
      const expRange = parseYears(exp.years);
      if (rangeMatch) {
        const fStart = parseInt(rangeMatch[1], 10);
        const fEnd = /present/i.test(rangeMatch[2]) ? Infinity : parseInt(rangeMatch[2], 10);
        // overlap check
        if (fEnd < expRange.start || fStart > expRange.end) return false;
      } else {
        const yearMatch = f.match(/(\d{4})/);
        if (yearMatch) {
          const y = parseInt(yearMatch[1], 10);
          if (y < expRange.start || y > expRange.end) return false;
        } else {
          // fallback to substring match
          const expYears = String(exp.years ?? '').toLowerCase().trim();
          if (!expYears.includes(f.toLowerCase())) return false;
        }
      }
    }

    if (tagsFilter.length) {
      const expTags = (exp.tags || []).map(normalize);
      if (!tagsFilter.some((t) => expTags.includes(t))) return false;
    }

    return true;
  };

  const filtered = experienceData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div className="output">No matching experience found.</div>;
  }

  // Group by company
  const grouped = filtered.reduce((acc, exp) => {
    (acc[exp.company] ||= []).push(exp);
    return acc;
  }, {});

  // Year parsing is defined above and reused for sorting
  Object.values(grouped).forEach((roles) =>
    roles.sort((a, b) => {
      const A = parseYears(a.years);
      const B = parseYears(b.years);
      return B.end - A.end || B.start - A.start || String(b.title).localeCompare(String(a.title));
    })
  );

  const companies = Object.keys(grouped).sort((c1, c2) => {
    const r1 = grouped[c1][0];
    const r2 = grouped[c2][0];
    const A = parseYears(r1?.years);
    const B = parseYears(r2?.years);
    return B.end - A.end || B.start - A.start || c1.localeCompare(c2);
  });

  return (
    <div className="output">
      <div className="experience-list">
        {companies.map((company) => {
          const roles = grouped[company];
          return (
            <div key={company} className="experience-group">
              <div className="exp-company text-blue">{company}</div>

              {roles.map((exp, index) => (
                <div key={`${company}-${index}`} className="experience-entry">
                  <div className="exp-title">
                    <span className="text-orange">{exp.title}</span>
                    {exp.years && (
                      <span className="exp-years"> (<span className="text-gray">{exp.years}</span>)</span>
                    )}
                  </div>

                  {exp.summary && (
                    <div className="exp-summary">
                      &gt; <span className="text-gray-italic">{exp.summary}</span>
                    </div>
                  )}

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
    </div>
  );
}
