import type { Assignment, HistoryEntry } from '../../types/assignment'
import type { AssignmentAction } from './assignmentTypes'
import { makeHistoryEntry } from './assignmentHistory'

function touchAssignment(a: Assignment): Assignment {
  return { ...a, updatedAt: new Date().toISOString() }
}

function updateOne(
  state: Assignment[],
  id: string,
  updater: (a: Assignment) => Assignment,
): Assignment[] {
  return state.map((a) => (a.id === id ? updater(a) : a))
}

export function assignmentReducer(
  state: Assignment[],
  action: AssignmentAction,
): Assignment[] {
  switch (action.type) {
    case 'SET_ALL':
      return action.assignments

    case 'ADD': {
      const a = {
        ...action.assignment,
        history: [
          ...action.assignment.history,
          makeHistoryEntry('Assignment created'),
        ],
      }
      return [...state, a]
    }

    case 'UPDATE': {
      const prev = state.find((a) => a.id === action.assignment.id)
      const historyEntries: HistoryEntry[] = []
      if (prev) {
        if (prev.status !== action.assignment.status) {
          historyEntries.push(
            makeHistoryEntry(
              'Status changed',
              `${prev.status} \u2192 ${action.assignment.status}`,
            ),
          )
        }
        if (prev.priority !== action.assignment.priority) {
          historyEntries.push(
            makeHistoryEntry(
              'Priority changed',
              `${prev.priority} \u2192 ${action.assignment.priority}`,
            ),
          )
        }
        if (prev.title !== action.assignment.title) {
          historyEntries.push(makeHistoryEntry('Title updated'))
        }
        if (prev.dueDate !== action.assignment.dueDate) {
          historyEntries.push(makeHistoryEntry('Due date changed'))
        }
        if (historyEntries.length === 0) {
          historyEntries.push(makeHistoryEntry('Assignment updated'))
        }
      }
      return updateOne(state, action.assignment.id, () => ({
        ...action.assignment,
        history: [...action.assignment.history, ...historyEntries],
      }))
    }

    case 'DELETE':
      return state.filter((a) => a.id !== action.id)

    case 'ADD_MILESTONE':
      return updateOne(state, action.assignmentId, (a) =>
        touchAssignment({
          ...a,
          milestones: [...a.milestones, action.milestone],
          history: [
            ...a.history,
            makeHistoryEntry('Milestone added', action.milestone.title),
          ],
        }),
      )

    case 'TOGGLE_MILESTONE':
      return updateOne(state, action.assignmentId, (a) => {
        const ms = a.milestones.map((m) =>
          m.id === action.milestoneId ? { ...m, completed: !m.completed } : m,
        )
        const toggled = ms.find((m) => m.id === action.milestoneId)
        return touchAssignment({
          ...a,
          milestones: ms,
          history: [
            ...a.history,
            makeHistoryEntry(
              toggled?.completed ? 'Milestone completed' : 'Milestone reopened',
              toggled?.title ?? '',
            ),
          ],
        })
      })

    case 'DELETE_MILESTONE':
      return updateOne(state, action.assignmentId, (a) => {
        const removed = a.milestones.find((m) => m.id === action.milestoneId)
        return touchAssignment({
          ...a,
          milestones: a.milestones.filter((m) => m.id !== action.milestoneId),
          history: [
            ...a.history,
            makeHistoryEntry('Milestone removed', removed?.title ?? ''),
          ],
        })
      })

    case 'ADD_CHECKLIST_ITEM':
      return updateOne(state, action.assignmentId, (a) =>
        touchAssignment({
          ...a,
          checklist: [...a.checklist, action.item],
          history: [
            ...a.history,
            makeHistoryEntry('Checklist item added', action.item.label),
          ],
        }),
      )

    case 'TOGGLE_CHECKLIST_ITEM':
      return updateOne(state, action.assignmentId, (a) => {
        const items = a.checklist.map((c) =>
          c.id === action.itemId ? { ...c, checked: !c.checked } : c,
        )
        const toggled = items.find((c) => c.id === action.itemId)
        return touchAssignment({
          ...a,
          checklist: items,
          history: [
            ...a.history,
            makeHistoryEntry(
              toggled?.checked
                ? 'Checklist item completed'
                : 'Checklist item unchecked',
              toggled?.label ?? '',
            ),
          ],
        })
      })

    case 'DELETE_CHECKLIST_ITEM':
      return updateOne(state, action.assignmentId, (a) => {
        const removed = a.checklist.find((c) => c.id === action.itemId)
        return touchAssignment({
          ...a,
          checklist: a.checklist.filter((c) => c.id !== action.itemId),
          history: [
            ...a.history,
            makeHistoryEntry('Checklist item removed', removed?.label ?? ''),
          ],
        })
      })

    case 'ADD_HISTORY':
      return updateOne(state, action.assignmentId, (a) =>
        touchAssignment({
          ...a,
          history: [...a.history, action.entry],
        }),
      )

    case 'UPDATE_NOTES':
      return updateOne(state, action.assignmentId, (a) =>
        touchAssignment({
          ...a,
          notes: action.notes,
          history: [...a.history, makeHistoryEntry('Notes updated')],
        }),
      )

    default:
      return state
  }
}
