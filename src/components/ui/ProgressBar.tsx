import { cx } from '../../lib/cx'

type Tone = 'phosphor' | 'amber'

type ProgressBarProps = {
  label: string
  value: number
  max?: number
  tone?: Tone
  showValue?: boolean
}

// El gradiente "corta" el relleno en bloques, como una barra de terminal
const segmented = 'bg-[repeating-linear-gradient(to_right,transparent_0_6px,var(--color-void)_6px_8px)]'

const tones: Record<Tone, { fill: string; text: string }> = {
  phosphor: { fill: 'bg-phosphor shadow-glow', text: 'text-phosphor' },
  amber: { fill: 'bg-amber shadow-glow-amber', text: 'text-amber' },
}

export function ProgressBar({ label, value, max = 100, tone = 'phosphor', showValue = true }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div>
      <div className="mb-1 flex justify-between font-display text-label-sm uppercase">
        <span className="text-on-surface-variant">{label}</span>
        {showValue && <span className={tones[tone].text}>{percent.toFixed(0)}%</span>}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-3 border border-slate-crt bg-void p-px"
      >
        <div
          className={cx('h-full transition-[width] duration-300', tones[tone].fill, segmented)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
