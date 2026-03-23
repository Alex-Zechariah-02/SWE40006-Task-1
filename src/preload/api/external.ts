import { ipcRenderer } from 'electron'

export function openExternal(url: string): Promise<boolean> {
  return ipcRenderer.invoke('open-external', url)
}

