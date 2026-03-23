export type ThemeId = 'ledgerline' | 'vector-slate'

const THEME_KEY = 'acadence-theme'
const DEFAULT_THEME: ThemeId = 'ledgerline'

const VALID_THEMES = new Set<string>(['ledgerline', 'vector-slate'])

/* Legacy ID migration map */
const THEME_MIGRATION: Record<string, ThemeId> = {
  'editorial-control-room': 'ledgerline',
  'precision-systems-console': 'vector-slate',
}

interface ThemeFonts {
  display: string
  heading: string
  body: string
  mono: string
}

const THEME_FONTS: Record<ThemeId, ThemeFonts> = {
  ledgerline: {
    display: "'Newsreader', serif",
    heading: "'Bricolage Grotesque', sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'Azeret Mono', monospace",
  },
  'vector-slate': {
    display: "'Source Serif 4', serif",
    heading: "'IBM Plex Sans Condensed', sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
}

export const THEME_ICON_FAMILY: Record<ThemeId, 'phosphor' | 'tabler'> = {
  ledgerline: 'phosphor',
  'vector-slate': 'tabler',
}

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

  // Apply theme class for color tokens (ledgerline is the :root default, no class needed)
  root.classList.remove('theme-vector-slate')
  if (theme === 'vector-slate') {
    root.classList.add('theme-vector-slate')
  }
}
