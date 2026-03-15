export type ThemeId = 'editorial-control-room' | 'precision-systems-console'

const THEME_KEY = 'acadence-theme'
const DEFAULT_THEME: ThemeId = 'editorial-control-room'

const VALID_THEMES = new Set<string>(['editorial-control-room'])

interface ThemeFonts {
  display: string
  heading: string
  body: string
  mono: string
}

const THEME_FONTS: Record<ThemeId, ThemeFonts> = {
  'editorial-control-room': {
    display: "'Newsreader', serif",
    heading: "'Bricolage Grotesque', sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'Azeret Mono', monospace"
  },
  'precision-systems-console': {
    display: "'Source Serif 4', serif",
    heading: "'IBM Plex Sans Condensed', sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace"
  }
}

export function loadTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved && VALID_THEMES.has(saved)) return saved as ThemeId
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
  root.style.setProperty('--font-display', fonts.display)
  root.style.setProperty('--font-heading', fonts.heading)
  root.style.setProperty('--font-body', fonts.body)
  root.style.setProperty('--font-mono', fonts.mono)
}
