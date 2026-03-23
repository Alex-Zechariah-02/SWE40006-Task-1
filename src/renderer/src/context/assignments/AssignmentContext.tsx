import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'
import { loadAssignments, saveAssignments } from '../../services/storage'
import { assignmentReducer } from './assignmentReducer'
import type { AssignmentContextValue } from './assignmentTypes'

const AssignmentContext = createContext<AssignmentContextValue | null>(null)

export function AssignmentProvider({ children }: { children: ReactNode }) {
  const loadResult = loadAssignments()
  const [assignments, dispatch] = useReducer(assignmentReducer, loadResult.data)

  // Persist on every state change
  useEffect(() => {
    saveAssignments(assignments)
  }, [assignments])

  return (
    <AssignmentContext.Provider
      value={{ assignments, loadError: loadResult.error, dispatch }}
    >
      {children}
    </AssignmentContext.Provider>
  )
}

export function useAssignments(): AssignmentContextValue {
  const ctx = useContext(AssignmentContext)
  if (!ctx)
    throw new Error('useAssignments must be used within AssignmentProvider')
  return ctx
}
