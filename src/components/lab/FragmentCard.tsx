import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Tag } from '../ui/Tag'
import type { TagTone } from '../ui/Tag'

export type FragmentType = 'hex' | 'audio' | 'stats'

type Tone = 'phosphor' | 'amber' | 'error' | 'muted'

export type Fragment = {
  id: string
  code: string
  type: FragmentType
  tone: Tone
  tag: { label: string; tone: TagTone }
  icon: string
  title: string
  description: string
  action: string
}

type FragmentCardProps = {
  fragment: Fragment
  onAction?: (fragment: Fragment) => void
}

const tones: Record<Tone, string> = {
  phosphor: 'text-phosphor',
  amber: 'text-secondary',
  error: 'text-error',
  muted: 'text-outline',
}

// Fragmento suelto: código + tipo, ícono con título y descripción, y botón de acción a lo ancho
export function FragmentCard({ fragment, onAction }: FragmentCardProps) {
  return (
    <article className="flex h-full flex-col justify-between gap-2 border border-slate-crt bg-surface-container-low p-2 transition-colors hover:bg-surface-container">
      <div className="flex items-center justify-between gap-2">
        <span className={cx('font-display text-label-sm', tones[fragment.tone])}>{fragment.code}</span>
        <Tag tone={fragment.tag.tone}>{fragment.tag.label}</Tag>
      </div>
      <div className="flex items-center gap-2">
        <div className={cx('flex size-12 shrink-0 items-center justify-center bg-surface-container-lowest', tones[fragment.tone])}>
          <Icon name={fragment.icon} size={28} />
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="font-display text-label-md text-primary">{fragment.title}</h3>
          <p className="text-body-sm text-on-surface-variant">{fragment.description}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="w-full" onClick={() => onAction?.(fragment)}>
        {fragment.action}
      </Button>
    </article>
  )
}
