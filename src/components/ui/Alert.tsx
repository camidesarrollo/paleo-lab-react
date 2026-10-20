import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Tone = 'info' | 'success' | 'warning' | 'error'

type AlertProps = {
  tone?: Tone
  title?: string
  children?: ReactNode
  onDismiss?: () => void
  // false cuando ya está dentro de otra región que anuncia (por ejemplo, un toast)
  live?: boolean
}

const tones: Record<Tone, { box: string; tag: string }> = {
  info: { box: 'border-outline text-on-surface-variant', tag: 'INFO' },
  success: { box: 'border-phosphor bg-phosphor/5 text-phosphor', tag: 'OK' },
  warning: { box: 'border-amber bg-amber/5 text-amber shadow-glow-amber', tag: 'WARN' },
  error: { box: 'border-error bg-error-container/30 text-error', tag: 'FAULT' },
}

// Alert: mensaje del sistema con etiqueta [WARN], [FAULT]…
// warning y error usan role="alert" para que el lector de pantalla los anuncie de inmediato.
export function Alert({ tone = 'info', title, children, onDismiss, live = true }: AlertProps) {
  const urgent = tone === 'warning' || tone === 'error'
  const role = live ? (urgent ? 'alert' : 'status') : undefined

  return (
    <div role={role} className={cx('flex gap-3 border px-3 py-2', tones[tone].box)}>
      <span className="shrink-0 font-display text-label-md">[{tones[tone].tag}]</span>
      <div className="flex-1">
        {title && <p className="font-display text-label-lg uppercase">{title}</p>}
        {children && <div className="text-body-sm text-on-surface">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar alerta"
          className="shrink-0 cursor-pointer self-start font-display text-label-md hover:glow-text focus-visible:outline-2 focus-visible:outline-hyper"
        >
          [X]
        </button>
      )}
    </div>
  )
}
