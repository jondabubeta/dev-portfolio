# React + Vite

This repository is a small developer portfolio built with React + Vite that presents content inside a terminal-like UI. It intentionally mimics a CLI experience — you can type commands (or click sidebar items) to view experience, projects, education, a CV/cover letter, and more.

Key goals:

- Provide an interactive "terminal" UI for a personal portfolio
- Support command flags to filter output (e.g. `--position`, `--years`, `--status`, `--tag`)
- Keep content in easy-to-edit JSON files under `src/data/`

## Features

- Terminal-style interface with history (Up/Down arrow navigation)
- `view` commands: `view experience`, `view projects`, `view education`, `view resume`, `view cv`, `view skills`, `view contact`, etc.
- Rich filtering flags: `--position`, `--company`, `--years` (ranges supported), `--status`, `--tag`, `--name`
- Sidebar shortcuts that emit the same terminal commands when clicked
- Canonical project status model with colored status labels
- Cover letter (CV) viewer rendering structured JSON as a stylized letter

## Quick start

Start the dev server with HMR:

```powershell
cd c:\Code\dev-portfolio
npm install
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Common terminal commands

Examples you can type into the app's terminal input (or trigger by clicking sidebar rows):

- View all experience entries:
	- `view experience`
- Filter experience by company, position, or years:
	- `view experience --company="Neustar" --position="SDET II"`
	- `view experience --years=2019-2021`
- View projects and filter by status/tag/name:
	- `view projects`
	- `view projects --status=active`
	- `view projects --tag=react`
- View the cover letter / CV:
	- `view cv`
- View resume page:
	- `view resume`

Use the Up/Down arrow keys while focused on the terminal input to navigate command history.

## Project structure (high level)

- `src/components/` – React components, including the Terminal, side panels, and command viewers
- `src/components/commands/view/` – viewer components that render output for `view` commands
- `src/data/` – JSON content files (experience, projects, education, coverletter, skills)
- `src/styles/` – CSS used by the site
- `src/utils/` – command parsing and routing logic (`parseArgs`, `handleCommand`)

## Development notes

- Commands are parsed with `src/utils/parseArgs.jsx` and routed in `src/utils/handleCommand.jsx`.
- To add or adjust content, edit the JSON files in `src/data/` and add or tweak the viewer components under `src/components/commands/view/`.
- The global terminal command bus uses a `CustomEvent` (`terminal:command`) as a fallback when the Terminal component instance isn't available; most components use the `onCommand` prop when possible to avoid duplicate dispatching.

## Contributing

If you'd like to contribute improvements (content, styling, new viewers, or UX), please open a pull request. Keep changes small and include a short description of the behavior and any UI screenshots if relevant.

## License

This project is provided as-is. See `package.json` for project metadata.
