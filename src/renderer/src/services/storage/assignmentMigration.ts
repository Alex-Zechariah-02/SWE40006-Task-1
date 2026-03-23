import type { Assignment } from '../../types/assignment'

/** Migrate older records that may lack newer fields. */
export function migrateAssignment(a: Record<string, unknown>): Assignment {
  return {
    id: '',
    title: '',
    unit: '',
    status: 'Not started',
    priority: 'Medium',
    dueDate: '',
    description: '',
    notes: '',
    milestones: [],
    checklist: [],
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...a,
  } as Assignment
}
