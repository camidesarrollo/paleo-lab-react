import { cx } from '../../lib/cx'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Devuelve las páginas a mostrar: 1 … 4 5 6 … 12
function pageRange(page: number, total: number): Array<number | 'gap'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const visible = [...new Set([1, page - 1, page, page + 1, total])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)

  return visible.flatMap((p, i) => (i > 0 && p - visible[i - 1] > 1 ? ['gap' as const, p] : [p]))
}

const pad = (n: number) => String(n).padStart(2, '0')

const cellStyles =
  'min-w-8 cursor-pointer border px-2 py-1 font-display text-label-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hyper'

const arrowStyles = cx(
  cellStyles,
  'border-slate-crt text-outline hover:border-phosphor hover:text-phosphor disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-crt disabled:hover:text-outline',
)

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Paginación">
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Página anterior"
            className={arrowStyles}
          >
            [&lt;]
          </button>
        </li>
        {pageRange(page, totalPages).map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 font-display text-label-md text-outline">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Página ${item}`}
                aria-current={item === page ? 'page' : undefined}
                className={cx(
                  cellStyles,
                  item === page
                    ? 'border-phosphor bg-phosphor text-void shadow-glow'
                    : 'border-slate-crt text-outline hover:border-phosphor hover:text-phosphor',
                )}
              >
                {pad(item)}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Página siguiente"
            className={arrowStyles}
          >
            [&gt;]
          </button>
        </li>
      </ul>
    </nav>
  )
}
