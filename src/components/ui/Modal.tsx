import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

// Modal con <dialog> nativo: showModal() ya atrapa el foco, cierra con Escape
// y oscurece el fondo (se estiliza con la variante backdrop:).
export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      // Clic en el fondo oscuro (fuera del contenido) cierra el modal
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg border border-phosphor/50 bg-graphite p-0 text-on-surface shadow-glow backdrop:bg-void/80"
    >
      <header className="flex items-center justify-between gap-3 border-b border-slate-crt px-4 py-2">
        <h2 id={titleId} className="font-display text-label-lg uppercase text-phosphor glow-text">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="cursor-pointer font-display text-label-md text-outline hover:text-amber focus-visible:outline-2 focus-visible:outline-hyper"
        >
          [X]
        </button>
      </header>
      <div className="p-4 text-body-md">{children}</div>
      {footer && <footer className="flex justify-end gap-3 border-t border-slate-crt px-4 py-3">{footer}</footer>}
    </dialog>
  )
}
