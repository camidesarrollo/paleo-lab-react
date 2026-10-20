import { useId } from 'react'
import type { ReactNode } from 'react'

type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  exclusive?: boolean
  defaultOpen?: string
}

// Accordion con <details>/<summary> nativos: teclado y lectores de pantalla ya funcionan.
// exclusive: al abrir una sección se cierran las demás (atributo name compartido).
export function Accordion({ items, exclusive = false, defaultOpen }: AccordionProps) {
  const groupName = useId()

  return (
    <div className="divide-y divide-slate-crt border border-slate-crt">
      {items.map((item) => (
        <details
          key={item.id}
          name={exclusive ? groupName : undefined}
          open={item.id === defaultOpen}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-2 font-display text-label-lg uppercase hover:bg-surface-container focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-hyper [&::-webkit-details-marker]:hidden">
            <span aria-hidden className="text-phosphor group-open:text-amber">
              <span className="group-open:hidden">[+]</span>
              <span className="hidden group-open:inline">[-]</span>
            </span>
            {item.title}
          </summary>
          <div className="border-t border-slate-crt bg-void p-3 text-body-md text-on-surface-variant">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  )
}
