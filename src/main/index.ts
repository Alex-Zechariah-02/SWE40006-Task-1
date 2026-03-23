import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { registerUpdaterIpc } from './updater/registerUpdaterIpc'
import { setupUpdater } from './updater/setupUpdater'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 360,
    minHeight: 520,
    show: false,
    autoHideMenuBar: true,
    title: 'Acadence',
    ...(!app.isPackaged
      ? { icon: join(__dirname, '../../build/icon.png') }
      : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // electron-vite sets ELECTRON_RENDERER_URL only in dev mode, not in preview or packaged
  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.handle(
  'export-file',
  async (_event, content: string, defaultName: string) => {
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return false
    const result = await dialog.showSaveDialog(win, {
      defaultPath: defaultName,
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    })
    if (result.canceled || !result.filePath) return false
    await writeFile(result.filePath, content, 'utf-8')
    return true
  },
)

ipcMain.handle('import-file', async () => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return null
  const result = await dialog.showOpenDialog(win, {
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
    properties: ['openFile'],
  })
  if (result.canceled || result.filePaths.length === 0) return null
  const content = await readFile(result.filePaths[0], 'utf-8')
  return content
})

ipcMain.handle('open-external', async (_event, url: string) => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
      return false
    await shell.openExternal(parsed.toString())
    return true
  } catch {
    return false
  }
})

app.whenReady().then(() => {
  createWindow()
  registerUpdaterIpc()
  setupUpdater()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
