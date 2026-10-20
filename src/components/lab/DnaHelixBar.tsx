import { cx } from '../../lib/cx'

type DnaHelixBarProps = {
  label: string
  integrity: number
  gaps?: number[]
  segments?: number
}

type SegmentState = 'ok' | 'gap' | 'empty'

const segmentStyles: Record<SegmentState, string> = {
  ok: 'bg-phosphor',
  gap: 'bg-amber animate-pulse',
  empty: 'bg-slate-crt',
}

// Specimen DNA Helix Bar: barra segmentada con huecos de secuencia en ámbar pulsante
export function DnaHelixBar({ label, integrity, gaps = [], segments = 32 }: DnaHelixBarProps) {
  const filled = Math.round((integrity / 100) * segments)

  return (
    <div>
      <div className="mb-1 flex justify-between font-display text-label-sm uppercase">
        <span className="text-on-surface-variant">{label}</span>
        <span className="text-phosphor">{integrity.toFixed(1)}%</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={integrity}
        aria-valuemin={0}
        aria-valuemax={100}
        className="flex gap-px"
      >
        {Array.from({ length: segments }, (_, i) => {
          const state: SegmentState = gaps.includes(i) ? 'gap' : i < filled ? 'ok' : 'empty'
          return <span key={i} className={cx('h-3 flex-1', segmentStyles[state])} />
        })}
      </div>
    </div>
  )
}
