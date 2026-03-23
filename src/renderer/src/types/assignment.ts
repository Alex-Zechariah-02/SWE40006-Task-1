export type AssignmentStatus =
  | 'Not started'
  | 'In progress'
  | 'Review'
  | 'Waiting'
  | 'Completed'

export type AssignmentPriority = 'Low' | 'Medium' | 'High' | 'Urgent'

export interface Milestone {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
  note: string
  link: string
}

export interface HistoryEntry {
  id: string
  action: string
  timestamp: string
  details: string
}

export interface Assignment {
  id: string
  title: string
  unit: string
  status: AssignmentStatus
  priority: AssignmentPriority
  dueDate: string // ISO date string YYYY-MM-DD, empty string if not set
  description: string // summary of assignment requirements
  notes: string
  milestones: Milestone[]
  checklist: ChecklistItem[]
  history: HistoryEntry[]
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}
