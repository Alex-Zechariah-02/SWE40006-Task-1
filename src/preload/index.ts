import { contextBridge } from 'electron'
import { exportFile, importFile } from './api/files'
import { openExternal } from './api/external'
import { createUpdaterApi } from './api/updater'

contextBridge.exposeInMainWorld('api', {
  exportFile,
  importFile,
  openExternal,
  updater: createUpdaterApi(),
})
