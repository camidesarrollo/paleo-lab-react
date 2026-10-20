import { cx } from '../../lib/cx'

export type NotificationItem = {
  id: string
  title: string
  message: string
  time: string
  tone?: 'info' | 'warn'
  read: boolean
}

type NotificationListProps = {
  items: NotificationItem[]
  onRead: (id: string) => void
  onReadAll: () => void
}

const pad = (n: number) => String(n).padStart(2, '0')

// Notification: bandeja de avisos del sistema.
// Las no leídas tienen una barra lateral de color; al hacer clic se marcan como leídas.
export function NotificationList({ items, onRead, onReadAll }: NotificationListProps) {
  const unread = items.filter((item) => !item.read).length

  return (
    <section aria-label="Notificaciones" className="border border-slate-crt bg-graphite">
      <header className="flex items-center justify-between gap-3 border-b border-slate-crt px-3 py-2">
        <h2 className="font-display text-label-md uppercase text-on-surface-variant">
          Notificaciones <span className={unread ? 'text-amber' : 'text-outline'}>[{pad(unread)} new]</span>
        </h2>
        <button
          type="button"
          disabled={unread === 0}
          onClick={onReadAll}
          className="cursor-pointer font-display text-label-sm uppercase text-outline hover:text-phosphor focus-visible:outline-2 focus-visible:outline-hyper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-outline"
        >
          [Marcar todo]
        </button>
      </header>

      {items.length === 0 ? (
        <p className="p-3 text-body-sm text-outline">{'// Sin notificaciones'}</p>
      ) : (
        <ul className="divide-y divide-slate-crt">
          {items.map((item) => {
            const warn = item.tone === 'warn'
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onRead(item.id)}
                  className={cx(
                    'flex w-full cursor-pointer gap-3 border-l-2 px-3 py-2 text-left hover:bg-surface-container',
                    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-hyper',
                    item.read ? 'border-transparent' : warn ? 'border-amber' : 'border-phosphor',
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span
                      className={cx(
                        'block font-display text-label-lg uppercase',
                        item.read ? 'text-outline' : warn ? 'text-amber' : 'text-phosphor',
                      )}
                    >
                      {item.title}
                      {!item.read && <span className="sr-only"> (sin leer)</span>}
                    </span>
                    <span className="block text-body-sm text-on-surface-variant">{item.message}</span>
                  </span>
                  <span className="shrink-0 font-display text-label-sm text-outline">{item.time}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
