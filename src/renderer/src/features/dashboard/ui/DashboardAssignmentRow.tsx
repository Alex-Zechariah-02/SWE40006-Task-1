import type { Assignment } from '../../../types/assignment'
import { formatDate } from '../../../services/date'

interface DashboardAssignmentRowProps {
  assignment: Assignment
  label?: React.ReactNode
}

export default function DashboardAssignmentRow({
  assignment: a,
  label,
}: DashboardAssignmentRowProps) {
  return (
    <div className="dash-assignment-row">
      <div className="dash-assignment-meta">
        <span className="dash-assignment-title">{a.title}</span>
        {a.unit && <span className="dash-assignment-unit">{a.unit}</span>}
      </div>
      <div className="dash-assignment-right">
        {label}
        <span className="dash-assignment-due">{formatDate(a.dueDate)}</span>
      </div>
    </div>
  )
}
