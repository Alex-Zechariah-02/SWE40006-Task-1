import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readFile, writeFile } from 'fs/promises'

export function registerFileIpc(): void {
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
}

