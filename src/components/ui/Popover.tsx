import { useId } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Placement = 'top' | 'bottom' | 'left' | 'right'

type PopoverProps = {
  label: string
  title?: string
  placement?: Placement
  children: ReactNode
}

// position-area coloca el popover junto a su botón; position-try-fallbacks
// lo voltea al otro lado si no cabe en la pantalla.
const placements: Record<Placement, string> = {
  top: '[position-area:top] [position-try-fallbacks:flip-block] mb-2',
  bottom: '[position-area:bottom] [position-try-fallbacks:flip-block] mt-2',
  left: '[position-area:left] [position-try-fallbacks:flip-inline] mr-2',
  right: '[position-area:right] [position-try-fallbacks:flip-inline] ml-2',
}

// Popover con la API nativa del navegador (atributo popover + popoverTarget):
// abre y cierra con el botón, se cierra con Escape o con un clic fuera, sin JavaScript propio.
// El anclaje al botón usa CSS Anchor Positioning.
export function Popover({ label, title, placement = 'bottom', children }: PopoverProps) {
  const id = useId()
  // useId devuelve caracteres que no valen en un nombre CSS; dejamos solo letras y números
  const anchor = `--popover-${id.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        style={{ anchorName: anchor } as CSSProperties}
        className="cursor-pointer border border-slate-crt px-3 py-2 font-display text-label-lg uppercase hover:border-phosphor hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper"
      >
        {label}
      </button>
      <div
        id={id}
        popover="auto"
        style={{ positionAnchor: anchor } as CSSProperties}
        className={cx(
          'inset-auto m-0 w-72 max-w-[calc(100vw-2rem)] border border-phosphor/50 bg-graphite p-0 text-on-surface shadow-glow',
          placements[placement],
        )}
      >
        {title && (
          <div className="flex items-center justify-between gap-3 border-b border-slate-crt px-3 py-2">
            <p className="font-display text-label-md uppercase text-phosphor">{title}</p>
            <button
              type="button"
              popoverTarget={id}
              popoverTargetAction="hide"
              aria-label="Cerrar"
              className="cursor-pointer font-display text-label-sm text-outline hover:text-amber focus-visible:outline-2 focus-visible:outline-hyper"
            >
              [X]
            </button>
          </div>
        )}
        <div className="p-3 text-body-sm">{children}</div>
      </div>
    </>
  )
}
