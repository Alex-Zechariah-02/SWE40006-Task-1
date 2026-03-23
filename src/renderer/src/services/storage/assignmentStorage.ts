import type { Assignment } from '../../types/assignment'
import { migrateAssignment } from './assignmentMigration'

const STORAGE_KEY = 'acadence-assignments'

export interface LoadResult {
  data: Assignment[]
  error: string | null
}

export function loadAssignments(): LoadResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { data: [], error: null }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return {
        data: [],
        error: 'Stored data is invalid. Your assignments could not be loaded.',
      }
    }
    return {
      data: parsed.map((a: Record<string, unknown>) => migrateAssignment(a)),
      error: null,
    }
  } catch {
    return {
      data: [],
      error: 'Failed to load assignments. The stored data may be corrupted.',
    }
  }
}

export function saveAssignments(assignments: Assignment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
}
