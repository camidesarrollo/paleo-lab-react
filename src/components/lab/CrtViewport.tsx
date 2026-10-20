import type { ReactNode } from 'react'
import { StatusDot } from '../ui/StatusDot'

type CrtViewportProps = {
  // Texto de estado arriba a la izquierda (con LED parpadeante)
  status: string
  meta?: string
  footer?: ReactNode
  footerMeta?: ReactNode
  children: ReactNode
}

// Monitor CRT: cuadrícula vectorial + viñeta verde de fondo, barra de estado arriba y abajo.
// Las capas decorativas son absolute; el contenido va en "relative" para quedar encima.
export function CrtViewport({ status, meta, footer, footerMeta, children }: CrtViewportProps) {
  return (
    <div className="relative flex min-h-75 flex-col justify-between gap-4 overflow-hidden border border-slate-crt bg-surface-container-low p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_255_102/0.06)_0%,rgb(10_12_14/0.95)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 crt-grid" />

      <div className="relative flex flex-wrap items-center justify-between gap-2 font-display text-label-sm uppercase text-primary-fixed-dim">
        <span className="flex items-center gap-1">
          <StatusDot size="sm" motion="ping" />
          {status}
        </span>
        {meta && <span className="text-secondary">{meta}</span>}
      </div>

      <div className="relative">{children}</div>

      {(footer || footerMeta) && (
        <div className="relative flex flex-wrap items-center justify-between gap-2 font-display text-label-sm uppercase text-on-surface-variant">
          <span>{footer}</span>
          <span className="text-secondary">{footerMeta}</span>
        </div>
      )}
    </div>
  )
}
