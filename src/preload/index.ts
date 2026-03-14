import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getVersion: (): Promise<string> => ipcRenderer.invoke('get-version')
})
