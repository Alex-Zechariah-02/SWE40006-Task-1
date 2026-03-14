import type { Assignment } from '../types/assignment'

const STORAGE_KEY = 'acadence-assignments'

export function loadAssignments(): Assignment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Assignment[]
  } catch {
    return []
  }
}

export function saveAssignments(assignments: Assignment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
}
