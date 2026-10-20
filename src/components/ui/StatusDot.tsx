import { cx } from '../../lib/cx'

type Tone = 'phosphor' | 'amber' | 'error' | 'muted'
type Motion = 'none' | 'pulse' | 'ping'

type StatusDotProps = {
  tone?: Tone
  motion?: Motion
  size?: 'sm' | 'md'
}

const tones: Record<Tone, string> = {
  phosphor: 'bg-phosphor shadow-glow',
  amber: 'bg-secondary shadow-glow-amber',
  error: 'bg-error',
  muted: 'bg-outline',
}

const motions: Record<Motion, string> = {
  none: '',
  pulse: 'animate-pulse',
  ping: 'animate-ping',
}

// LED de estado. Cuadrado (no redondo) porque el DESIGN.md pide 0px de radio en todo.
// Es decorativo: el texto que lo acompaña es el que comunica el estado.
export function StatusDot({ tone = 'phosphor', motion = 'none', size = 'md' }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cx('inline-block shrink-0', size === 'sm' ? 'size-1.5' : 'size-2', tones[tone], motions[motion])}
    />
  )
}
