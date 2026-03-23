import { app, BrowserWindow } from 'electron'
import { UPDATER_IPC } from './channels'
import type { UpdaterSnapshot, UpdaterStatus } from './types'

function computeControls(status: UpdaterStatus) {
  const packaged = app.isPackaged
  return {
    canCheck: packaged && status !== 'disabled' && status !== 'downloading',
    canDownload: packaged && status === 'available',
    canInstall: packaged && status === 'downloaded',
  }
}

function createInitialSnapshot(): UpdaterSnapshot {
  const status: UpdaterStatus = app.isPackaged ? 'idle' : 'disabled'
  const controls = computeControls(status)
  return {
    status,
    currentVersion: app.getVersion(),
    message: app.isPackaged
      ? 'Ready to check for updates.'
      : 'Updates are only available in installed builds.',
    ...controls,
  }
}

let snapshot: UpdaterSnapshot = createInitialSnapshot()

export function getUpdaterSnapshot(): UpdaterSnapshot {
  return snapshot
}

export function setUpdaterSnapshot(
  patch: Partial<Omit<UpdaterSnapshot, 'canCheck' | 'canDownload' | 'canInstall'>>,
) {
  snapshot = {
    ...snapshot,
    ...patch,
  }

  const controls = computeControls(snapshot.status)
  snapshot = {
    ...snapshot,
    ...controls,
  }

  broadcastUpdaterSnapshot()
}

export function broadcastUpdaterSnapshot() {
  const windows = BrowserWindow.getAllWindows()
  for (const win of windows) {
    try {
      win.webContents.send(UPDATER_IPC.snapshot, snapshot)
    } catch {
      // Ignore window send errors during shutdown or reload.
    }
  }
}

