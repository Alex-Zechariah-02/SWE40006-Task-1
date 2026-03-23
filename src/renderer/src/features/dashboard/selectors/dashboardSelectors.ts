import type { Assignment, HistoryEntry } from '../../../types/assignment'
import { isDueSoon, isDueThisWeek, isOverdue } from '../../../services/date'

export function calculateReadiness(assignments: Assignment[]): number {
  if (assignments.length === 0) return 100
  const completed = assignments.filter((a) => a.status === 'Completed').length
  const overdueCount = assignments.filter((a) =>
    isOverdue(a.dueDate, a.status),
  ).length
  const dueSoonCount = assignments.filter((a) =>
    isDueSoon(a.dueDate, a.status, 3),
  ).length
  const completionRate = completed / assignments.length
  const overduePenalty = Math.min(overdueCount * 15, 40)
  const dueSoonPenalty = Math.min(dueSoonCount * 5, 15)
  return Math.max(
    0,
    Math.round(completionRate * 100 - overduePenalty - dueSoonPenalty),
  )
}

export function getRecentActivity(
  assignments: Assignment[],
  limit: number,
): Array<{ assignment: Assignment; entry: HistoryEntry }> {
  const all: Array<{ assignment: Assignment; entry: HistoryEntry }> = []
  for (const a of assignments) {
    for (const entry of a.history) {
      all.push({ assignment: a, entry })
    }
  }
  all.sort(
    (a, b) =>
      new Date(b.entry.timestamp).getTime() -
      new Date(a.entry.timestamp).getTime(),
  )
  return all.slice(0, limit)
}

export interface DashboardDerived {
  overdue: Assignment[]
  dueSoon: Assignment[]
  thisWeek: Assignment[]
  completed: Assignment[]
  total: number
  sortedUnits: Array<[string, number]>
  recentActivity: Array<{ assignment: Assignment; entry: HistoryEntry }>
  readiness: number
}

export function deriveDashboard(assignments: Assignment[]): DashboardDerived {
  const overdue = assignments.filter((a) => isOverdue(a.dueDate, a.status))
  const dueSoon = assignments.filter((a) => isDueSoon(a.dueDate, a.status, 3))
  const thisWeek = assignments.filter((a) => isDueThisWeek(a.dueDate, a.status))
  const completed = assignments.filter((a) => a.status === 'Completed')
  const total = assignments.length

  const unitGroups = new Map<string, number>()
  for (const a of assignments) {
    const unit = a.unit || 'Unassigned'
    unitGroups.set(unit, (unitGroups.get(unit) ?? 0) + 1)
  }
  const sortedUnits = [...unitGroups.entries()].sort((a, b) => b[1] - a[1])

  const recentActivity = getRecentActivity(assignments, 5)
  const readiness = calculateReadiness(assignments)

  return {
    overdue,
    dueSoon,
    thisWeek,
    completed,
    total,
    sortedUnits,
    recentActivity,
    readiness,
  }
}
