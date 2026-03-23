import { useEffect, useRef, useState } from 'react'

interface ResponsiveLayoutOptions {
  minItemWidth?: number
  maxColumns?: number
  compactThreshold?: number
  gap?: number
}

interface LayoutInfo {
  columns: number
  width: number
  compact: boolean
}

const DEFAULT_MIN_ITEM_WIDTH = 280
const DEFAULT_MAX_COLUMNS = 4
const DEFAULT_COMPACT_THRESHOLD = 500
const DEFAULT_GAP = 16

export function useResponsiveLayout<T extends HTMLElement = HTMLDivElement>(
  options: ResponsiveLayoutOptions = {},
) {
  const {
    minItemWidth = DEFAULT_MIN_ITEM_WIDTH,
    maxColumns = DEFAULT_MAX_COLUMNS,
    compactThreshold = DEFAULT_COMPACT_THRESHOLD,
    gap = DEFAULT_GAP,
  } = options

  const ref = useRef<T>(null)
  const [layout, setLayout] = useState<LayoutInfo>({
    columns: maxColumns,
    width: 0,
    compact: false,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function measure() {
      const w = el!.clientWidth
      let cols = 1
      if (w > 0) {
        cols = Math.floor((w + gap) / (minItemWidth + gap))
        cols = Math.max(1, Math.min(maxColumns, cols))
      }
      setLayout({
        columns: cols,
        width: w,
        compact: w < compactThreshold,
      })
    }

    measure()

    const observer = new ResizeObserver(() => measure())
    observer.observe(el)
    return () => observer.disconnect()
  }, [minItemWidth, maxColumns, compactThreshold, gap])

  return { ref, ...layout }
}
