import { daysUntilDue } from '../../../services/date'

export function DueSoonLabel({ dateStr }: { dateStr: string }) {
  const days = daysUntilDue(dateStr)
  if (days === null) return null
  if (days === 0) return <span className="due-label due-today">Today</span>
  if (days === 1) return <span className="due-label due-soon">Tomorrow</span>
  return <span className="due-label due-soon">In {days} days</span>
}

export function EmptyWidgetState({ message }: { message: string }) {
  return <p className="dash-widget-empty">{message}</p>
}

