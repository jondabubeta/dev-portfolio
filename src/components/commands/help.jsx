import React from 'react';

export default function Help({ command }) {
  const helpText = {
    default: `Available commands:
  resume                            Show full resume
  view experience                   View all experience
  view experience --company=...     Filter by company
  view experience --tags=...        Filter by tag(s)
  help                              Show available commands
  clear / cls                       Clear the terminal`,

    resume: `resume
Displays your full resume with experience (and other sections as added).`,

    experience: `view experience [--company=... --tags=...]
Displays full or filtered work history.

Examples:
  view experience
  view experience --company=neustar
  view experience --tags=sdet,qa`
  };

  const content =
    command && helpText[command.toLowerCase()]
      ? helpText[command.toLowerCase()]
      : helpText.default;

  return <pre>{content}</pre>;
}
