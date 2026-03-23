import type { Assignment } from '../../types/assignment'
import { migrateAssignment } from './assignmentMigration'

/** Serialize assignments to a JSON string for export. */
export function exportAssignmentsJson(assignments: Assignment[]): string {
  return JSON.stringify({ version: 1, assignments }, null, 2)
}

/** Parse and validate an imported JSON string. Returns assignments or an error message. */
export function parseImportedJson(jsonStr: string): {
  data: Assignment[] | null
  error: string | null
} {
  try {
    const parsed = JSON.parse(jsonStr)
    let items: unknown[]
    if (Array.isArray(parsed)) {
      items = parsed
    } else if (parsed && Array.isArray(parsed.assignments)) {
      items = parsed.assignments
    } else {
      return {
        data: null,
        error:
          'Invalid format: expected an array of assignments or { assignments: [...] }.',
      }
    }
    const assignments = items.map((a) => {
      if (typeof a !== 'object' || a === null) {
        throw new Error('Invalid assignment entry')
      }
      return migrateAssignment(a as Record<string, unknown>)
    })
    return { data: assignments, error: null }
  } catch {
    return {
      data: null,
      error: 'Failed to parse the imported file. Ensure it is valid JSON.',
    }
  }
}
