import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Tag } from '../ui/Tag'
import type { TagTone } from '../ui/Tag'

export type Dossier = {
  id: string
  code: string
  title: string
  description: string
  status: { label: string; tone: TagTone }
  stripe: 'amber' | 'error' | 'muted'
  dna?: number
  // Si existe, el expediente está bloqueado y se muestra este motivo
  lockedReason?: string
  action: string
}

type DossierCardProps = {
  dossier: Dossier
  onAction?: (dossier: Dossier) => void
}

const stripes: Record<Dossier['stripe'], string> = {
  amber: 'bg-secondary-fixed-dim',
  error: 'bg-error',
  muted: 'bg-outline',
}

// Expediente pendiente: franja de color arriba, código + estado, descripción y acción.
// Recibe un objeto completo (dossier) en vez de muchas props sueltas: más fácil de mapear desde datos.
export function DossierCard({ dossier, onAction }: DossierCardProps) {
  const locked = Boolean(dossier.lockedReason)

  return (
    <article className="flex h-full flex-col justify-between gap-4 border border-slate-crt bg-surface-container-lowest transition-colors hover:bg-surface-container-low">
      <div aria-hidden className={cx('h-1.5', stripes[dossier.stripe])} />

      <div className="flex flex-col gap-1 px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-label-sm text-on-surface-variant">{dossier.code}</span>
          <Tag tone={dossier.status.tone}>{dossier.status.label}</Tag>
        </div>
        <h3 className="font-display text-headline-sm uppercase text-primary">{dossier.title}</h3>
        <p className="line-clamp-2 text-body-sm text-on-surface-variant">{dossier.description}</p>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 pb-4 font-display text-label-sm text-on-surface-variant">
        {locked ? (
          <span className="flex items-center gap-1 text-error">
            <Icon name="lock" size={14} />
            {dossier.lockedReason}
          </span>
        ) : (
          <span>DNA: {dossier.dna}%</span>
        )}
        <Button variant="ghost" size="sm" disabled={locked} onClick={() => onAction?.(dossier)}>
          {dossier.action}
        </Button>
      </div>
    </article>
  )
}
