import { cx } from '../../lib/cx'

type Level = 1 | 2 | 3 | 4 | 5 | 6

export type EqualizerBar = {
  level: Level
  tone: 'phosphor' | 'amber'
  pulse?: boolean
}

type EqualizerBarsProps = {
  bars: EqualizerBar[]
  className?: string
}

// Clases completas para que Tailwind las encuentre (nunca `h-${level}`)
const heights: Record<Level, string> = {
  1: 'h-1',
  2: 'h-2',
  3: 'h-3',
  4: 'h-4',
  5: 'h-5',
  6: 'h-6',
}

// Mini ecualizador decorativo de la síntesis acústica
export function EqualizerBars({ bars, className }: EqualizerBarsProps) {
  return (
    <div aria-hidden className={cx('flex h-6 items-center gap-1', className)}>
      {bars.map((bar, i) => (
        <span
          key={i}
          className={cx('w-1', heights[bar.level], bar.tone === 'amber' ? 'bg-secondary' : 'bg-phosphor', bar.pulse && 'animate-pulse')}
        />
      ))}
    </div>
  )
}
