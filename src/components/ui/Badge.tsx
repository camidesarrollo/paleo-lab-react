import { cx } from '../../lib/cx'

type Tone = 'phosphor' | 'amber'

type BadgeProps = {
  label: string
  value: string
  tone?: Tone
}

const tones: Record<Tone, string> = {
  phosphor: 'bg-phosphor',
  amber: 'bg-amber',
}

// Status tag: [STATUS: FOSSILIZED] con fondo sólido y texto negro invertido
export function Badge({ label, value, tone = 'phosphor' }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-block px-1.5 py-0.5 font-display text-label-md uppercase text-void',
        tones[tone],
      )}
    >
      [{label}: {value}]
    </span>
  )
}
