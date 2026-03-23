import type { HistoryEntry } from '../../../types/assignment'

export function makeHistoryEntry(
  action: string,
  details: string = '',
): HistoryEntry {
  return {
    id: crypto.randomUUID(),
    action,
    timestamp: new Date().toISOString(),
    details,
  }
}
