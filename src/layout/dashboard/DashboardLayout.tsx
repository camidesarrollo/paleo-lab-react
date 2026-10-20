import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

type DashboardLayoutProps = {
  children: ReactNode
}

// Marco de todas las pantallas del laboratorio: vidrio CRT, barra lateral, barra superior
// y el contenido de la página en <main>. Cada página nueva solo aporta su "children".
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [navOpen, setNavOpen] = useState(false)
  // useCallback mantiene la misma función entre renders: Sidebar la usa en un useEffect
  const closeNav = useCallback(() => setNavOpen(false), [])

  return (
    <div className="min-h-svh bg-surface text-on-surface">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 crt-glass" />

      <Sidebar open={navOpen} onClose={closeNav} />

      {/* En desktop el contenido deja libre el ancho de la barra lateral (w-72 = pl-72) */}
      <div className="flex min-h-svh flex-col lg:pl-72">
        <Topbar menuOpen={navOpen} onMenuClick={() => setNavOpen(true)} />
        <main className="flex-1 px-4 pt-4 pb-10 lg:px-6 lg:pt-6">{children}</main>
      </div>
    </div>
  )
}
