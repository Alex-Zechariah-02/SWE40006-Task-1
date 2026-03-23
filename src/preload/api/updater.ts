import { ipcRenderer } from 'electron'
import type { UpdaterSnapshot } from '../../main/updater/types'
import { UPDATER_IPC } from '../../main/updater/channels'

export function createUpdaterApi() {
  return {
    getSnapshot: (): Promise<UpdaterSnapshot> =>
      ipcRenderer.invoke(UPDATER_IPC.getSnapshot),
    checkForUpdates: (): Promise<void> =>
      ipcRenderer.invoke(UPDATER_IPC.checkForUpdates),
    downloadUpdate: (): Promise<void> =>
      ipcRenderer.invoke(UPDATER_IPC.downloadUpdate),
    quitAndInstall: (): Promise<void> =>
      ipcRenderer.invoke(UPDATER_IPC.quitAndInstall),
    onSnapshot: (cb: (snapshot: UpdaterSnapshot) => void) => {
      const listener = (_event: unknown, snapshot: UpdaterSnapshot) => {
        cb(snapshot)
      }
      ipcRenderer.on(UPDATER_IPC.snapshot, listener)
      return () => {
        ipcRenderer.removeListener(UPDATER_IPC.snapshot, listener)
      }
    },
  }
}

