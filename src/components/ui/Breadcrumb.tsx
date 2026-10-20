type Crumb = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: Crumb[]
}

// Breadcrumb: ROOT > SEC-04 > INCUBATOR_01. El último elemento es la página actual.
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-2 font-display text-label-md uppercase">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-outline-variant">
                  &gt;
                </span>
              )}
              {last || !item.href ? (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-phosphor glow-text' : 'text-outline'}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-outline underline-offset-4 hover:text-phosphor hover:underline focus-visible:outline-2 focus-visible:outline-hyper"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
