import { useEffect, useState } from 'react'
import {
  applyColorMode,
  applyColorPresence,
  applyFontSize,
  applyOverlayBlur,
  applyTheme,
  loadColorMode,
  loadColorPresence,
  loadFontSize,
  loadNotificationPosition,
  loadOverlayBlur,
  loadTheme,
  saveColorMode,
  saveColorPresence,
  saveFontSize,
  saveNotificationPosition,
  saveOverlayBlur,
  saveTheme,
  THEME_ICON_FAMILY,
  type ColorMode,
  type ColorPresence,
  type FontSize,
  type NotificationPosition,
  type OverlayBlur,
  type ThemeId,
  watchSystemColorScheme,
} from '../services/theme'

export type MotionPreference = 'default' | 'reduced' | 'none'

const MOTION_KEY = 'acadence-motion-preference'

function loadMotionPreference(): MotionPreference {
  try {
    const saved = localStorage.getItem(MOTION_KEY)
    if (saved === 'reduced' || saved === 'none') return saved
  } catch {
    /* ignore */
  }
  return 'default'
}

function useMotionConfig(pref: MotionPreference) {
  if (pref === 'none') return { duration: 0, y: 0 }
  if (pref === 'reduced') return { duration: 0.1, y: 4 }
  return { duration: 0.2, y: 8 }
}

export function useAppPreferences() {
  const [theme, setTheme] = useState<ThemeId>(() => loadTheme())
  const [colorMode, setColorMode] = useState<ColorMode>(() => loadColorMode())
  const [motionPreference, setMotionPreference] = useState<MotionPreference>(
    () => loadMotionPreference(),
  )
  const [overlayBlur, setOverlayBlur] = useState<OverlayBlur>(() =>
    loadOverlayBlur(),
  )
  const [fontSize, setFontSize] = useState<FontSize>(() => loadFontSize())
  const [colorPresence, setColorPresence] = useState<ColorPresence>(() =>
    loadColorPresence(),
  )
  const [notificationPosition, setNotificationPosition] =
    useState<NotificationPosition>(() => loadNotificationPosition())

  const iconFamily = THEME_ICON_FAMILY[theme]
  const motionConfig = useMotionConfig(motionPreference)

  useEffect(() => {
    applyColorMode(colorMode)
    saveColorMode(colorMode)
    const cleanup = watchSystemColorScheme(colorMode, () =>
      applyColorMode(colorMode),
    )
    return () => {
      if (cleanup) cleanup()
    }
  }, [colorMode])

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    const el = document.documentElement
    el.classList.remove('motion-reduced', 'motion-none')
    if (motionPreference === 'reduced') el.classList.add('motion-reduced')
    if (motionPreference === 'none') el.classList.add('motion-none')
    try {
      localStorage.setItem(MOTION_KEY, motionPreference)
    } catch {
      /* ignore */
    }
  }, [motionPreference])

  useEffect(() => {
    applyOverlayBlur(overlayBlur)
    saveOverlayBlur(overlayBlur)
  }, [overlayBlur])

  useEffect(() => {
    applyFontSize(fontSize)
    saveFontSize(fontSize)
  }, [fontSize])

  useEffect(() => {
    applyColorPresence(colorPresence)
    saveColorPresence(colorPresence)
  }, [colorPresence])

  useEffect(() => {
    saveNotificationPosition(notificationPosition)
  }, [notificationPosition])

  return {
    theme,
    setTheme,
    colorMode,
    setColorMode,
    motionPreference,
    setMotionPreference,
    overlayBlur,
    setOverlayBlur,
    fontSize,
    setFontSize,
    colorPresence,
    setColorPresence,
    notificationPosition,
    setNotificationPosition,
    iconFamily,
    motionConfig,
  }
}
