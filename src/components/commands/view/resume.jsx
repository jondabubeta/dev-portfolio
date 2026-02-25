import React from 'react';
import ExperienceViewer from './experience';
import SkillsViewer from './skills';
import EducationViewer from './education';
import ProjectsViewer from './projects';

const ResumeViewer = ({ args = {} }) => {
  const full = args.full === true || args.full === 'true';

  return (
    <div className="resume">
      <h1>Jonathan Dabu</h1>
      <div className="subtitle">Software Testing, Automation, Development & AI/ML</div>
      <div><span className="text-orange">Email:</span> jonathandabu86@gmail.com</div>
      <div><span className="text-orange">LinkedIn:</span> https://www.linkedin.com/in/jbdabu</div>

      <h2>Experience</h2>
      <ExperienceViewer full={full} filter={args} />

      <h2>Skills</h2>
      <SkillsViewer full={full} filter={args} />

      <h2>Education</h2>
      <EducationViewer full={full} filter={args} />

      <h2>Projects</h2>
      <ProjectsViewer full={full} filter={args} />
    </div>
  );
};

export default ResumeViewer;
