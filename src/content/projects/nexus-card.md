
# Nexus Card

Nexus Card is a browser-based memory matching game built with React. Players flip cards to match pairs, with themes inspired by Blizzard and Riot games. The app is fully client-side, responsive, and features animated card flipping, a timer, move counter, and local high score tracking.

## Application Features
- Multiple card themes (Blizzard, LoL)
- Responsive design for desktop/mobile
- Animated card flipping and match feedback
- Game timer, move counter, and local high score
- Theme selection and asset preloading

**League of Legends Theme:**<br>
<img src="/public/images/projects/nexus_card/nc_riot_board.webp" alt="Nexus Card - Riot Theme" style="max-width:480px;width:100%;border-radius:8px;box-shadow:0 2px 12px #0002;margin-bottom:1.5rem;" />

**Blizzard Theme:**<br>
<img src="/public/images/projects/nexus_card/nc_blizz_board.webp" alt="Nexus Card - Blizzard Theme" style="max-width:480px;width:100%;border-radius:8px;box-shadow:0 2px 12px #0002;margin-bottom:1.5rem;" />

## Accessibility Features
Nexus Card includes accessibility improvements to ensure a more inclusive experience:

- **Keyboard Navigation:**
	- All interactive elements (cards, theme selectors, reset button) are accessible via keyboard (Tab/Shift+Tab, Enter/Space).
	- Focus indicators are visible for keyboard users.
- **ARIA Labels:**
	- Cards and buttons use appropriate `aria-label` attributes to describe their function and state (e.g., "Flipped", "Matched").
	- The game board and controls are labeled for assistive technologies.
- **Responsive Layout:**
	- The UI adapts to different screen sizes and input types, supporting both mouse and touch users.

These features make Nexus Card more usable for a wider range of players, including those using assistive technologies. More features are incoming in the pipeline.

## Gameplay
1. User selects a theme
2. User starts a 'New Game' by clicking the button
3. Game board is generated and cards are shuffled
4. User flips cards to match pairs
5. Timer and move counter track progress
6. On completion, score is shown
7. User can reset or change theme to play again

## Architecture & Components
- **Framework:** React (Create React App)
- **App.js:** Main stateful component. Handles:
	- Game state (cards, moves, timer, matches, theme)
	- Theme selection and asset loading
	- Game reset and new game logic
- **SingleCard.js:**
	- Renders an individual card
	- Handles flip animation and click events
	- Receives props for card state (flipped, matched, disabled)
- **LoadingSpinner.js:**
	- Displays a spinner while assets are loading
	- Used during initial load and theme switches
- **utils.js/themes.js:**
	- Helper functions (shuffle, timer, etc.)
	- Theme definitions and asset mapping
- **CardImg/**
	- Card images organized by theme (e.g., Blizzard, LoL)
- **State Management:**
	- Uses React `useState` and `useEffect` for all state and side effects
	- No external state libraries

## Theming & Assets
- Card images are grouped by theme in `CardImg/` (both in `public/` and `src/` as needed)
- Themes are selectable; changing theme updates card images and resets the game
- CSS variables or classes are used for theme-specific styling
- Fonts can be customized via `src/fonts/`

## Development & Build
- Run `npm start` for local development
- Run `npm run build` to create a production build in `build/`
- Static assets are copied to `build/` for deployment
- Can be hosted on any static file server (e.g., GitHub Pages, Netlify)
- No backend or environment variables required; all configuration is client-side

## Extensibility & Future Work
- Add more card themes (e.g., new franchises)
- Add sound effects and music
- Add more accessibility improvements (e.g. Color Contrast, Screen Reader support)
- Support challenge modes

## Game Logic Overview
- Cards are shuffled and paired on new game/theme change
- Clicking a card flips it; two flipped cards are checked for a match
- Matched cards stay face up; mismatches flip back after a delay
- Timer starts on first flip, stops when all pairs are matched
- Move counter increments per pair flipped
- High scores (fewest moves/time) saved in `localStorage`

## User Flow
1. User selects a theme
2. Game board is generated and cards are shuffled
3. User flips cards to match pairs
4. Timer and move counter track progress
5. On completion, score is shown and high score updated if beaten
6. User can reset or change theme to play again

## Extensibility
- Add new themes, sound effects, accessibility, or multiplayer modes easily