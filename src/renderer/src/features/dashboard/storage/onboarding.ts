const ONBOARDED_KEY = 'acadence-onboarded'

export function isOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === '1'
  } catch {
    return false
  }
}

export function markOnboarded(): void {
  try {
    localStorage.setItem(ONBOARDED_KEY, '1')
  } catch {
    /* ignore */
  }
}
