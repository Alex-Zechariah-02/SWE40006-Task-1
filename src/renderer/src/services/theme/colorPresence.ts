export type ColorPresence = 'minimal' | 'balanced'

const COLOR_PRESENCE_KEY = 'acadence-color-presence'
const VALID_COLOR_PRESENCE = new Set<string>(['minimal', 'balanced'])

export function loadColorPresence(): ColorPresence {
  try {
    const saved = localStorage.getItem(COLOR_PRESENCE_KEY)
    if (saved && VALID_COLOR_PRESENCE.has(saved)) return saved as ColorPresence
    if (saved) {
      // Unknown/legacy value: normalize to balanced (no extra class) so old installs self-heal.
      try {
        localStorage.setItem(COLOR_PRESENCE_KEY, 'balanced')
      } catch {
        /* ignore */
      }
      return 'balanced'
    }
  } catch {
    /* ignore */
  }
  return 'balanced'
}

export function saveColorPresence(presence: ColorPresence): void {
  try {
    localStorage.setItem(COLOR_PRESENCE_KEY, presence)
  } catch {
    /* ignore */
  }
}

export function applyColorPresence(presence: ColorPresence): void {
  const root = document.documentElement
  for (const cls of Array.from(root.classList)) {
    if (cls.startsWith('color-presence-')) root.classList.remove(cls)
  }
  if (presence !== 'balanced') root.classList.add(`color-presence-${presence}`)
}
