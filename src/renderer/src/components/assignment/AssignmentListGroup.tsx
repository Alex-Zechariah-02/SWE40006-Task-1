import { AnimatePresence } from 'motion/react'
import type { Assignment } from '../../types/assignment'
import type { AssignmentGroup } from '../../features/assignments/selectors/assignmentGrouping'
import AssignmentListRow from './AssignmentListRow'

interface AssignmentListGroupProps {
  group: AssignmentGroup
  selectedId?: string
  compact?: boolean
  iconFamily: 'phosphor' | 'tabler'
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
  onSelect?: (assignment: Assignment) => void
  motionEnabled: boolean
  rowDuration: number
  rowY: number
}

export default function AssignmentListGroup({
  group,
  selectedId,
  compact,
  iconFamily,
  onEdit,
  onDelete,
  onSelect,
  motionEnabled,
  rowDuration,
  rowY,
}: AssignmentListGroupProps) {
  return (
    <div
      key={group.key}
      className="assignment-group"
      role="group"
      aria-label={group.label || undefined}
    >
      {group.label && (
        <h3 className="assignment-group-header">
          {group.label}
          <span className="assignment-group-count">
            ({group.assignments.length})
          </span>
        </h3>
      )}
      <AnimatePresence initial={false}>
        {group.assignments.map((a) => (
          <AssignmentListRow
            key={a.id}
            assignment={a}
            selected={selectedId === a.id}
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
      </AnimatePresence>
    </div>
  )
}
