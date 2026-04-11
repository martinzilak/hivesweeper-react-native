# Tech Migration Plan

Branch: `phase/tech-migration`

---

## Phase 1 — Expo + TypeScript
- [ ] Create new Expo managed project (SDK 55, TypeScript template) alongside existing source
- [ ] Replace native modules with Expo equivalents (expo-av, expo-haptics, expo-splash-screen)
- [ ] Verify/remove `react-native-webp-format` (WebP supported natively on modern iOS/Android)
- [ ] Port all source files, converting to `.ts`/`.tsx` as they move
- [ ] Verify iOS + Android builds
- [ ] Verify web build (`npx expo export --platform web`)
- [ ] Delete legacy source

## Phase 2 — Remove Ramda
- [ ] Rewrite `utils/gridUtils/` in plain TS
- [ ] Rewrite `utils/cellUtils/` in plain TS
- [ ] Rewrite any remaining Ramda usages
- [ ] Remove `ramda` dependency

## Phase 3 — Zustand
- [ ] Define store slices: `gameStore`, `settingsStore`, `statsStore`
- [ ] Replace `GameSettingsContext` + `usePersistentGameSettings` with `settingsStore` + `zustand/persist`
- [ ] Replace `useStats` + manual AsyncStorage with `statsStore` + `zustand/persist`
- [ ] Replace `useGameStateControl` state with `gameStore`
- [ ] Remove Context, legacy hooks, and direct AsyncStorage usage

## Phase 4 — React Native Skia
- [ ] Replace `react-native-svg` grid rendering with Skia canvas
- [ ] Rewrite `Hive.js`, `HiveCell.js`, `HiveCellHex.js` using Skia paths
- [ ] Verify performance on Android (the original motivation)
- [ ] Remove `react-native-svg`

---

## Notes
- `docs/` marketing page is separate from the Expo app — deploy independently, no monorepo needed
- Each phase = one commit (or a few if the phase is large)
- Hornet density targets (to implement during Phase 1 grid rewrite): Small 5/19, Medium 10/37, Large 17/61