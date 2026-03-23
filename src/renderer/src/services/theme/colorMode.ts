export type ColorMode = 'light' | 'dark' | 'system'

const COLOR_MODE_KEY = 'acadence-color-mode'
const DEFAULT_COLOR_MODE: ColorMode = 'light'

const VALID_COLOR_MODES = new Set<string>(['light', 'dark', 'system'])

export function loadColorMode(): ColorMode {
  try {
    const saved = localStorage.getItem(COLOR_MODE_KEY)
    if (saved && VALID_COLOR_MODES.has(saved)) return saved as ColorMode
  } catch {
    // ignore
  }
  return DEFAULT_COLOR_MODE
}

export function saveColorMode(mode: ColorMode): void {
  try {
    localStorage.setItem(COLOR_MODE_KEY, mode)
  } catch {
    // ignore
  }
}

function resolveEffectiveMode(mode: ColorMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return mode
}

export function applyColorMode(mode: ColorMode): void {
  const effective = resolveEffectiveMode(mode)
  const root = document.documentElement
  if (effective === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function watchSystemColorScheme(
  mode: ColorMode,
  onChange: () => void,
): (() => void) | undefined {
  if (mode !== 'system') return undefined
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => onChange()
  mq.addEventListener('change', handler)
  return () => mq.removeEventListener('change', handler)
}
