import { ipcRenderer } from 'electron'

export function exportFile(
  content: string,
  defaultName: string,
): Promise<boolean> {
  return ipcRenderer.invoke('export-file', content, defaultName)
}

export function importFile(): Promise<string | null> {
  return ipcRenderer.invoke('import-file')
}

