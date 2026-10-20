import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'

type Section = {
  id: string
  label: string
}

type ScrollSpyProps = {
  label: string
  sections: Section[]
}

// ScrollSpy: índice que resalta la sección visible mientras se hace scroll.
// IntersectionObserver avisa cuando cada sección entra en la parte superior de la pantalla.
export function ScrollSpy({ label, sections }: ScrollSpyProps) {
  const [active, setActive] = useState(sections[0]?.id)
  // Un string como dependencia evita reconectar el observer si el array se recrea
  const ids = sections.map((section) => section.id).join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Solo cuenta el 40% superior de la pantalla
      { rootMargin: '0px 0px -60% 0px' },
    )

    for (const id of ids.split(',')) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav aria-label={label}>
      <ul className="border-l border-slate-crt">
        {sections.map((section) => {
          const current = section.id === active
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? 'location' : undefined}
                className={cx(
                  '-ml-px block border-l-2 px-3 py-1 font-display text-label-md uppercase',
                  'focus-visible:outline-2 focus-visible:outline-hyper',
                  current ? 'border-phosphor text-phosphor glow-text' : 'border-transparent text-outline hover:text-on-surface',
                )}
              >
                {current ? '> ' : ''}
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
