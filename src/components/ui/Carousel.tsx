import { useState } from 'react'
import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type CarouselProps = {
  label: string
  slides: ReactNode[]
}

const pad = (n: number) => String(n).padStart(2, '0')

const controlStyles =
  'cursor-pointer font-display text-label-md uppercase text-outline hover:text-phosphor focus-visible:outline-2 focus-visible:outline-hyper'

// Carousel: las diapositivas van en una fila y se desplazan con translateX.
// Sin reproducción automática; las ocultas llevan inert para que no reciban foco.
export function Carousel({ label, slides }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const total = slides.length

  if (total === 0) return null

  const go = (next: number) => setIndex((next + total) % total)

  return (
    <section aria-roledescription="carousel" aria-label={label} className="border border-slate-crt bg-void">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              inert={i !== index}
              className="w-full shrink-0"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-crt px-3 py-2">
        <button type="button" onClick={() => go(index - 1)} aria-label="Anterior" className={controlStyles}>
          [&lt; Prev]
        </button>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={cx(
                  'size-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper',
                  i === index ? 'bg-phosphor shadow-glow' : 'bg-slate-crt hover:bg-outline',
                )}
              />
            ))}
          </div>
          <span aria-live="polite" className="font-display text-label-md text-phosphor">
            {pad(index + 1)}/{pad(total)}
          </span>
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="Siguiente" className={controlStyles}>
          [Next &gt;]
        </button>
      </div>
    </section>
  )
}
