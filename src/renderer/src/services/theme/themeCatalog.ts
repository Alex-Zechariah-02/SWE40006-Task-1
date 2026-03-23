import type { IconFamily } from '../../types/icon'

export type ThemeId =
  | 'ledgerline'
  | 'vector-slate'
  | 'quiet-measure'
  | 'signal-bloom'

export const DEFAULT_THEME: ThemeId = 'ledgerline'

export const VALID_THEMES = new Set<string>([
  'ledgerline',
  'vector-slate',
  'quiet-measure',
  'signal-bloom',
])

/* Legacy ID migration map */
export const THEME_MIGRATION: Record<string, ThemeId> = {
  'editorial-control-room': 'ledgerline',
  'precision-systems-console': 'vector-slate',
}

interface ThemeFonts {
  display: string
  heading: string
  body: string
  mono: string
}

export const THEME_FONTS: Record<ThemeId, ThemeFonts> = {
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
  'quiet-measure': {
    display: "'Newsreader', serif",
    heading: "'Instrument Sans Variable', sans-serif",
    body: "'Atkinson Hyperlegible Next', sans-serif",
    mono: "'Recursive Variable', monospace",
  },
  'signal-bloom': {
    display: "'Fraunces Variable', serif",
    heading: "'Plus Jakarta Sans Variable', sans-serif",
    body: "'Hind', sans-serif",
    mono: "'Recursive Variable', monospace",
  },
}

export const THEME_ICON_FAMILY: Record<ThemeId, IconFamily> = {
  ledgerline: 'phosphor',
  'vector-slate': 'tabler',
  'quiet-measure': 'iconoir',
  'signal-bloom': 'remix',
}

export const THEME_CLASSNAMES: Partial<Record<ThemeId, string>> = {
  'vector-slate': 'theme-vector-slate',
  'quiet-measure': 'theme-quiet-measure',
  'signal-bloom': 'theme-signal-bloom',
}

export const THEME_CLASSNAMES_ALL = Object.values(THEME_CLASSNAMES)
