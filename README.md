# Acadence

[![Release workflow](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/actions/workflows/release.yml/badge.svg)](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/actions/workflows/release.yml)
[![Latest release](https://img.shields.io/github/v/release/Alex-Zechariah-02/SWE40006-Task-1?display_name=tag&sort=semver)](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/releases)

Acadence is a local-first Electron desktop application for managing assignment work in a single workspace. It’s built for Windows packaging and GitHub Releases distribution.

## Features

- Assignment records: create, edit, delete, search, filter, sort, and group
- Multiple review surfaces: list, calendar, and kanban views + detail drawer
- Local-first storage: no server required (data persists across restarts)
- Data portability: JSON import/export through a safe IPC bridge
- Preferences: theme, color mode, motion, typography, overlay blur, toast position
- Release history: bundled release manifest displayed in Settings > Updates
- In-app update support (HD): updater status + controls in Settings > Updates (packaged builds only)

## Tech stack

- Electron + TypeScript (main process + preload bridge)
- React + TypeScript (renderer)
- electron-vite (dev/build pipeline)
- electron-builder (Windows packaging)
- electron-updater + electron-log (in-app updates + packaged troubleshooting logs)

## Prerequisites

- Node.js 18+
- npm
- Git

## Development (run locally)

```bash
npm install
npm run dev
```

Notes:
- Dev mode runs with `contextIsolation: true` and `nodeIntegration: false`.
- In-app updates are disabled in dev mode (updates only run in packaged/installed builds).

## Build (compile)

```bash
npm run build
```

## Package (Windows)

Local packaging (no publish):

```bash
npm run dist:win:local
```

This produces artifacts in `release/`, typically including:
- NSIS installer: `Acadence-<version>-x64.exe`
- Portable ZIP: `Acadence-<version>-x64.zip`
- MSI: `Acadence-<version>-x64.msi`
- Updater metadata (when applicable): `latest.yml`, `*.blockmap`

## Releases (GitHub Actions)

This repo publishes Windows artifacts via a tag-based GitHub Actions workflow:
- Workflow: `.github/workflows/release.yml`
- Trigger: push a tag matching `v*` (e.g. `v1.0.0`, `v1.1.0`)

When a tag is pushed, the workflow builds and uploads release assets to the matching GitHub Release.

## In-app updates (Windows / NSIS)

Acadence uses `electron-updater` for in-app updates. The intended HD proof path is:

1) Publish an updater-capable baseline release `v1.0.0` (installed via NSIS `.exe`)
2) Publish `v1.1.0` with a visible change
3) Launch installed `v1.0.0` and demonstrate it detecting + installing `v1.1.0`

User experience:
- App checks for updates on start (packaged builds), and can be re-checked manually.
- Settings > Updates shows live updater status, progress, and install controls.

Important: for updates to work from GitHub Releases, the release must include the updater metadata files (for example `latest.yml` and `*.blockmap`) in addition to the installer.

## Project structure

- `src/main` — Electron main-process code and IPC handlers
- `src/main/updater` — updater subsystem (snapshot state, IPC handlers, updater wiring)
- `src/preload` — secure preload bridge (`contextBridge`) for renderer-to-main APIs
- `src/renderer/src` — React renderer source
- `src/renderer/public` — renderer public assets bundled at build time
- `build` — app icons and packaging assets
