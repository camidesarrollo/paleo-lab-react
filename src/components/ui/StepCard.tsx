import { cx } from '../../lib/cx'

export type StepTone = 'phosphor' | 'amber' | 'default'

type StepCardProps = {
  title: string
  description: string
  tone?: StepTone
}

const tones: Record<StepTone, string> = {
  phosphor: 'text-phosphor',
  amber: 'text-secondary',
  default: 'text-primary',
}

// Paso de un tutorial o asistente. Es un <li>: úsalo dentro de un <ol>.
export function StepCard({ title, description, tone = 'default' }: StepCardProps) {
  return (
    <li className="flex flex-col gap-1 bg-surface-container p-4">
      <span className={cx('font-display text-headline-sm', tones[tone])}>{title}</span>
      <p className="text-body-sm text-on-surface-variant">{description}</p>
    </li>
  )
}
