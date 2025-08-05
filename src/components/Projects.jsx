import projects from '../data/projects.json';

export default function Projects({ onCommand }) {
  return (
    <div className="section-container sm">
      <h3>Projects</h3>
      <div className="scrollable-projects">
        <div className="project-table">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-row"
              onClick={() => onCommand(`view project --name="${project.title}"`)}
            >
              {project.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
