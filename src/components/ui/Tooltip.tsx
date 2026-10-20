import { cloneElement, useId, useState } from 'react'
import type { ReactElement } from 'react'
import { cx } from '../../lib/cx'

type TooltipProps = {
  content: string
  placement?: 'top' | 'bottom'
  // Un solo elemento enfocable (botón, enlace…); recibe aria-describedby
  children: ReactElement<{ 'aria-describedby'?: string }>
}

// Tooltip: aparece con hover o con foco de teclado (group-hover / group-focus-within).
// Escape lo oculta sin mover el foco, como pide la accesibilidad (WCAG 1.4.13).
export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const id = useId()
  const [dismissed, setDismissed] = useState(false)

  return (
    <span
      className="group relative inline-flex"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setDismissed(true)
      }}
      onMouseLeave={() => setDismissed(false)}
      onBlur={() => setDismissed(false)}
    >
      {cloneElement(children, { 'aria-describedby': id })}
      <span
        role="tooltip"
        id={id}
        className={cx(
          'pointer-events-none invisible absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap opacity-0',
          'border border-phosphor/50 bg-void px-2 py-1 font-display text-label-sm uppercase text-phosphor shadow-glow',
          'transition-opacity duration-100 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100',
          placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          dismissed && 'invisible!',
        )}
      >
        {content}
      </span>
    </span>
  )
}
