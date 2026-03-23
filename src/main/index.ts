import { app, BrowserWindow } from 'electron'
import { registerUpdaterIpc } from './updater/registerUpdaterIpc'
import { setupUpdater } from './updater/setupUpdater'
import { registerFileIpc } from './ipc/registerFileIpc'
import { registerExternalIpc } from './ipc/registerExternalIpc'
import { createMainWindow } from './window/createMainWindow'

registerFileIpc()
registerExternalIpc()

app.whenReady().then(() => {
  createMainWindow()
  registerUpdaterIpc()
  setupUpdater()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
