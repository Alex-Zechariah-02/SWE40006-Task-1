import type { ReactNode, RefObject } from 'react'

interface AppShellProps {
  appRef: RefObject<HTMLDivElement>
  sidebar: ReactNode
  children: ReactNode
}

export default function AppShell({ appRef, sidebar, children }: AppShellProps) {
  return (
    <div className="app" ref={appRef}>
      {sidebar}
      <main className="main-content">{children}</main>
    </div>
  )
}
