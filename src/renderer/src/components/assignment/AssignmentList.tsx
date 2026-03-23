import type { Assignment } from '../../types/assignment'
import EmptyState from '../EmptyState'
import { groupAssignments } from '../../features/assignments/selectors/assignmentGrouping'
import type { GroupBy } from '../../features/assignments/selectors/assignmentOptions'
import AssignmentListGroup from './AssignmentListGroup'

interface AssignmentListProps {
  assignments: Assignment[]
  groupBy?: GroupBy
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
  onSelect?: (assignment: Assignment) => void
  selectedId?: string
  emptyMessage?: string
  iconFamily: 'phosphor' | 'tabler'
  compact?: boolean
}

export default function AssignmentList({
  assignments,
  groupBy = 'none',
  onEdit,
  onDelete,
  onSelect,
  selectedId,
  emptyMessage = 'No assignments yet. Create your first assignment to get started.',
  iconFamily,
  compact,
}: AssignmentListProps) {
  const motionEnabled =
    !document.documentElement.classList.contains('motion-none')
  const reduced = document.documentElement.classList.contains('motion-reduced')
  const rowDuration = motionEnabled ? (reduced ? 0.08 : 0.16) : 0
  const rowY = motionEnabled ? (reduced ? 4 : 8) : 0

  if (assignments.length === 0) {
    return <EmptyState title="No assignments" subtitle={emptyMessage} />
  }

  const groups = groupAssignments(assignments, groupBy)

  return (
    <div className="assignment-list">
      {groups.map((group) => (
        <AssignmentListGroup
          key={group.key}
          group={group}
          selectedId={selectedId}
          compact={compact}
          iconFamily={iconFamily}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
          motionEnabled={motionEnabled}
          rowDuration={rowDuration}
          rowY={rowY}
        />
      ))}
    </div>
  )
}
