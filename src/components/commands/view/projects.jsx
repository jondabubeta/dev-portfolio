import projectsData from '../../../data/projects.json';
import { matchStatusInput, STATUSES } from '../../../constants/projectStatuses';

export default function ProjectsViewer({ filter = {}, full = false }) {
  const normalize = (v) =>
    String(v ?? '')
      .toLowerCase()
      .trim()
      .replace(/^"(.*)"$|^'(.*)'$/, (_, d1, d2) => d1 || d2 || '');

  const nameFilter = normalize(filter.name);
  const tagFilter  = normalize(filter.tag ?? filter.tags);
  const statusRaw = filter.status ?? filter.state;
  const statusKey = matchStatusInput(statusRaw);

  // Treat string "true"/"false" as booleans
  const includeFull =
    typeof full === 'string' ? full.toLowerCase() === 'true' : !!full;

  const anyFilter = !!nameFilter || !!tagFilter || !!statusKey;

  const matchesFilter = (p) => {
    // Only enforce fullOnly when NO filters are provided (mirror Experience)
    if (!anyFilter && !includeFull && p.fullOnly) return false;

    if (nameFilter && !normalize(p.title).includes(nameFilter)) return false;

    if (statusKey) {
      const pStatusKey = matchStatusInput(p.status ?? p.state ?? p.role);
      if (pStatusKey !== statusKey) return false;
    }

    if (tagFilter) {
      const tech = (p.tech || []).map(normalize);
      const tags = (p.tags || []).map(normalize);
      const inDesc = normalize(p.description).includes(tagFilter);
      if (!inDesc && !tech.includes(tagFilter) && !tags.includes(tagFilter)) {
        return false;
      }
    }

    return true;
  };

  // Year parsing (supports "2023–Present" or "2023-2024" or single year)
  const parseYears = (years = '', fallbackYear = '') => {
    if (!years && fallbackYear) years = String(fallbackYear);
    const [startRaw = '', endRaw = ''] = String(years).split(/–|-/);
    const start = parseInt(startRaw, 10) || -Infinity;
    const end =
      /present/i.test(endRaw) ? Infinity : parseInt(endRaw, 10) || start || -Infinity;
    return { start, end };
  };

  const filtered = projectsData
    .filter(matchesFilter)
    .sort((a, b) => {
      const A = parseYears(a.years, a.year);
      const B = parseYears(b.years, b.year);
      return B.end - A.end || B.start - A.start || String(b.title).localeCompare(String(a.title));
    });

  if (filtered.length === 0) {
    return <div className="output">No matching projects found.</div>;
  }

  // Render with the same DOM/class structure as ExperienceViewer
  return (
    <div className="output">
      <div className="experience-list">
        {filtered.map((p, idx) => (
          <div key={`${p.title}-${idx}`} className="experience-group">
            {/* Project name styled like company header */}
            <div className="exp-company" style={{ color: 'var(--color-green)' }}>{p.title}</div>

            {/* Single entry per project (matches Experience entry layout) */}
            <div className="experience-entry">
              {Array.isArray(p.tech) && p.tech.length > 0 && (
                <div className="exp-title" style={{ color: 'var(--color-blue)' }}>
                  {/* role/status on the left if present */}
                  {p.role || p.status ? (
                    <>
                      {p.role || p.status}
                      {(p.years || p.year) && (
                        <span className="exp-years">
                          {' '}
                          ({p.years || p.year})
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {/* If no role/status, still show years if available */}
                      {p.years || p.year ? (
                        <>
                          <span className="exp-years">({p.years || p.year})</span>
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              )}
              {/* Tech as a final bullet to keep the same look */}
              {Array.isArray(p.tech) && p.tech.length > 0 && (
                <div style={{ color: 'var(--color-blue)' }}>
                  Tech: {p.tech.join(', ')}
                </div>
              )}

              {p.description && (
                <div className="exp-summary">&gt; {p.description}</div>
              )}



              {/* Highlights → responsibilities list */}
              {Array.isArray(p.highlights) && p.highlights.length > 0 && (
                <ul className="exp-responsibilities">
                  {p.highlights.map((h, i) => (
                    <li key={`h-${i}`}>&gt; {h}</li>
                  ))}
                </ul>
              )}

              {/* Optional links row */}
              {(p.github || p.demo || p.link) && (
                <div className="exp-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">Demo</a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer">Link</a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
