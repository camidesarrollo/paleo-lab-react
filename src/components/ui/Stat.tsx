import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

export type StatTone = 'default' | 'phosphor' | 'amber' | 'muted'

type StatProps = {
  label: string
  value: ReactNode
  tone?: StatTone
  size?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'end'
  // Con fondo propio, para usar en cuadrículas de lecturas
  boxed?: boolean
  className?: string
}

const tones: Record<StatTone, string> = {
  default: 'text-primary',
  phosphor: 'text-phosphor',
  amber: 'text-secondary',
  muted: 'text-on-surface-variant',
}

const sizes: Record<NonNullable<StatProps['size']>, string> = {
  sm: 'text-label-md',
  md: 'text-label-lg',
  lg: 'text-headline-sm',
}

// Stat: el par "ETIQUETA / valor" que aparece en todo el dashboard
// (COSTO DE PROTOCOLO: -15 ⚡, FLUIDO AMNIÓTICO: 98.2%…)
export function Stat({ label, value, tone = 'default', size = 'sm', align = 'start', boxed = false, className }: StatProps) {
  return (
    <div className={cx('flex flex-col', align === 'end' && 'items-end text-right', boxed && 'bg-surface-container p-1', className)}>
      <span className="font-display text-label-sm uppercase text-on-surface-variant">{label}</span>
      <span className={cx('font-display', sizes[size], tones[tone])}>{value}</span>
    </div>
  )
}
