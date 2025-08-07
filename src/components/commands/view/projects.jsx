import projects from '../../../data/projects.json';

export default function ProjectsViewer({ filter }) {
  const nameQuery = filter.name?.toLowerCase().trim() || null;
  const tagQuery = filter.tag?.toLowerCase().trim() || null;

  let results = projects;

  if (typeof window !== 'undefined') {
    console.log('🔍 Filter:', filter);
    console.log('🔍 nameQuery:', nameQuery);
    console.log('🔍 tagQuery:', tagQuery);
    console.log('📦 Available project titles:', projects.map(p => `"${p.title}"`));
  }

  if (nameQuery) {
    results = projects.filter(p => {
      const projectTitle = p.title.toLowerCase().trim();
      const match = projectTitle === nameQuery;

      if (typeof window !== 'undefined') {
        console.log(`🆚 Comparing "${projectTitle}" with "${nameQuery}" →`, match);
      }

      return match;
    });
  } else if (tagQuery) {
    results = projects.filter(p => {
      const inTitle = p.title.toLowerCase().includes(tagQuery);
      const inDesc = p.description.toLowerCase().includes(tagQuery);
      const inTech = (p.tech || []).some(t => t.toLowerCase().includes(tagQuery));
      const match = inTitle || inDesc || inTech;

      if (typeof window !== 'undefined') {
        console.log(`🔍 Tag match "${tagQuery}" →`, match, 'in', p.title);
      }

      return match;
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
              🔗 <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
            </p>
          )}
          {project.tech && (
            <p><strong>Tech Stack:</strong> {project.tech.join(', ')}</p>
          )}
          {index < results.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
