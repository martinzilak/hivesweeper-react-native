# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Metro bundler
npm run ios        # Build and run iOS
npm run android    # Build and run Android
npm test           # Run Jest tests
npm run lint       # Run ESLint
```

## Architecture

**Hivesweeper** is a bee-themed Minesweeper game on a hexagonal honeycomb grid. The game supports three difficulty sizes (SMALL=4, MEDIUM=6, LARGE=8 — the grid radius in cells).

### Navigation

React Navigation Stack with five screens: `MainMenuScreen` → `NewGameSizeScreen` → `GameScreen`, plus `SettingsScreen` and `StatsScreen` accessible from the main menu. Screen name constants are in `constants/Screen.js`.

### State Management

- **`GameSettingsContext`** (`contexts/GameSettingsContext.js`) — global context wrapping the whole app, holds both persistent settings (sound/music/vibration toggles) and volatile settings (selected game size). Accessed via `useGameSettings` hook.
- **`usePersistentGameSettings`** — syncs settings to AsyncStorage on change.
- **`useGameStateControl`** — the core game logic hook used in `GameScreen`. Manages grid state, cell reveal/flag mechanics, scoring, win/lose conditions, and first-move protection (if the first tap hits a bee, that bee becomes safe).
- **`useStats`** — tracks wins/losses/scores by difficulty, persisted to AsyncStorage.

### Grid System

The hexagonal grid is built with the `honeycomb-grid` library. Grid generation lives in `utils/gridUtils/` — `getNewGrid.js` is the main factory, `setBeeStatus.js` handles bee placement, and `revealAllBees.js` handles the loss condition. The grid renders via `components/Hive.js` (SVG-based renderer using `react-native-svg`) with `HiveCell.js` for individual cells and `HiveCellHex.js` for the SVG hexagon shape.

### Key Libraries

| Library | Purpose |
|---|---|
| `honeycomb-grid` | Hexagonal grid geometry |
| `react-native-svg` | SVG rendering for the grid |
| `react-native-sound` | Audio playback |
| `react-native-haptic-feedback` | Vibration (disabled on iPad) |
| `@react-native-async-storage/async-storage` | Persistent storage |
| `ramda` | Functional utilities in grid/cell logic |

### Constants

All game constants live in `constants/`. Key ones: `GameSize.js` (difficulty definitions), `ActionScore.js` (scoring rules), `Stat.js` (stat keys/labels), `DefaultPersistentSettings.js` / `DefaultVolatileSettings.js` / `DefaultStats.js` (initial values).

### Audio & Haptics

Sound files are loaded in `assets/Sounds.js` and played via `usePlaySound` (one-shot effects) and `usePlayMusicLoop` (looping background music). Haptics are handled in `useVibrate`, which checks for iPad to skip vibration.

### Code Style

ESLint extends `@react-native-community` + Prettier. Config in `.eslintrc.js` and `.prettierrc.js` (single quotes, trailing commas, bracket spacing).