import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import DashboardPage from './pages/DashboardPage'
import AssignmentsPage from './pages/AssignmentsPage'
import SettingsPage from './pages/SettingsPage'
import { AssignmentProvider } from './context/assignments/AssignmentContext'
import ToastContainer from './components/ToastContainer'
import UpdaterToastListener from './components/UpdaterToastListener'
import logoIcon from '../../../build/icon.png'
import AppShell from './app/AppShell'
import AppSidebar from './app/AppSidebar'
import { useAppPreferences } from './app/useAppPreferences'
import { useSidebarCollapse } from './app/useSidebarCollapse'

type View = 'dashboard' | 'assignments' | 'settings'

function App() {
  const [view, setView] = useState<View>('dashboard')
  const {
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
    motionConfig: mc,
  } = useAppPreferences()

  const { appRef, sidebarCollapsed, toggleSidebar } = useSidebarCollapse()

  useEffect(() => {
    /* Remove the legacy localStorage key that is no longer used by the final settings model. */
    try {
      localStorage.removeItem('acadence-density')
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <AssignmentProvider>
      <AppShell
        appRef={appRef}
        sidebar={
          <AppSidebar
            view={view}
            onViewChange={setView}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            iconFamily={iconFamily}
            logoIcon={logoIcon}
          />
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: mc.y }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -mc.y / 2 }}
              transition={{ duration: mc.duration, ease: [0.25, 1, 0.5, 1] }}
            >
              <DashboardPage
                onNavigate={() => setView('assignments')}
                theme={theme}
                onThemeChange={setTheme}
                iconFamily={iconFamily}
              />
            </motion.div>
          )}
          {view === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, y: mc.y }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -mc.y / 2 }}
              transition={{ duration: mc.duration, ease: [0.25, 1, 0.5, 1] }}
            >
              <AssignmentsPage
                iconFamily={iconFamily}
                overlayBlur={overlayBlur}
              />
            </motion.div>
          )}
          {view === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: mc.y }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -mc.y / 2 }}
              transition={{ duration: mc.duration, ease: [0.25, 1, 0.5, 1] }}
            >
              <SettingsPage
                theme={theme}
                onThemeChange={setTheme}
                colorMode={colorMode}
                onColorModeChange={setColorMode}
                motionPreference={motionPreference}
                onMotionPreferenceChange={setMotionPreference}
                overlayBlur={overlayBlur}
                onOverlayBlurChange={setOverlayBlur}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                colorPresence={colorPresence}
                onColorPresenceChange={setColorPresence}
                notificationPosition={notificationPosition}
                onNotificationPositionChange={setNotificationPosition}
                iconFamily={iconFamily}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ToastContainer position={notificationPosition} />
        <UpdaterToastListener />
      </AppShell>
    </AssignmentProvider>
  )
}

export default App
