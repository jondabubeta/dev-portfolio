import React from "react";
import AboutPanel from "./panel/AboutPanel";
import CurrentPanel from "./panel/CurrentPanel";
import ExperiencePanel from "./panel/ExperiencePanel";
import ProjectsPanel from "./panel/ProjectsPanel";
import SkillsPanel from "./panel/SkillsPanel";
import EducationPanel from "./panel/EducationPanel";
import ContactsPanel from "./panel/ContactsPanel";

export default function SidePanel({ onCommand }) {
  return (
    <div>
      <AboutPanel onCommand={onCommand} />
      <CurrentPanel onCommand={onCommand} />
      <ExperiencePanel onCommand={onCommand} />
      <ProjectsPanel onCommand={onCommand} />
      <SkillsPanel onCommand={onCommand} />
      <EducationPanel onCommand={onCommand} />
      <ContactsPanel onCommand={onCommand} />
    </div>
  );
}
