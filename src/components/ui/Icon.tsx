import { cx } from '../../lib/cx'

type IconProps = {
  // Nombre del ícono de Material Symbols: https://fonts.google.com/icons
  name: string
  size?: number
  // Si el ícono comunica algo por sí solo, describe qué; si es decorativo, no lo pases
  label?: string
  className?: string
}

// Los íconos son una fuente con ligaduras: el texto "science" se dibuja como un matraz.
// Por eso los decorativos llevan aria-hidden, si no el lector de pantalla leería "science".
export function Icon({ name, size = 20, label, className }: IconProps) {
  return (
    <span
      className={cx('material-symbols-outlined shrink-0 select-none', className)}
      style={{ fontSize: size }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {name}
    </span>
  )
}
