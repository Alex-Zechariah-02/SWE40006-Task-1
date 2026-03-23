export type FontSize = 'tiny' | 'small' | 'default' | 'big' | 'huge'

const FONT_SIZE_KEY = 'acadence-font-size'
const VALID_FONT_SIZES = new Set<string>([
  'tiny',
  'small',
  'default',
  'big',
  'huge',
])

export function loadFontSize(): FontSize {
  try {
    const saved = localStorage.getItem(FONT_SIZE_KEY)
    if (saved && VALID_FONT_SIZES.has(saved)) return saved as FontSize
  } catch {
    /* ignore */
  }
  return 'default'
}

export function saveFontSize(size: FontSize): void {
  try {
    localStorage.setItem(FONT_SIZE_KEY, size)
  } catch {
    /* ignore */
  }
}

export function applyFontSize(size: FontSize): void {
  const root = document.documentElement
  root.classList.remove(
    'font-size-tiny',
    'font-size-small',
    'font-size-big',
    'font-size-huge',
  )
  if (size !== 'default') {
    root.classList.add(`font-size-${size}`)
  }
}
