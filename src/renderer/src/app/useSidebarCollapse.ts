import { useEffect, useRef, useState } from 'react'

const SIDEBAR_KEY = 'acadence-sidebar-collapsed'
const AUTO_COLLAPSE_BREAKPOINT = 1200

export function useSidebarCollapse() {
  const appRef = useRef<HTMLDivElement>(null)

  const [userCollapsed, setUserCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_KEY) === 'true'
    } catch {
      return false
    }
  })

  const [autoCollapsed, setAutoCollapsed] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth < AUTO_COLLAPSE_BREAKPOINT,
  )

  const [userOverride, setUserOverride] = useState<boolean | null>(null)

  useEffect(() => {
    setUserOverride(null)
  }, [autoCollapsed])

  const sidebarCollapsed =
    userOverride !== null ? userOverride : autoCollapsed || userCollapsed

  useEffect(() => {
    const el = appRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setAutoCollapsed(width < AUTO_COLLAPSE_BREAKPOINT)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function toggleSidebar() {
    if (autoCollapsed) {
      setUserOverride((prev) => (prev === null ? false : !prev))
    } else {
      setUserCollapsed((prev) => {
        const next = !prev
        try {
          localStorage.setItem(SIDEBAR_KEY, String(next))
        } catch {
          /* ignore */
        }
        return next
      })
    }
  }

  return { appRef, sidebarCollapsed, toggleSidebar }
}
