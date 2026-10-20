import { cx } from '../../lib/cx'

export type Rank = 'S' | 'A' | 'B' | 'C'

export type RankedEntry = {
  id: string
  rank: Rank
  title: string
  detail: string
  reward: string
}

const ranks: Record<Rank, string> = {
  S: 'bg-phosphor text-void shadow-glow',
  A: 'bg-secondary text-on-secondary',
  B: 'bg-surface-container-highest text-primary-fixed-dim',
  C: 'bg-surface-container text-outline',
}

// Fila con rango (S/A/B/C), título, detalle y recompensa. Úsala dentro de un <li>.
export function RankedItem({ entry }: { entry: RankedEntry }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-surface-container-low p-2 transition-colors hover:bg-surface-container">
      <div className="flex items-center gap-2">
        <span className={cx('flex size-8 shrink-0 items-center justify-center font-display text-headline-sm', ranks[entry.rank])}>
          <span className="sr-only">Rango </span>
          {entry.rank}
        </span>
        <div className="flex flex-col">
          <span className="font-display text-label-md uppercase text-primary">{entry.title}</span>
          <span className="text-body-sm text-on-surface-variant">{entry.detail}</span>
        </div>
      </div>
      <span className="shrink-0 font-display text-label-sm text-secondary">{entry.reward}</span>
    </div>
  )
}
