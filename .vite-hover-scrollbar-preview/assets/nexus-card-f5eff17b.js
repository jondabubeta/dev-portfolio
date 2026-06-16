const e=`\r
\r
# Nexus Card\r
\r
[![GitHub Repo](https://img.shields.io/badge/github-nexus--card-blue?logo=github)](https://github.com/jondabubeta/nexus-card)\r
\r
Nexus Card is a browser-based memory matching game built with React. Players flip cards to match pairs, with themes inspired by Blizzard and Riot games. The app is fully client-side, responsive, and features animated card flipping, a timer, move counter, and local high score tracking.\r
\r
## Application Features\r
- Multiple card themes (Blizzard, LoL)\r
- Responsive design for desktop/mobile\r
- Animated card flipping and match feedback\r
- Game timer, move counter, and local high score\r
- Theme selection and asset preloading\r
\r
**League of Legends Theme:**<br>\r
<img src="/images/projects/nexus_card/nc_riot_board.webp" alt="Nexus Card - Riot Theme" style="max-width:480px;width:100%;border-radius:8px;box-shadow:0 2px 12px #0002;margin-bottom:1.5rem;" />\r
\r
**Blizzard Theme:**<br>\r
<img src="/images/projects/nexus_card/nc_blizz_board.webp" alt="Nexus Card - Blizzard Theme" style="max-width:480px;width:100%;border-radius:8px;box-shadow:0 2px 12px #0002;margin-bottom:1.5rem;" />\r
\r
## Accessibility Features\r
Nexus Card includes accessibility improvements to ensure a more inclusive experience:\r
\r
- **Keyboard Navigation:**\r
	- All interactive elements (cards, theme selectors, reset button) are accessible via keyboard (Tab/Shift+Tab, Enter/Space).\r
	- Focus indicators are visible for keyboard users.\r
- **ARIA Labels:**\r
	- Cards and buttons use appropriate \`aria-label\` attributes to describe their function and state (e.g., "Flipped", "Matched").\r
	- The game board and controls are labeled for assistive technologies.\r
- **Responsive Layout:**\r
	- The UI adapts to different screen sizes and input types, supporting both mouse and touch users.\r
\r
These features make Nexus Card more usable for a wider range of players, including those using assistive technologies. More features are incoming in the pipeline.\r
\r
## Gameplay\r
1. User selects a theme\r
2. User starts a 'New Game' by clicking the button\r
3. Game board is generated and cards are shuffled\r
4. User flips cards to match pairs\r
5. Timer and move counter track progress\r
6. On completion, score is shown\r
7. User can reset or change theme to play again\r
\r
## Game Logic Overview\r
- Cards are shuffled and paired on new game/theme change\r
- Clicking a card flips it; two flipped cards are checked for a match\r
- Matched cards stay face up; mismatches flip back after a delay\r
- Timer starts on first flip, stops when all pairs are matched\r
- Move counter increments per pair flipped\r
- High scores (fewest moves/time) saved in \`localStorage\`\r
\r
## Architecture & Components\r
- **Framework:** React (Create React App)\r
- **App.js:** Main stateful component. Handles:\r
	- Game state (cards, moves, timer, matches, theme)\r
	- Theme selection and asset loading\r
	- Game reset and new game logic\r
- **SingleCard.js:**\r
	- Renders an individual card\r
	- Handles flip animation and click events\r
	- Receives props for card state (flipped, matched, disabled)\r
- **LoadingSpinner.js:**\r
	- Displays a spinner while assets are loading\r
	- Used during initial load and theme switches\r
- **utils.js/themes.js:**\r
	- Helper functions (shuffle, timer, etc.)\r
	- Theme definitions and asset mapping\r
- **CardImg/**\r
	- Card images organized by theme (e.g., Blizzard, LoL)\r
- **State Management:**\r
	- Uses React \`useState\` and \`useEffect\` for all state and side effects\r
	- No external state libraries\r
\r
## Theming & Assets\r
- Card images are grouped by theme in \`CardImg/\` (both in \`public/\` and \`src/\` as needed)\r
- Themes are selectable; changing theme updates card images and resets the game\r
- CSS variables or classes are used for theme-specific styling\r
- Fonts can be customized via \`src/fonts/\`\r
\r
## Development & Build\r
- Run \`npm start\` for local development\r
- Run \`npm run build\` to create a production build in \`build/\`\r
- Static assets are copied to \`build/\` for deployment\r
- Can be hosted on any static file server (e.g., GitHub Pages, Netlify)\r
- No backend or environment variables required; all configuration is client-side\r
\r
## Extensibility & Future Work\r
- Add more card themes (e.g., new franchises)\r
- Add sound effects and music\r
- Add more accessibility improvements (e.g. Color Contrast, Screen Reader support)\r
- Support challenge modes`;export{e as default};
