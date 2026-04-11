# Local iOS Dev Build

A development client build lets you run the app on a physical device via a locally-signed `.app`. It requires Metro to be running and re-signing in Xcode every 7 days (free Apple ID limitation).

## First-time setup

### 1. Generate native project

```bash
npx expo prebuild --platform ios
```

This creates `ios/` (gitignored — re-generate any time from the managed config).

### 2. Open in Xcode

```bash
open ios/hivesweeper.xcworkspace
```

### 3. Sign with your free Apple ID

1. Select the `hivesweeper` target in the left sidebar
2. Go to **Signing & Capabilities**
3. Enable **Automatically manage signing**
4. Set **Team** to your personal team (sign in with Apple ID if needed — `Xcode → Settings → Accounts`)
5. Xcode will generate a provisioning profile automatically

### 4. Build to device

1. Connect your iPhone via USB (or use wireless pairing: `Window → Devices and Simulators`)
2. Select your device in the toolbar
3. **Cmd+R** — Xcode builds and installs

### 5. Start Metro

```bash
npm start
```

Open the dev client app on your device — it will connect to Metro automatically (same Wi-Fi required).

---

## Re-signing after 7 days

The provisioning profile expires every 7 days with a free Apple ID. When the app won't launch:

1. `open ios/hivesweeper.xcworkspace`
2. Connect device
3. **Cmd+R**

That's it — Xcode re-signs and reinstalls. Metro doesn't need to be running for this step.

---

## Regenerating the native project

If you've changed `app.json` plugins, added native modules, or the `ios/` folder is stale:

```bash
npx expo prebuild --platform ios --clean
```

Then repeat steps 2–4 above.

---

## Tips

- If Xcode shows "Could not launch — no matching provisioning profile", do **Cmd+Shift+K** (clean build) then **Cmd+R**
- If the device isn't trusted, tap **Trust** on the iPhone when prompted
- Wireless pairing (Xcode 14+): `Window → Devices and Simulators → +` — no USB needed after initial pairing