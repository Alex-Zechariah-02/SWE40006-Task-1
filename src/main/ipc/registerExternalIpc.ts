import { ipcMain, shell } from 'electron'

export function registerExternalIpc(): void {
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
}

