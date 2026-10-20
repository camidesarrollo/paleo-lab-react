import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Alert } from './Alert'
import { ToastContext } from './toast-context'
import type { ToastOptions } from './toast-context'

type ToastItem = ToastOptions & { id: number }

// ToastProvider: envuelve la app y muestra los avisos temporales abajo a la derecha.
// Reutiliza <Alert> para el contenido: un toast es una alerta que desaparece sola.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++
      setToasts((current) => [...current, { ...options, id }])
      window.setTimeout(() => dismiss(id), options.duration ?? 5000)
    },
    [dismiss],
  )

  return (
    <ToastContext value={toast}>
      {children}
      {/* La región aria-live existe siempre, así los lectores de pantalla anuncian cada toast nuevo */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-40 flex w-[min(24rem,calc(100%-2rem))] flex-col gap-2"
      >
        {toasts.map((item) => (
          <div key={item.id} className="pointer-events-auto animate-toast-in bg-graphite">
            <Alert tone={item.tone} title={item.title} live={false} onDismiss={() => dismiss(item.id)}>
              {item.message}
            </Alert>
          </div>
        ))}
      </div>
    </ToastContext>
  )
}
