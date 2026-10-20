import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cx } from '../../lib/cx'

type DropdownItem = {
  label: string
  onSelect: () => void
  tone?: 'default' | 'danger'
}

type DropdownProps = {
  label: string
  items: DropdownItem[]
  align?: 'start' | 'end'
}

// Dropdown: menú desplegable accesible.
// Teclado: flechas para moverse, Home/End, Escape para cerrar. Se cierra al hacer clic fuera.
export function Dropdown({ label, items, align = 'start' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    itemRefs.current[0]?.focus()
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  function close() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const buttons = itemRefs.current.filter((button) => button !== null)
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const last = buttons.length - 1

    const targets: Record<string, number> = {
      ArrowDown: current === last ? 0 : current + 1,
      ArrowUp: current <= 0 ? last : current - 1,
      Home: 0,
      End: last,
    }

    if (event.key in targets) {
      event.preventDefault()
      buttons[targets[event.key]]?.focus()
    } else if (event.key === 'Escape') {
      close()
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        className="flex cursor-pointer items-center gap-2 border border-slate-crt px-3 py-2 font-display text-label-lg uppercase hover:border-phosphor hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper aria-expanded:border-phosphor aria-expanded:text-phosphor"
      >
        {label}
        <span aria-hidden className="text-label-sm">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
          className={cx(
            'absolute top-full z-10 mt-1 min-w-48 border border-phosphor/50 bg-graphite py-1 shadow-glow',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, i) => (
            <button
              key={item.label}
              ref={(element) => {
                itemRefs.current[i] = element
              }}
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                item.onSelect()
                close()
              }}
              className={cx(
                'block w-full cursor-pointer px-3 py-1.5 text-left font-display text-label-md uppercase outline-none',
                item.tone === 'danger'
                  ? 'text-amber hover:bg-amber hover:text-void focus:bg-amber focus:text-void'
                  : 'text-on-surface hover:bg-phosphor hover:text-void focus:bg-phosphor focus:text-void',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
