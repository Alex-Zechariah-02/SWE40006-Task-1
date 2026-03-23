export type OverlayBlur = 'none' | 'subtle' | 'medium'

const OVERLAY_BLUR_KEY = 'acadence-overlay-blur'
const VALID_BLUR = new Set<string>(['none', 'subtle', 'medium'])

export function loadOverlayBlur(): OverlayBlur {
  try {
    const saved = localStorage.getItem(OVERLAY_BLUR_KEY)
    if (saved && VALID_BLUR.has(saved)) return saved as OverlayBlur
  } catch {
    /* ignore */
  }
  return 'none'
}

export function saveOverlayBlur(blur: OverlayBlur): void {
  try {
    localStorage.setItem(OVERLAY_BLUR_KEY, blur)
  } catch {
    /* ignore */
  }
}

export function applyOverlayBlur(blur: OverlayBlur): void {
  const root = document.documentElement
  root.classList.remove('overlay-blur-subtle', 'overlay-blur-medium')
  if (blur === 'subtle') root.classList.add('overlay-blur-subtle')
  if (blur === 'medium') root.classList.add('overlay-blur-medium')
}
