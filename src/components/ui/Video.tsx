import type { ReactNode } from 'react'

type VideoProps = {
  src: string
  title: string
  channel?: string
  poster?: string
  live?: boolean
  // Para pasar <track> de subtítulos
  children?: ReactNode
}

// Video: transmisión de cámara del laboratorio con vidrio CRT encima.
// Usa los controles nativos del navegador (accesibles por teclado).
export function Video({ src, title, channel = 'CAM-01', poster, live = false, children }: VideoProps) {
  return (
    <figure className="border border-slate-crt bg-void">
      <figcaption className="flex items-center justify-between gap-3 border-b border-slate-crt px-3 py-2 font-display text-label-md uppercase">
        <span className="text-on-surface-variant">
          {channel}
          {' // '}
          {title}
        </span>
        {live && (
          <span className="flex items-center gap-1.5 text-amber">
            <span aria-hidden className="size-2 animate-blink bg-amber" />
            Rec
          </span>
        )}
      </figcaption>
      <div className="relative aspect-video">
        <video src={src} poster={poster} controls preload="metadata" className="size-full object-contain">
          {children}
        </video>
        <div aria-hidden className="pointer-events-none absolute inset-0 crt-glass" />
      </div>
    </figure>
  )
}
