type MediaItem = {
  id: string
  title: string
  description: string
  image: { src: string; alt: string }
  meta?: string
  href?: string
}

type MediaListProps = {
  items: MediaItem[]
}

// Filtros encadenados que tiñen cualquier imagen de verde fósforo
const phosphorTint = 'grayscale sepia hue-rotate-[70deg] saturate-200'

// List Media: listado con miniatura, título, descripción y un dato a la derecha
export function MediaList({ items }: MediaListProps) {
  return (
    <ul className="divide-y divide-slate-crt border border-slate-crt">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 p-3 hover:bg-surface-container">
          <img
            src={item.image.src}
            alt={item.image.alt}
            loading="lazy"
            className={`size-16 shrink-0 border border-slate-crt object-cover ${phosphorTint}`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="truncate font-display text-headline-sm uppercase text-phosphor">
                {item.href ? (
                  <a
                    href={item.href}
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-hyper"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              {item.meta && (
                <span className="shrink-0 font-display text-label-sm uppercase text-outline">{item.meta}</span>
              )}
            </div>
            <p className="line-clamp-2 text-body-sm text-on-surface-variant">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
