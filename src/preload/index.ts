import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  exportFile: (content: string, defaultName: string): Promise<boolean> =>
    ipcRenderer.invoke('export-file', content, defaultName),
  importFile: (): Promise<string | null> => ipcRenderer.invoke('import-file'),
  openExternal: (url: string): Promise<boolean> =>
    ipcRenderer.invoke('open-external', url),
})
