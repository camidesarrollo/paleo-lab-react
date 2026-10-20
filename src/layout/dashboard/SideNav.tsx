import type { NavItem } from '../../data/dashboard'
import { cx } from '../../lib/cx'

type SideNavProps = {
  items: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
}

// Navegación principal: "> LABORATORIO_PRINCIPAL". La activa va en verde sólido.
export function SideNav({ items, activeId, onNavigate }: SideNavProps) {
  return (
    <nav aria-label="Secciones del laboratorio">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
                className={cx(
                  'flex items-center px-4 py-2 font-display transition-colors',
                  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-hyper',
                  active
                    ? 'bg-phosphor text-headline-sm text-void'
                    : 'text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
                )}
              >
                <span aria-hidden className={cx('mr-2', active ? 'text-void' : 'text-primary-fixed-dim')}>
                  &gt;
                </span>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
