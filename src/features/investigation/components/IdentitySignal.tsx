import { CrtViewport } from '../../../components/lab/CrtViewport'
import { spriteUrl } from '../domain/sprites'
import type { Revelation } from '../domain/types'

type IdentitySignalProps = {
  revelation?: Revelation
}

// Visor de la señal biométrica: bloqueado mientras se investiga,
// muestra el sprite con la animación de resurrección cuando el caso termina.
export function IdentitySignal({ revelation }: IdentitySignalProps) {
  return (
    <CrtViewport
      status="Señal biométrica detectada"
      meta={revelation ? 'Identidad restaurada' : 'Identidad bloqueada'}
    >
      <div className="relative mx-auto aspect-square w-full max-w-60 octagon bg-phosphor/30">
        <div className="absolute inset-px flex items-center justify-center octagon bg-void">
          {revelation ? (
            <img
              src={spriteUrl(revelation.pokemonId)}
              alt={`Ilustración de ${revelation.name}`}
              className="size-4/5 animate-resurrect object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <span aria-hidden className="font-display text-headline-xl text-phosphor glow-text">?</span>
              <span className="font-display text-label-sm uppercase text-on-surface-variant">
                Identidad y representación visual bloqueadas
              </span>
            </div>
          )}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 h-0.5 animate-sweep bg-phosphor/60" />
        </div>
      </div>
    </CrtViewport>
  )
}
