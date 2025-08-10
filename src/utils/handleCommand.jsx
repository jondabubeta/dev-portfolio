import Resume from '../components/commands/resume';
import ExperienceViewer from '../components/commands/view/experience';
import SkillsViewer from '../components/commands/view/skills';
import ProjectsViewer from '../components/commands/view/projects';
import EducationViewer from '../components/commands/view/education';
import ContactViewer from '../components/commands/view/contact';
import Help from '../components/commands/help';
import { parseArgs } from './parseArgs';

const allowedArgs = {
  resume: ['full'],
  experience: ['company', 'tags', 'title', 'full'], // ⬅️ allow --full
  education: ['school', 'degree'],
  projects: ['tag', 'name'],
  contact: ['email', 'github', 'linkedin']
};

export function handleCommand(input) {
  const [cmd, subcmd, ...args] = input.trim().split(/\s+/);
  const argString = args.join(' ');

  // ✅ Resume
  if (cmd === 'resume') {
    const { filter, errors } = parseArgs(argString, allowedArgs.resume);
    if (errors.length > 0) return errors.join('\n');
    return <Resume args={filter} />;
  }

  // ✅ View
  if (cmd === 'view') {
    switch (subcmd) {
      case 'experience': {
        const { filter, errors } = parseArgs(argString, allowedArgs.experience);
        if (errors.length > 0) return errors.join('\n');

        // Coerce --full to boolean (handles "true"/"false"/presence)
        const fullFlag =
          typeof filter.full === 'string'
            ? filter.full.toLowerCase() === 'true'
            : !!filter.full;

        // Don’t pass `full` inside filter
        const { full, ...rest } = filter;

        return <ExperienceViewer filter={rest} full={fullFlag} />;
      }

      case 'skills':
        return <SkillsViewer />;

      case 'projects': {
        const { filter, errors } = parseArgs(argString, allowedArgs.projects);
        if (errors.length > 0) return errors.join('\n');
        return <ProjectsViewer filter={filter} />;
      }

      case 'education': {
        const { filter, errors } = parseArgs(argString, allowedArgs.education);
        if (errors.length > 0) return errors.join('\n');
        return <EducationViewer filter={filter} />;
      }

      case 'contact': {
        const { filter, errors } = parseArgs(argString, allowedArgs.contact);
        if (errors.length > 0) return errors.join('\n');
        return <ContactViewer filter={filter} />;
      }

      default:
        return `Unknown section: ${subcmd}`;
    }
  }

  if (cmd === 'help') return <Help command={subcmd} />;

  if (cmd === 'clear' || cmd === 'cls') return '__CLEAR__';

  return `Command not found: ${input}`;
}
