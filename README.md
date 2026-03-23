# Acadence

[![Release workflow](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/actions/workflows/release.yml/badge.svg)](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/actions/workflows/release.yml)
[![Latest release](https://img.shields.io/github/v/release/Alex-Zechariah-02/SWE40006-Task-1?display_name=tag&sort=semver)](https://github.com/Alex-Zechariah-02/SWE40006-Task-1/releases)

Acadence is a local-first Electron desktop application for managing work items in a single workspace. It’s built for Windows packaging and GitHub Releases distribution.

## Features

- Workspace records: create, edit, delete, search, filter, sort, and group
- Multiple views: list, calendar, and kanban views + detail drawer
- Local-first storage: no server required (data persists across restarts)
- Data portability: JSON import/export through a safe IPC bridge
- Preferences: theme, color mode, motion, typography, overlay blur, toast position
- Release history: bundled release manifest displayed in Settings > Updates
- In-app update support: updater status + controls in Settings > Updates (packaged builds only)

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

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the app in development mode (electron-vite) |
| `npm run build` | Build main/preload/renderer bundles |
| `npm run preview` | Preview the packaged renderer output locally |
| `npm run dist` | Build + package using `electron-builder` defaults |
| `npm run dist:win` | Build + package for Windows |
| `npm run dist:win:local` | Build + package Windows artifacts without publishing |
| `npm run dist:win:publish` | Build + package Windows artifacts and publish (CI/release use) |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier and rewrite files |
| `npm run format:check` | Check formatting without rewriting |

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

## Configuration

- Packaging config: `electron-builder.yml`
- Release workflow: `.github/workflows/release.yml`
- Build config: `electron.vite.config.ts`

## In-app updates (Windows / NSIS)

Acadence uses `electron-updater` for in-app updates on Windows (NSIS installers).

User experience:
- App checks for updates on start (packaged builds), and can be re-checked manually.
- Settings > Updates shows live updater status, progress, and install controls.

Important: for updates to work from GitHub Releases, the release must include the updater metadata files (for example `latest.yml` and `*.blockmap`) in addition to the installer.

## Troubleshooting

- Packaged builds log update activity via `electron-log` (useful when diagnosing update checks, downloads, and install events).
- Updates run only in packaged builds; development mode shows updates as disabled by design.

## Security model

- The renderer runs with `contextIsolation: true` and `nodeIntegration: false`.
- Renderer-to-main capabilities are exposed via the preload bridge (`contextBridge`) under `src/preload`.
- IPC handlers live in `src/main/ipc` and enforce URL protocol checks for external navigation.

## Project structure

- `src/main` — Electron main process entry
- `src/main/ipc` — IPC registration modules (file import/export, external links)
- `src/main/updater` — update subsystem (snapshot state, IPC handlers, updater wiring)
- `src/main/window` — main window creation
- `src/preload` — secure preload bridge (`contextBridge`)
- `src/preload/api` — preload API modules grouped by concern
- `src/renderer/src` — React renderer
- `src/renderer/src/app` — app shell and layout primitives
- `src/renderer/src/features` — feature-owned UI + hooks + state
- `src/renderer/src/shared` — shared UI primitives + hooks + types
- `src/renderer/public` — renderer public assets bundled at build time
- `build` — app icons and packaging assets
