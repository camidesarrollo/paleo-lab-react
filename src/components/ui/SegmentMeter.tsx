import { cx } from '../../lib/cx'

type Tone = 'phosphor' | 'amber'

type SegmentMeterProps = {
  label: string
  value: number
  max?: number
  segments?: number
  tone?: Tone
}

const tones: Record<Tone, { on: string; off: string }> = {
  phosphor: { on: 'bg-phosphor', off: 'bg-phosphor/20' },
  amber: { on: 'bg-secondary', off: 'bg-secondary/30' },
}

// Medidor de bloques verticales, como el de energía del núcleo: ▮▮▮▯
export function SegmentMeter({ label, value, max = 100, segments = 4, tone = 'phosphor' }: SegmentMeterProps) {
  const filled = Math.round((value / max) * segments)

  return (
    <div role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className="flex gap-0.5">
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={cx('h-4 w-2', i < filled ? tones[tone].on : tones[tone].off)} />
      ))}
    </div>
  )
}
