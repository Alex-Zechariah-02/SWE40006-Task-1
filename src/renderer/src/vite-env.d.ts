/// <reference types="vite/client" />

export {}

declare global {
  const __APP_VERSION__: string
  const __RELEASES_URL__: string

  interface Window {
    api: {
      exportFile: (content: string, defaultName: string) => Promise<boolean>
      importFile: () => Promise<string | null>
      openExternal: (url: string) => Promise<boolean>
    }
  }
}
