import { useEffect, useState } from 'react'

export type ViewMode = 'list' | 'calendar' | 'kanban'

const VIEW_MODE_KEY = 'acadence-view-mode'

function loadViewMode(): ViewMode {
  try {
    const saved = localStorage.getItem(VIEW_MODE_KEY)
    if (saved === 'list' || saved === 'calendar' || saved === 'kanban') {
      return saved
    }
  } catch {
    /* ignore */
  }
  return 'list'
}

export function useAssignmentViewState() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => loadViewMode())

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_KEY, viewMode)
    } catch {
      /* ignore */
    }
  }, [viewMode])

  return { viewMode, setViewMode }
}
