const e=`# Developer Portfolio\r
\r
## Overview\r
This project is a terminal-inspired developer portfolio built with React and Vite. It lets visitors type or click commands to browse projects, experience, education, resume, and CV content with the same feel as a CLI. All sections are data-driven so content updates are quick and low-friction.\r
\r
## UX & Interaction\r
- Command-style navigation with history (Up/Down) and sidebar shortcuts that emit the same commands\r
- Consistent output layout for projects and experience, including status labels and tech stacks\r
- Keyboard-friendly focus flow and smooth scrolling for in-page anchors\r
- Cover letter and resume viewers for quick sharing\r
\r
## Architecture\r
- React + Vite single-page app\r
- Command parsing and routing handled in \`parseArgs\` and \`handleCommand\`\r
- Markdown-backed project pages rendered with \`marked\` and TOC generation for headings\r
- Content stored in JSON under \`src/data/\` (experience, education, projects, skills, cover letter)\r
- Terminal event bus fallback using \`CustomEvent\` for components that need to trigger commands\r
\r
## Notable Features\r
- \`view\` command set with filters: by status/tag/name for projects, by company/position/years for experience\r
- Project statuses normalized through a shared status model for consistent coloring\r
- Scroll spy + manual anchor locking for project markdown pages\r
- Responsive layout that keeps the terminal aesthetic on desktop and mobile\r
\r
## Tooling & Stack\r
- React, Vite, and modern JSX tooling\r
- \`marked\` with GitHub-style heading IDs for reliable anchor links\r
- CSS modules that theme the terminal look and panel layout\r
- Vite glob imports for project markdown so new writeups are auto-discovered\r
\r
## Next Steps\r
- Add more project writeups with screenshots\r
- Expand command shortcuts for common filters (e.g., featured projects)\r
- Integrate light/dark theming toggle while preserving the terminal vibe\r
`;export{e as default};
