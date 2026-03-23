export type { ThemeId } from './themeCatalog'
export { THEME_ICON_FAMILY } from './themeCatalog'

import {
  DEFAULT_THEME,
  VALID_THEMES,
  THEME_CLASSNAMES_ALL,
  THEME_FONTS,
  THEME_MIGRATION,
  THEME_CLASSNAMES,
} from './themeCatalog'
import type { ThemeId } from './themeCatalog'

const THEME_KEY = 'acadence-theme'

export function loadTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) {
      if (VALID_THEMES.has(saved)) return saved as ThemeId
      /* Migrate legacy IDs */
      const migrated = THEME_MIGRATION[saved]
      if (migrated) {
        localStorage.setItem(THEME_KEY, migrated)
        return migrated
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME
}

export function saveTheme(theme: ThemeId): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}

export function applyTheme(theme: ThemeId): void {
  const fonts = THEME_FONTS[theme]
  const root = document.documentElement

  // Apply font tokens
  root.style.setProperty('--font-display', fonts.display)
  root.style.setProperty('--font-heading', fonts.heading)
  root.style.setProperty('--font-body', fonts.body)
  root.style.setProperty('--font-mono', fonts.mono)

  // Apply theme classes for color tokens (ledgerline is the :root default, no class needed)
  for (const cls of THEME_CLASSNAMES_ALL) root.classList.remove(cls)

  const className = THEME_CLASSNAMES[theme]
  if (className) root.classList.add(className)
}
