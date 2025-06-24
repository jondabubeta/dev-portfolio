import Resume from '../components/commands/resume';
import ExperienceViewer from '../components/commands/view/experience';
import SkillsViewer from '../components/commands/view/skills';
import ProjectsViewer from '../components/commands/view/projects';
import EducationViewer from '../components/commands/view/education';
import Help from '../components/commands/help';
import { parseArgs } from './parseArgs';

export function handleCommand(input) {
  const [cmd, subcmd, ...args] = input.trim().split(' ');
  const argString = args.join(' ');

  // Top-level command: resume
  if (cmd === 'resume') {
    return <Resume />;
  }

  // Subcommands under 'view'
  if (cmd === 'view') {
    switch (subcmd) {
      case 'experience':
        return <ExperienceViewer filter={parseArgs(argString)} />;
      case 'skills':
        return <SkillsViewer />;
      case 'projects':
        return <ProjectsViewer filter={parseArgs(argString)} />;
      case 'education':
        return <EducationViewer filter={parseArgs(argString)} />;
      default:
        return `Unknown section: ${subcmd}`;
    }
  }

  // Help command
  if (cmd === 'help') {
    return <Help command={subcmd} />;
  }

  // Clear / cls command
  if (cmd === 'clear' || cmd === 'cls') {
    return '__CLEAR__';
  }

  return `Command not found: ${input}`;
}
