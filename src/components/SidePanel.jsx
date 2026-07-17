import AboutPanel from "./panel/AboutPanel";
import ExperiencePanel from "./panel/ExperiencePanel";
import ProjectsPanel from "./panel/ProjectsPanel";
import SkillsPanel from "./panel/SkillsPanel";
import ContactsPanel from "./panel/ContactsPanel";

export default function SidePanel({ onCommand, onNavigateProject, onNavigateDocument }) {
  return (
  <div className="side-panel-content">
    <AboutPanel onCommand={onCommand} onNavigateDocument={onNavigateDocument} />
    <ExperiencePanel onCommand={onCommand} />
    <SkillsPanel onCommand={onCommand} onNavigatePage={onNavigateDocument} />
    <ProjectsPanel onCommand={onCommand} onNavigateProject={onNavigateProject} />
    <ContactsPanel onCommand={onCommand} />
  </div>
  );
}
