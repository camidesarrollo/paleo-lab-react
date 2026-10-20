import { cx } from '../../lib/cx'

type Status = 'ok' | 'warn' | 'off'

type ListItem = {
  id: string
  label: string
  meta?: string
  status?: Status
}

type ListProps = {
  items: ListItem[]
  numbered?: boolean
}

// LED cuadrado + texto oculto para lectores de pantalla (el color solo no basta)
const statuses: Record<Status, { led: string; text: string }> = {
  ok: { led: 'bg-phosphor shadow-glow', text: 'Activo' },
  warn: { led: 'bg-amber shadow-glow-amber animate-pulse', text: 'Alerta' },
  off: { led: 'bg-slate-crt', text: 'Inactivo' },
}

// List: listado tipo terminal con índice (01, 02…) o marcador ">"
export function List({ items, numbered = false }: ListProps) {
  const Tag = numbered ? 'ol' : 'ul'

  return (
    <Tag className="divide-y divide-slate-crt border border-slate-crt text-body-md">
      {items.map((item, i) => (
        <li key={item.id} className="flex items-center gap-3 px-3 py-2 hover:bg-surface-container">
          <span aria-hidden className="font-display text-label-md text-outline">
            {numbered ? String(i + 1).padStart(2, '0') : '>'}
          </span>
          {item.status && (
            <>
              <span aria-hidden className={cx('size-2 shrink-0', statuses[item.status].led)} />
              <span className="sr-only">{statuses[item.status].text}:</span>
            </>
          )}
          <span className="flex-1">{item.label}</span>
          {item.meta && <span className="font-display text-label-sm uppercase text-outline">{item.meta}</span>}
        </li>
      ))}
    </Tag>
  )
}
