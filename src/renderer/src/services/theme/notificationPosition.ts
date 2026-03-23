export type NotificationPosition =
  | 'top-right'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

const NOTIFICATION_POSITION_KEY = 'acadence-notification-position'
const VALID_POSITIONS = new Set<string>([
  'top-right',
  'bottom-right',
  'top-center',
  'bottom-center',
])

export function loadNotificationPosition(): NotificationPosition {
  try {
    const saved = localStorage.getItem(NOTIFICATION_POSITION_KEY)
    if (saved && VALID_POSITIONS.has(saved))
      return saved as NotificationPosition
  } catch {
    /* ignore */
  }
  return 'top-right'
}

export function saveNotificationPosition(position: NotificationPosition): void {
  try {
    localStorage.setItem(NOTIFICATION_POSITION_KEY, position)
  } catch {
    /* ignore */
  }
}
