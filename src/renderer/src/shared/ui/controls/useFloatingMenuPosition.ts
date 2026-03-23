import { useCallback, useState } from 'react'

export interface FloatingMenuPosition {
  top: number
  left: number
  width: number
  dropUp: boolean
}

export function useFloatingMenuPosition({
  triggerRef,
  optionsLength,
}: {
  triggerRef: React.RefObject<HTMLElement>
  optionsLength: number
}) {
  const [menuPos, setMenuPos] = useState<FloatingMenuPosition>({
    top: 0,
    left: 0,
    width: 0,
    dropUp: false,
  })

  const updateMenuPosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const menuHeight = Math.min(optionsLength * 32 + 8, 240)
    const spaceBelow = window.innerHeight - rect.bottom - 4
    const spaceAbove = rect.top - 4
    const dropUp = spaceBelow < menuHeight && spaceAbove > spaceBelow
    const menuWidth = Math.max(rect.width, 120)
    let left = rect.left
    const rightOverflow = left + menuWidth - window.innerWidth + 8
    if (rightOverflow > 0) {
      left = Math.max(8, left - rightOverflow)
    }
    setMenuPos({
      top: dropUp
        ? rect.top - Math.min(menuHeight, spaceAbove)
        : rect.bottom + 4,
      left,
      width: menuWidth,
      dropUp,
    })
  }, [optionsLength, triggerRef])

  return { menuPos, updateMenuPosition }
}
