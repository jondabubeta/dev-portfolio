export default function Projects({ onCommand }) {
  const projectList = [
    'Corporate Depths',
    'Corgi Clicker',
    'Analytics Dashboard',
    'Terminal Portfolio',
    'Terminal Portfolio',
  ];

  return (
    <div className="section-container sm">
      <h3>Projects</h3>
      <div className="scrollable-projects">
        <div className="project-table">
          {projectList.map((project) => (
            <div
              key={project}
              className="project-row"
              onClick={() => onCommand(`view project --name="${project}"`)}
            >
              {project}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
