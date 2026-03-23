# Acadence

Acadence is a local-first Electron desktop application for managing assignment work in a single workspace.

## Capabilities

- Create, edit, and organize assignment records
- Review items using multiple views and detail panels
- Store data locally on the device (no server required)
- Import and export data as JSON
- Configure appearance and accessibility preferences (theme, color mode, motion, typography)

## Tech stack

- Electron
- React
- TypeScript
- electron-vite
- electron-builder

## Project structure

- `src/main` - Electron main-process code and IPC handlers
- `src/preload` - preload bridge (`contextBridge`) for renderer-to-main communication
- `src/renderer/src` - React renderer source
- `src/renderer/public` - renderer public assets bundled at build time
- `build` - icons and packaging assets

## Development

```bash
npm install
npm run dev
```

## Build / packaging

```bash
npm run build
npm run dist
```

Windows packaging:

```bash
npm run dist:win
```
