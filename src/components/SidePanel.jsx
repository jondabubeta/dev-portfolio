import React from "react";
import AboutPanel from "./panel/AboutPanel";
import LatestPanel from "./panel/LatestPanel";
import ExperiencePanel from "./panel/ExperiencePanel";
import ProjectsPanel from "./panel/ProjectsPanel";
import SkillsPanel from "./panel/SkillsPanel";
import EducationPanel from "./panel/EducationPanel";
import ContactsPanel from "./panel/ContactsPanel";

export default function SidePanel({ onCommand, onNavigateProject, onNavigateDocument }) {
  return (
  <div className="side-panel-content">
    <AboutPanel onCommand={onCommand} onNavigateDocument={onNavigateDocument} />
    <ExperiencePanel onCommand={onCommand} />
    <LatestPanel onCommand={onCommand} onNavigateLatest={onNavigateDocument} />
    <SkillsPanel onCommand={onCommand} onNavigatePage={onNavigateDocument} />
    <ProjectsPanel onCommand={onCommand} onNavigateProject={onNavigateProject} />
    <ContactsPanel onCommand={onCommand} />
  </div>
  );
}
