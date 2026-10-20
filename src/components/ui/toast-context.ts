import { createContext, useContext } from 'react'

// El contexto y el hook van en un archivo aparte: así Toast.tsx solo exporta
// componentes y el recargado en caliente (Fast Refresh) de Vite sigue funcionando.

export type ToastTone = 'info' | 'success' | 'warning' | 'error'

export type ToastOptions = {
  title: string
  message?: string
  tone?: ToastTone
  duration?: number
}

export const ToastContext = createContext<((options: ToastOptions) => void) | null>(null)

// Uso: const toast = useToast(); toast({ title: 'Specimen revived', tone: 'success' })
export function useToast() {
  const toast = useContext(ToastContext)
  if (!toast) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return toast
}
