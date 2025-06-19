import React from 'react';
import ExperienceViewer from '../commands/view/experience';
import SkillsViewer from '../commands/view/skills';
import EducationViewer from '../commands/view/education';
import ProjectsViewer from '../commands/view/projects';

export default function Resume() {
  return (
    <div>
      <div>Jonathan Dabu</div>
      <div>Software Development, Testing, & Automation</div>
      <div>Email: jonathandabu86@gmail.com</div>
      <div>LinkedIn: https://www.linkedin.com/in/jbdabu</div>

      <br /><strong>Experience</strong>
      <ExperienceViewer />

      <br /><strong>Skills</strong>
      <SkillsViewer />

      <br /><strong>Education</strong>
      <EducationViewer />

      <br /><strong>Projects</strong>
      <ProjectsViewer />
    </div>
  );
}
