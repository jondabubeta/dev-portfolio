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
      if (!lowerTags.some((tag) => exp.tags.map(normalize).includes(tag))) {
        return false;
      }
    }
    return true;
  };

  const filtered = experienceData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div className="text-red-400">No matching experience found.</div>;
  }

  return (
    <div className="space-y-6">
      {filtered.map((exp, index) => (
        <div key={index}>
          <div className="text-green-400 font-bold text-lg">{exp.company}</div>
          <div className="text-cyan-300 italic">{exp.title}</div>
          <div className="text-gray-400 text-sm">{exp.years}</div>

          {exp.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-800 text-green-300 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {Array.isArray(exp.summary) ? (
            <ul className="list-disc list-inside text-white pl-2">
              {exp.summary.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white">{exp.summary}</p>
          )}
        </div>
      ))}
    </div>
  );
}
