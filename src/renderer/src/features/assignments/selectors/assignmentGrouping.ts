import type { Assignment } from '../../../types/assignment'
import { daysUntilDue } from '../../../services/date'
import type { GroupBy } from './assignmentOptions'

export interface AssignmentGroup {
  key: string
  label: string
  assignments: Assignment[]
}

function dueDateBucket(dateStr: string | undefined): string {
  if (!dateStr) return 'No due date'
  const days = daysUntilDue(dateStr)
  if (days === null) return 'No due date'
  if (days < 0) return 'Overdue'
  if (days === 0) return 'Today'
  if (days <= 7) return 'This week'
  return 'Later'
}

const DUE_BUCKET_ORDER = [
  'Overdue',
  'Today',
  'This week',
  'Later',
  'No due date',
]

export function groupAssignments(
  assignments: Assignment[],
  groupBy: GroupBy,
): AssignmentGroup[] {
  if (groupBy === 'none' || !groupBy) {
    return [{ key: 'all', label: '', assignments }]
  }

  if (groupBy === 'dueDate') {
    const buckets = new Map<string, Assignment[]>()
    for (const bucket of DUE_BUCKET_ORDER) {
      buckets.set(bucket, [])
    }
    for (const a of assignments) {
      const bucket = dueDateBucket(a.dueDate)
      buckets.get(bucket)!.push(a)
    }
    return DUE_BUCKET_ORDER.filter(
      (bucket) => (buckets.get(bucket)?.length ?? 0) > 0,
    ).map((bucket) => ({
      key: `due-${bucket}`,
      label: bucket,
      assignments: buckets.get(bucket)!,
    }))
  }

  if (groupBy === 'unit') {
    const unitMap = new Map<string, Assignment[]>()
    for (const a of assignments) {
      const unit = a.unit || 'No unit'
      if (!unitMap.has(unit)) unitMap.set(unit, [])
      unitMap.get(unit)!.push(a)
    }
    const sortedUnits = Array.from(unitMap.keys()).sort((a, b) => {
      if (a === 'No unit') return 1
      if (b === 'No unit') return -1
      return a.localeCompare(b)
    })
    return sortedUnits.map((unit) => ({
      key: `unit-${unit}`,
      label: unit,
      assignments: unitMap.get(unit)!,
    }))
  }

  // unit+dueDate
  const groups: AssignmentGroup[] = []
  const unitMap = new Map<string, Assignment[]>()
  for (const a of assignments) {
    const unit = a.unit || 'No unit'
    if (!unitMap.has(unit)) unitMap.set(unit, [])
    unitMap.get(unit)!.push(a)
  }
  const sortedUnits = Array.from(unitMap.keys()).sort((a, b) => {
    if (a === 'No unit') return 1
    if (b === 'No unit') return -1
    return a.localeCompare(b)
  })
  for (const unit of sortedUnits) {
    const unitAssignments = unitMap.get(unit)!
    const buckets = new Map<string, Assignment[]>()
    for (const bucket of DUE_BUCKET_ORDER) {
      buckets.set(bucket, [])
    }
    for (const a of unitAssignments) {
      const bucket = dueDateBucket(a.dueDate)
      buckets.get(bucket)!.push(a)
    }
    for (const bucket of DUE_BUCKET_ORDER) {
      const items = buckets.get(bucket)!
      if (items.length > 0) {
        groups.push({
          key: `${unit}-${bucket}`,
          label: `${unit} — ${bucket}`,
          assignments: items,
        })
      }
    }
  }
  return groups
}
