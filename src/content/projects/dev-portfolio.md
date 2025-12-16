# Developer Portfolio

## Overview
This project is a terminal-inspired developer portfolio built with React and Vite. It lets visitors type or click commands to browse projects, experience, education, resume, and CV content with the same feel as a CLI. All sections are data-driven so content updates are quick and low-friction.

## UX & Interaction
- Command-style navigation with history (Up/Down) and sidebar shortcuts that emit the same commands
- Consistent output layout for projects and experience, including status labels and tech stacks
- Keyboard-friendly focus flow and smooth scrolling for in-page anchors
- Cover letter and resume viewers for quick sharing

## Architecture
- React + Vite single-page app
- Command parsing and routing handled in `parseArgs` and `handleCommand`
- Markdown-backed project pages rendered with `marked` and TOC generation for headings
- Content stored in JSON under `src/data/` (experience, education, projects, skills, cover letter)
- Terminal event bus fallback using `CustomEvent` for components that need to trigger commands

## Notable Features
- `view` command set with filters: by status/tag/name for projects, by company/position/years for experience
- Project statuses normalized through a shared status model for consistent coloring
- Scroll spy + manual anchor locking for project markdown pages
- Responsive layout that keeps the terminal aesthetic on desktop and mobile

## Tooling & Stack
- React, Vite, and modern JSX tooling
- `marked` with GitHub-style heading IDs for reliable anchor links
- CSS modules that theme the terminal look and panel layout
- Vite glob imports for project markdown so new writeups are auto-discovered

## Next Steps
- Add more project writeups with screenshots
- Expand command shortcuts for common filters (e.g., featured projects)
- Integrate light/dark theming toggle while preserving the terminal vibe
