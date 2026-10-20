import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type PanelProps = {
  code: string
  title: string
  featured?: boolean
  className?: string
  children: ReactNode
}

// Cruces "+" centradas sobre cada esquina del marco
const corners = [
  'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
]

// Diagnostic Cell: marco de 1px, cruces en las esquinas y franja de metadatos.
// Los paneles "featured" llevan esquinas cortadas en lugar de cruces.
export function Panel({ code, title, featured = false, className, children }: PanelProps) {
  return (
    <section
      className={cx(
        'relative flex flex-col border bg-graphite',
        featured ? 'chamfer border-phosphor/50' : 'border-slate-crt',
        className,
      )}
    >
      {!featured &&
        corners.map((position) => (
          <span
            key={position}
            aria-hidden
            className={cx('absolute text-body-sm leading-none text-outline', position)}
          >
            +
          </span>
        ))}
      <header className="border-b border-slate-crt px-3 py-2">
        <h2 className="font-display text-label-md uppercase text-on-surface-variant">
          {code}
          {' // '}
          {title}
        </h2>
      </header>
      <div className="flex-1 p-3">{children}</div>
    </section>
  )
}
