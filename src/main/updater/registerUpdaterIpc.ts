import { app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { UPDATER_IPC } from './channels'
import { getUpdaterSnapshot, setUpdaterSnapshot } from './state'

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return 'Unknown error'
  }
}

export function registerUpdaterIpc() {
  ipcMain.handle(UPDATER_IPC.getSnapshot, async () => {
    return getUpdaterSnapshot()
  })

  ipcMain.handle(UPDATER_IPC.checkForUpdates, async () => {
    if (!app.isPackaged) {
      setUpdaterSnapshot({
        status: 'disabled',
        message: 'Updates are only available in installed builds.',
      })
      return
    }
    setUpdaterSnapshot({ lastCheckedAt: new Date().toISOString() })
    try {
      await autoUpdater.checkForUpdates()
    } catch (err) {
      setUpdaterSnapshot({ status: 'error', message: toErrorMessage(err) })
    }
  })

  ipcMain.handle(UPDATER_IPC.downloadUpdate, async () => {
    if (!app.isPackaged) return
    const snap = getUpdaterSnapshot()
    if (snap.status !== 'available') return
    try {
      await autoUpdater.downloadUpdate()
    } catch (err) {
      setUpdaterSnapshot({ status: 'error', message: toErrorMessage(err) })
    }
  })

  ipcMain.handle(UPDATER_IPC.quitAndInstall, async () => {
    if (!app.isPackaged) return
    const snap = getUpdaterSnapshot()
    if (snap.status !== 'downloaded') return
    try {
      autoUpdater.quitAndInstall()
    } catch (err) {
      setUpdaterSnapshot({ status: 'error', message: toErrorMessage(err) })
    }
  })
}

