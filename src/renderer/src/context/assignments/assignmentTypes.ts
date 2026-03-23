import type { Dispatch } from 'react'
import type {
  Assignment,
  Milestone,
  ChecklistItem,
  HistoryEntry,
} from '../../types/assignment'

export type AssignmentAction =
  | { type: 'SET_ALL'; assignments: Assignment[] }
  | { type: 'ADD'; assignment: Assignment }
  | { type: 'UPDATE'; assignment: Assignment }
  | { type: 'DELETE'; id: string }
  | { type: 'ADD_MILESTONE'; assignmentId: string; milestone: Milestone }
  | { type: 'TOGGLE_MILESTONE'; assignmentId: string; milestoneId: string }
  | { type: 'DELETE_MILESTONE'; assignmentId: string; milestoneId: string }
  | { type: 'ADD_CHECKLIST_ITEM'; assignmentId: string; item: ChecklistItem }
  | { type: 'TOGGLE_CHECKLIST_ITEM'; assignmentId: string; itemId: string }
  | { type: 'DELETE_CHECKLIST_ITEM'; assignmentId: string; itemId: string }
  | { type: 'ADD_HISTORY'; assignmentId: string; entry: HistoryEntry }
  | { type: 'UPDATE_NOTES'; assignmentId: string; notes: string }

export interface AssignmentContextValue {
  assignments: Assignment[]
  loadError: string | null
  dispatch: Dispatch<AssignmentAction>
}
