import React from "react";
import AboutPanel from "./panel/AboutPanel";
import LatestPanel from "./panel/LatestPanel";
import ExperiencePanel from "./panel/ExperiencePanel";
import ProjectsPanel from "./panel/ProjectsPanel";
import SkillsPanel from "./panel/SkillsPanel";
import EducationPanel from "./panel/EducationPanel";
import ContactsPanel from "./panel/ContactsPanel";

export default function SidePanel({ onCommand, onNavigateProject }) {
  return (
  <div className="side-panel-content">
    <AboutPanel onCommand={onCommand} />
    <ExperiencePanel onCommand={onCommand} />
    <LatestPanel onCommand={onCommand} />
    <SkillsPanel onCommand={onCommand} />
    <ProjectsPanel onCommand={onCommand} onNavigateProject={onNavigateProject} />
    <ContactsPanel onCommand={onCommand} />
  </div>
  );
}
