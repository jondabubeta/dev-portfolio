import React from 'react';
import ExperienceViewer from '../commands/view/experience';
import SkillsViewer from '../commands/view/skills';
import EducationViewer from '../commands/view/education';
import ProjectsViewer from '../commands/view/projects';

export default function Resume({ args = {} }) {
  const full = args.full === true || args.full === 'true';

  return (
    <div className="resume">
      <div className="terminal-h1">Jonathan Dabu</div>
      <div className="terminal-h2 mb">Software Development, Testing, & Automation</div>
      <div>Email: jonathandabu86@gmail.com</div>
      <div>LinkedIn: https://www.linkedin.com/in/jbdabu</div>

      <div className="terminal-h2 mt">Experience</div>
      <ExperienceViewer full={full} filter={args} />

      <div className="terminal-h2 mt">Skills</div>
      <SkillsViewer full={full} filter={args} />

      <div className="terminal-h2 mt">Education</div>
      <EducationViewer full={full} filter={args} />

      <div className="terminal-h2 mt">Projects</div>
      <ProjectsViewer full={full} filter={args} />
    </div>
  );
}
