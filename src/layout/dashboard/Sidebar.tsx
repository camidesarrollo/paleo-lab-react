import { useEffect, useRef, useState } from 'react'
import { StatusDot } from '../../components/ui/StatusDot'
import { navItems } from '../../data/dashboard'
import { cx } from '../../lib/cx'
import { SideNav } from './SideNav'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

// Barra lateral: fija a la izquierda en desktop (lg) y cajón deslizable en móvil y tablet.
// Cerrada en móvil lleva "invisible": así no se puede llegar a sus enlaces con Tab.
export function Sidebar({ open, onClose }: SidebarProps) {
  const [activeId, setActiveId] = useState(navItems[0].id)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <>
      {/* Fondo oscuro detrás del cajón (solo móvil) */}
      {open && <div aria-hidden onClick={onClose} className="fixed inset-0 z-30 bg-void/70 lg:hidden" />}

      <aside
        id="sidebar"
        aria-label="Panel del laboratorio"
        className={cx(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col justify-between gap-4 overflow-y-auto',
          'border-r border-slate-crt bg-surface-container-lowest p-4',
          'transition-[translate,visibility] duration-200 lg:visible lg:translate-x-0',
          open ? 'translate-x-0' : 'invisible -translate-x-full',
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2 px-1 py-2 font-display text-label-sm uppercase">
            <span className="flex items-center gap-1 text-primary-fixed-dim">
              <StatusDot size="sm" motion="ping" />
              Core_online
            </span>
            <span className="text-on-surface-variant">SYS.094b</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar navegación"
              className="cursor-pointer text-outline hover:text-amber focus-visible:outline-2 focus-visible:outline-hyper lg:hidden"
            >
              [X]
            </button>
          </div>

          <div className="bg-surface-container-low p-2">
            <div className="mb-1 flex items-center justify-between font-display text-label-sm">
              <span className="text-on-surface-variant">SISTEMA CRIOGÉNICO</span>
              <span className="text-secondary">CH-04</span>
            </div>
            <p className="font-display text-label-md text-primary">[NÚCLEO ESTABLE]</p>
          </div>

          <SideNav
            items={navItems}
            activeId={activeId}
            onNavigate={(id) => {
              setActiveId(id)
              onClose()
            }}
          />
        </div>

        <div className="flex flex-col gap-1 bg-surface-container-low p-2">
          <div className="flex items-center justify-between font-display text-label-sm">
            <span className="text-on-surface-variant">TERMINAL LOG</span>
            <span className="text-phosphor">LIVE</span>
          </div>
          <p className="text-body-sm text-on-surface-variant">{'LOC: SEC-04 // FOSSIL-BAY'}</p>
          <p className="font-display text-label-sm text-outline">{'STN_ADDR: 0x77F // POKEDEX'}</p>
        </div>
      </aside>
    </>
  )
}
