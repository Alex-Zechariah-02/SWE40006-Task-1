export type AssignmentStatus =
  | 'Not started'
  | 'In progress'
  | 'Review'
  | 'Waiting'
  | 'Completed'

export type AssignmentPriority = 'Low' | 'Medium' | 'High' | 'Urgent'

export interface Assignment {
  id: string
  title: string
  unit: string
  status: AssignmentStatus
  priority: AssignmentPriority
  dueDate: string        // ISO date string YYYY-MM-DD, empty string if not set
  description: string   // summary of assignment requirements
  notes: string
  createdAt: string      // ISO timestamp
  updatedAt: string      // ISO timestamp
}
