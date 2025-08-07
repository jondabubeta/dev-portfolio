import projects from '../../../data/projects.json';

export default function ProjectsViewer({ filter }) {
  const nameQuery =
    filter.name?.toLowerCase().trim().replace(/^"(.*)"$/, '$1') || null;
  const tagQuery =
    filter.tag?.toLowerCase().trim().replace(/^"(.*)"$/, '$1') || null;

  let results = projects;

  if (nameQuery) {
    results = projects.filter(p => {
      const projectTitle = p.title.toLowerCase().trim();
      return projectTitle === nameQuery;
    });
  } else if (tagQuery) {
    results = projects.filter(p => {
      const inTitle = p.title.toLowerCase().includes(tagQuery);
      const inDesc = p.description.toLowerCase().includes(tagQuery);
      const inTech = (p.tech || []).some(t => t.toLowerCase().includes(tagQuery));
      return inTitle || inDesc || inTech;
    });
  }

  if (results.length === 0) {
    return <div className="output">❌ No matching projects found.</div>;
  }

  return (
    <div className="output">
      {results.map((project, index) => (
        <div key={index} className="project-block">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.url && (
            <p>
              🔗{' '}
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.url}
              </a>
            </p>
          )}
          {project.tech && (
            <p>
              <strong>Tech Stack:</strong> {project.tech.join(', ')}
            </p>
          )}
          {index < results.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
