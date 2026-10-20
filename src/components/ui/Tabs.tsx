import { useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Tab = {
  id: string
  label: string
  content: ReactNode
}

type TabsProps = {
  label: string
  tabs: Tab[]
  defaultTab?: string
}

// Tabs con el patrón ARIA: solo la pestaña activa recibe Tab;
// las flechas izquierda/derecha cambian de pestaña.
export function Tabs({ label, tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = tabs.findIndex((tab) => tab.id === active)
    const last = tabs.length - 1

    const targets: Record<string, number> = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }

    if (!(event.key in targets)) return
    event.preventDefault()
    const next = targets[event.key]
    setActive(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={handleKeyDown} className="flex overflow-x-auto border-b border-slate-crt">
        {tabs.map((tab, i) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[i] = element
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cx(
                '-mb-px shrink-0 cursor-pointer border-b-2 px-4 py-2 font-display text-label-md uppercase',
                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-hyper',
                selected ? 'border-phosphor text-phosphor glow-text' : 'border-transparent text-outline hover:text-on-surface',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="py-3 focus-visible:outline-2 focus-visible:outline-hyper"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
