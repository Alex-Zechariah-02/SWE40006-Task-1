/// <reference types="vite/client" />

import type { UpdaterSnapshot } from './types/updater'

export {}

declare global {
  const __APP_VERSION__: string
  const __RELEASES_URL__: string

  interface Window {
    api: {
      exportFile: (content: string, defaultName: string) => Promise<boolean>
      importFile: () => Promise<string | null>
      openExternal: (url: string) => Promise<boolean>
      updater: {
        getSnapshot: () => Promise<UpdaterSnapshot>
        checkForUpdates: () => Promise<void>
        downloadUpdate: () => Promise<void>
        quitAndInstall: () => Promise<void>
        onSnapshot: (
          cb: (snapshot: UpdaterSnapshot) => void,
        ) => () => void
      }
    }
  }
}
