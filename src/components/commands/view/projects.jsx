import React from 'react';
import projectsData from '../../../data/projects.json';

export default function ProjectsViewer({ filter = {} }) {
  const normalize = (str) => str.toLowerCase();

  const matchesFilter = (project) => {
    if (filter.title && !normalize(project.title).includes(normalize(filter.title))) {
      return false;
    }
    if (filter.tags) {
      const tags = Array.isArray(filter.tags) ? filter.tags : filter.tags.split(',');
      const lowerTags = tags.map(normalize);
      if (!lowerTags.some(tag => project.tags.map(normalize).includes(tag))) {
        return false;
      }
    }
    return true;
  };

  const filtered = projectsData.filter(matchesFilter);

  if (filtered.length === 0) {
    return <div>No matching projects found.</div>;
  }

  return (
    <div>
      {filtered.map((project, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <strong>{project.title}</strong>
          <div>{project.description}</div>
        </div>
      ))}
    </div>
  );
}
