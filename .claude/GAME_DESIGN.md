# Hivesweeper — Game Design Document

_Living document. Last updated: 2026-04-11. Design phase complete — moving to Phase 1 (tech migration)._

---

## Concept

A bee-themed hex grid puzzle game. You are a bee. The hive is under attack by hornets. Your goal: map which cells are safe for honey production by identifying all hornet locations through logical deduction — no guessing required.

---

## Core Metaphor

| Game element | Thematic name | Notes |
|---|---|---|
| Player | A bee mapping the hive | |
| Safe revealed cell | Mapped honeycomb | Shows a hint (see Hint System) |
| Hidden danger | **Hornet** | Explicitly NOT a bee — bees are protagonists |
| Revealed hint | **Waggle dance signal** | The number shown in a revealed cell |
| Flag (confirmed danger) | Hornet marker | Visual TBD |
| Safe marker (confirmed safe) | Safe marker | Visual TBD — see Open Questions |

---

## Grid

- Hexagonal honeycomb grid (`honeycomb-grid` library, `radius: gameSize / 2`)
- Each cell has **6 neighbors** (edge-adjacent only, no diagonal)
- **Entry cell**: center of one outer edge ("hive entrance") — pre-revealed before first input, entry cell and immediate neighbors guaranteed hornet-free
- Timer: hidden by default, configurable to display (settings toggle)

| Size | gameSize | Radius | Cells | Hornets | Density |
|---|---|---|---|---|---|
| Small | 4 | 2 | 19 | 5 | 26% |
| Medium | 6 | 3 | 37 | 10 | 27% |
| Large | 8 | 4 | 61 | 17 | 28% |

Hornet counts are starting points — tune through playtesting. Density intentionally flat (~27%) so difficulty scales with grid size only, not density.

---

## Hint System

Every revealed non-hornet cell shows the count of adjacent hornet-containing neighbors (0–6). Cells with a count of 0 cascade-reveal all neighbors automatically.

### Thematic framing
The number isn't an abstract count — it's a waggle dance signal from a bee resident in that cell, communicating the danger level to adjacent cells.

### Open direction: Bee types as hint variants
Different bee residents could provide **different types of constraints** rather than just different counts. This is a potential major differentiator from standard Minesweeper:

- **Worker bee** — standard: count of adjacent hornets (0–6)
- **Scout bee** — ??? (directional? range-based?)
- **Guard bee** — ??? (binary? ring-based?)
- **Drone** — ???

This needs mechanical exploration and playtesting. Key constraint: **any bee type added must provide information that is usable in logical deduction** — cool flavor that makes the puzzle harder to solve is not a win.

> **Open question**: Do all cells always show their resident bee type, or is the bee type only revealed when you tap the cell? The latter adds an information-gathering layer.

---

## Input Model

| Action | Current | Proposed |
|---|---|---|
| Reveal cell | Tap | Tap (single action) |
| Flag as hornet | Long-press (broken) | Flag button (action-based) + tap cell |
| Mark as safe | Not implemented | Tap an already-flagged cell to cycle: hornet flag → safe marker → unmarked |
| Undo last reveal | Not implemented | Undo button — un-reveals last safe cell (hornet reveals are still terminal) |
| Chord (auto-reveal) | Not implemented | Future consideration |

Long-press is removed entirely. Flagging is action-based, not mode-based: tap the flag button, then tap a cell — places one flag, returns to reveal state. No persistent mode to forget.

Undo replaces "flag as default" as the safety mechanism — a mis-tap on a safe cell is recoverable, removing the need to make reveal a two-step action.

### Input Layer Architecture

Raw inputs never reach game logic directly. An input layer (a `inputConfig` Zustand slice) maps raw events to game actions. This is platform-aware and user-configurable.

| Platform | Reveal | Flag | Safe marker |
|---|---|---|---|
| Mobile | Tap | Flag button + tap | Tap flagged cell |
| Desktop (web/Steam) | Left-click | Right-click | Right-click flagged cell |
| Keyboard (desktop) | Click | F + click or configurable shortcut | — |

Adding new input methods (controller, stylus, etc.) only touches the input layer — game logic is unchanged.

---

## Scoring

**Philosophy**: Score should be deterministic — perfect play on any generated grid should always yield the same maximum score. Luck of generation must not cap your score ceiling.

| Action | Points |
|---|---|
| Correctly flagged hornet | +N (reward deduction) |
| Revealed safe cell | +M (flat, same regardless of cascade) |
| Finish with no incorrect flags | Completion bonus |
| Time bonus | Scales down as time increases |
| Incorrect flag placed | Penalty |

> The time bonus satisfies competitive players while keeping casual play viable (just play without optimizing time).

> **Removed**: any distinction between manual reveals and cascade reveals. Cascade is efficient play, not lazy play.

---

## Win / Lose Conditions

- **Win**: All non-hornet cells revealed
- **Lose**: A hornet cell is tapped (revealed)
- **First-move protection**: Replaced by the entry cell — the pre-revealed entry cell and its immediate neighbors are guaranteed hornet-free at generation time. No runtime relocation needed.

---

## No-Guess Generation

Every generated grid must be solvable through pure logical deduction. No position should ever require a random guess.

**Approach:**
1. Place hornets randomly
2. Run a constraint solver simulating player logic
3. If the solver reaches a forced-guess state, nudge hornet placement and retry
4. For large grids where perfect no-guess is expensive: allow a maximum of 1 forced-guess per game, surfaced as a **"Hive Intel"** hint cell the player can reveal for free

This is the single most impactful quality-of-life change for the puzzle feel.

---

## Progression

### MVP — Single Session Loop
```
Select difficulty → Play grid → Score screen → Play again
```

### Future — Hive Map Campaign
The hive consists of **N chambers**, each chamber being one grid puzzle. As you clear chambers, they illuminate on a **hive overview map** — a large hex structure that fills in as you progress. The meta-game is literally mapping the hive.

- Visual progression is the reward — watching the hive come alive
- Chamber difficulty can escalate naturally (inner chambers = harder)
- Could introduce new bee types (hint variants) as you go deeper

### Future — Daily Challenge
- Same daily seed for all players globally
- Score + time submitted to leaderboard
- The competitive context is the reward — no grind needed
- Needs cross-platform leaderboard (see Infrastructure)

### Future — Streak / Passive Progression
- Daily win streak counter
- Personal bests per difficulty
- Potentially: cosmetic unlocks (hive color themes, bee character variants) after milestone wins

---

## Platform Strategy

| Platform | Distribution | One-time cost | Notes |
|---|---|---|---|
| **Web / PWA** | Self-hosted (Vercel/Netlify) | Free | Launch first. Loss leader, shareable. |
| **Steam** | Electron wrapper | $100 | Premium version, leaderboards via Steam API |
| **Android** | Play Store | $25 | Low effort once Expo migration done |
| **iOS** | App Store | $99/year | Defer — validate demand first |

---

## Tech Stack (Decided)

| Concern | Choice | Replaces |
|---|---|---|
| Framework | Expo (managed workflow) | Bare React Native |
| Language | TypeScript | JS + PropTypes |
| State | Zustand + zustand/persist | Context + manual AsyncStorage |
| Rendering | React Native Skia | react-native-svg |
| Audio | expo-av | react-native-sound |
| Haptics | expo-haptics | react-native-haptic-feedback |
| Desktop wrapper | Electron | — |
| Utilities | Native JS/TS | Ramda |

---

## Infrastructure

### Cross-Platform Leaderboard
A true cross-platform leaderboard requires a backend. Options:
- **Supabase free tier** — Postgres + REST API, zero maintenance, effectively free at hobby scale. One-time setup, no ongoing ops.
- **Steam leaderboards** — Free, but Steam-only. Could run in parallel for Steam version.

Recommendation: Supabase for web/mobile leaderboards, Steam native API for Steam version.

---

## Open Questions

- [ ] Bee type hint variants — what mechanics? How to guarantee deducibility?
- [ ] Does the player see a cell's bee type before revealing, or only after?
- [ ] Hornet visual design — threatening but cute? How distinct from a bee?
- [ ] Safe marker visual — flower? Honey drop? Clover?
- [ ] Hive Map campaign — how many chambers? Fixed or procedural?
- [ ] Daily challenge rewards beyond score — are cosmetics worth building?
- [ ] Chord mechanic (reveal all neighbors when flagged count matches hint) — include?
- [ ] Is there a "Queen Hornet" — a special rare cell with unique lose/win condition?
- [ ] Deterministic level generation — if Daily challenge compares all users on the same map, we need to be able to generate the same map. 