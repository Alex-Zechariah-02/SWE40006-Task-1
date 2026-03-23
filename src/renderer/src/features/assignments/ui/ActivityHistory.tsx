import type { HistoryEntry } from '../../../types/assignment'
import { formatTimestamp } from '../../../services/date'

interface ActivityHistoryProps {
  entries: HistoryEntry[]
}

export default function ActivityHistory({ entries }: ActivityHistoryProps) {
  if (entries.length === 0) {
    return <p className="detail-empty">No history recorded yet.</p>
  }

  // Show newest first
  const sorted = [...entries].reverse()

  return (
    <div className="activity-history">
      <ul className="history-list">
        {sorted.map((entry) => (
          <li key={entry.id} className="history-item">
            <div className="history-action">{entry.action}</div>
            {entry.details && (
              <div className="history-details">{entry.details}</div>
            )}
            <div className="history-timestamp">
              {formatTimestamp(entry.timestamp)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
