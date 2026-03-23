import { app } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import { setUpdaterSnapshot } from './state'

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return 'Unknown error'
  }
}

export function setupUpdater() {
  setUpdaterSnapshot({
    currentVersion: app.getVersion(),
  })

  if (!app.isPackaged) {
    setUpdaterSnapshot({
      status: 'disabled',
      message: 'Updates are only available in installed builds.',
      availableVersion: undefined,
      progress: undefined,
    })
    return
  }

  log.transports.file.level = 'info'
  autoUpdater.logger = log
  autoUpdater.autoDownload = false

  autoUpdater.on('checking-for-update', () => {
    setUpdaterSnapshot({
      status: 'checking',
      message: 'Checking for updates…',
      progress: undefined,
    })
  })

  autoUpdater.on('update-available', (info) => {
    setUpdaterSnapshot({
      status: 'available',
      availableVersion: info.version,
      message: `Update ${info.version} is available.`,
      progress: undefined,
    })
  })

  autoUpdater.on('update-not-available', () => {
    setUpdaterSnapshot({
      status: 'not-available',
      availableVersion: undefined,
      message: 'You’re up to date.',
      progress: undefined,
    })
  })

  autoUpdater.on('download-progress', (progress) => {
    setUpdaterSnapshot({
      status: 'downloading',
      message: `Downloading update… ${Math.round(progress.percent)}%`,
      progress: {
        percent: progress.percent,
        transferred: progress.transferred,
        total: progress.total,
        bytesPerSecond: progress.bytesPerSecond,
      },
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    setUpdaterSnapshot({
      status: 'downloaded',
      availableVersion: info.version,
      message: 'Update downloaded. Restart to install.',
    })
  })

  autoUpdater.on('error', (err) => {
    const message = toErrorMessage(err)
    setUpdaterSnapshot({
      status: 'error',
      message,
    })
  })

  setUpdaterSnapshot({
    status: 'idle',
    message: 'Ready to check for updates.',
  })

  // Check on start (packaged builds only). Renderer can also re-check manually.
  setTimeout(() => {
    setUpdaterSnapshot({ lastCheckedAt: new Date().toISOString() })
    autoUpdater.checkForUpdates().catch((err) => {
      setUpdaterSnapshot({ status: 'error', message: toErrorMessage(err) })
    })
  }, 1500)
}

