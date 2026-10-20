// Une clases de Tailwind ignorando las condiciones falsas:
// cx('p-4', isActive && 'bg-phosphor') → 'p-4 bg-phosphor' o 'p-4'
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
