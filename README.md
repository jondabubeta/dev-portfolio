# React + Vite

This repository is a small developer portfolio built with React + Vite that presents content inside a terminal-like UI. It intentionally mimics a CLI experience - you can type commands (or click sidebar items) to view experience, projects, education, a CV/cover letter, and more.

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

## Commands & Arguments

### Available Commands

#### `view experience`
View work experience entries with optional filtering.

**Arguments:**
- `--company` - Filter by company name (e.g., `--company="Neustar"`)
- `--position` - Filter by job position/title (e.g., `--position="SDET II"`)
- `--title` - Filter by job title
- `--tags` - Filter by tags
- `--years` - Filter by year range (e.g., `--years=2019-2021`)
- `--full` - Show full details (boolean)

**Examples:**
- `view experience`
- `view experience --company="Neustar"`
- `view experience --position="SDET II"`
- `view experience --years=2019-2021`
- `view experience --company="Neustar" --years=2020-2023 --full`

#### `view projects`
View project entries with optional filtering.

**Arguments:**
- `--tag` - Filter by project tags (e.g., `--tag=react`)
- `--name` - Filter by project name
- `--status` - Filter by status (e.g., `--status=active`)

**Examples:**
- `view projects`
- `view projects --status=active`
- `view projects --tag=react`
- `view projects --tag=react --status=active`

#### `view education`
View education history with optional filtering.

**Arguments:**
- `--school` - Filter by school name
- `--degree` - Filter by degree type

**Examples:**
- `view education`
- `view education --school="University"`

#### `view skills`
View skills with optional filtering.

**Arguments:**
- `--name` - Filter by skill name
- `--category` - Filter by skill category

**Examples:**
- `view skills`
- `view skills --category=frontend`

#### `view contact`
View contact information. Supports shorthand or flag-based filtering.

**Arguments:**
- `--email` - Show email
- `--github` - Show GitHub
- `--linkedin` - Show LinkedIn

**Examples:**
- `view contact`
- `view contact email`
- `view contact --github`
- `view contact --linkedin`

#### `view resume`
View the resume page.

**Arguments:**
- `--full` - Show full resume (boolean)

**Examples:**
- `view resume`
- `view resume --full`

#### `view cv`
View the cover letter / CV.

**Examples:**
- `view cv`

#### `view about`
View portfolio information.

**Examples:**
- `view about`

#### `help`
Show help information.

**Examples:**
- `help`
- `help view`

#### `clear` / `cls`
Clear the terminal history.

**Examples:**
- `clear`
- `cls`

### Argument Syntax

- **Named flags:** Use `--flag=value` format (e.g., `--company="Acme Corp"`)
- **Quoted values:** Use quotes for multi-word values (e.g., `--company="My Company"`)
- **Boolean flags:** Bare flags default to `true` (e.g., `--full` is equivalent to `--full=true`)
- **Multiple filters:** Combine multiple arguments in one command (e.g., `view experience --company="Neustar" --years=2020-2023`)

### Navigation

Use the **Up/Down arrow keys** while focused on the terminal input to navigate command history.

## Project structure (high level)

- `src/components/` - React components, including the Terminal, side panels, and command viewers
- `src/components/commands/view/` - viewer components that render output for `view` commands
- `src/data/` - JSON content files (experience, projects, education, coverletter, skills)
- `src/styles/` - CSS used by the site
- `src/utils/` - command parsing and routing logic (`parseArgs`, `handleCommand`)

## Development notes

- Commands are parsed with `src/utils/parseArgs.jsx` and routed in `src/utils/handleCommand.jsx`.
- To add or adjust content, edit the JSON files in `src/data/` and add or tweak the viewer components under `src/components/commands/view/`.
- The global terminal command bus uses a `CustomEvent` (`terminal:command`) as a fallback when the Terminal component instance isn't available; most components use the `onCommand` prop when possible to avoid duplicate dispatching.

## Contributing

If you'd like to contribute improvements (content, styling, new viewers, or UX), please open a pull request. Keep changes small and include a short description of the behavior and any UI screenshots if relevant.

## License

This project is provided as-is. See `package.json` for project metadata.
