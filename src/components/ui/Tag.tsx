import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

export type TagTone = 'neutral' | 'phosphor' | 'amber' | 'warning' | 'danger'

type TagProps = {
  tone?: TagTone
  glow?: boolean
  className?: string
  children: ReactNode
}

const tones: Record<TagTone, string> = {
  neutral: 'bg-surface-container-highest text-on-surface-variant',
  phosphor: 'bg-surface-container-high text-phosphor',
  amber: 'bg-surface-container-high text-secondary',
  warning: 'bg-secondary-container text-on-secondary-container',
  danger: 'bg-error-container text-on-error-container',
}

// Tag: etiqueta compacta de estado o categoría (CORROMPIDO, AUDIO 440Hz, MODO: …).
// A diferencia de Badge, no impone el formato [LABEL: VALUE] y acepta íconos o LEDs dentro.
export function Tag({ tone = 'neutral', glow = false, className, children }: TagProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 px-1.5 py-0.5 font-display text-label-sm uppercase',
        tones[tone],
        glow && 'shadow-glow',
        className,
      )}
    >
      {children}
    </span>
  )
}
