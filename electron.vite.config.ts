import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(
        process.env.npm_package_version ?? '1.0.0',
      ),
      __RELEASES_URL__: JSON.stringify(process.env.ACADENCE_RELEASES_URL ?? ''),
    },
  },
})
