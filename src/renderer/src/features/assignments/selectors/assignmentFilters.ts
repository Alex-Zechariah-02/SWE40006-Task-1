import type {
  Assignment,
  AssignmentPriority,
  AssignmentStatus,
} from '../../../types/assignment'
import { daysUntilDue, priorityWeight } from '../../../services/date'
import type { SortBy } from './assignmentOptions'

interface AssignmentFilterState {
  search: string
  filterUnit: string
  filterStatus: AssignmentStatus | ''
  filterPriority: AssignmentPriority | ''
  sortBy: SortBy
}

export function filterAndSortAssignments(
  assignments: Assignment[],
  filterState: AssignmentFilterState,
): Assignment[] {
  const { search, filterUnit, filterStatus, filterPriority, sortBy } =
    filterState
  const q = search.trim().toLowerCase()
  return assignments
    .filter((a) => {
      if (
        q &&
        !a.title.toLowerCase().includes(q) &&
        !a.unit.toLowerCase().includes(q)
      )
        return false
      if (filterUnit && a.unit !== filterUnit) return false
      if (filterStatus && a.status !== filterStatus) return false
      if (filterPriority && a.priority !== filterPriority) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        const da = daysUntilDue(a.dueDate)
        const db = daysUntilDue(b.dueDate)
        if (da === null && db === null) return 0
        if (da === null) return 1
        if (db === null) return -1
        return da - db
      }
      if (sortBy === 'priority')
        return priorityWeight(a.priority) - priorityWeight(b.priority)
      return a.title.localeCompare(b.title)
    })
}
