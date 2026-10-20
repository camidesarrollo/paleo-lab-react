# Del DESIGN.md al dashboard con Tailwind

Esta guía explica cómo se convirtió el sistema de diseño **Paleo-Terminal OS** ([DESIGN.md](DESIGN.md)) en código. La idea central es trabajar en tres capas, de lo más general a lo más concreto:

```
1. Tokens        → src/index.css            (colores, tipografía, sombras, animaciones)
2. Componentes   → src/components/ui/       (piezas genéricas: Panel, Button, Badge…)
                   src/components/lab/      (piezas propias del laboratorio: CryoHud, DnaHelixBar…)
3. Composición   → src/App.tsx              (el layout del dashboard que une todo)
```

Cada capa solo usa la de abajo: los componentes usan tokens y el dashboard usa componentes. Si mañana cambia el verde del diseño, se cambia **una línea** en `index.css` y se actualiza toda la app.

---

## Capa 1: tokens con `@theme`

En Tailwind v4 los tokens se definen en CSS, dentro de `@theme`. Cada variable genera clases automáticamente según su **prefijo**:

| Prefijo de la variable | Clases que genera | Ejemplo |
|---|---|---|
| `--color-*` | `bg-`, `text-`, `border-`, `stroke-`, `shadow-`… | `--color-phosphor` → `bg-phosphor`, `text-phosphor` |
| `--font-*` | `font-` | `--font-display` → `font-display` |
| `--text-*` | `text-` (tamaño) | `--text-label-md` → `text-label-md` |
| `--shadow-*` | `shadow-` | `--shadow-glow` → `shadow-glow` |
| `--animate-*` | `animate-` | `--animate-blink` → `animate-blink` |

### Colores
El front matter del DESIGN.md se copió 1 a 1 (`surface`, `on-surface`, `outline`…). Además se agregaron los nombres que usa el texto del diseño, porque son más fáciles de recordar:

| Token | Valor | Uso |
|---|---|---|
| `void` | `#0A0C0E` | Fondo más profundo (el tubo CRT) |
| `graphite` | `#12161A` | Fondo de los paneles |
| `slate-crt` | `#1F292E` | Bordes inactivos |
| `phosphor` | `#00FF66` | Verde principal |
| `amber` | `#FFB000` | Alertas y peligro |
| `hyper` | `#33FF33` | Anillos de foco |

La línea `--color-*: initial;` **borra la paleta por defecto de Tailwind**. Así, si escribes `bg-blue-500` no funciona: solo existen los colores del diseño. Es una forma de que el código obligue a cumplir el sistema.

La opacidad se aplica con `/`: `border-phosphor/50` es el verde al 50%.

### Tipografía
Un token de texto puede llevar sub-valores con `--`:

```css
--text-label-md: 11px;                      /* tamaño */
--text-label-md--line-height: 14px;
--text-label-md--letter-spacing: 0.1em;
--text-label-md--font-weight: 700;
```

Con eso, la clase `text-label-md` aplica las cuatro propiedades a la vez. La familia tipográfica va aparte: `font-display` (Space Mono) para títulos y labels, y `font-mono` (JetBrains Mono) para datos. Las fuentes se cargan desde Google Fonts en `index.html`.

```html
<h2 class="font-display text-label-md uppercase">SEC-04 // INCUBATOR_01</h2>
```

### Espaciado: no hizo falta crear tokens
La escala de Tailwind ya coincide con el diseño (cada unidad es `0.25rem`):

| DESIGN.md | Valor | Clase de Tailwind |
|---|---|---|
| `space-xs` | 0.25rem | `p-1`, `gap-1` |
| `space-sm` | 0.5rem | `p-2`, `gap-2` |
| `space-md` / `gutter` / `margin` | 1rem | `p-4`, `gap-4` |
| `space-lg` / `gutter-desktop` | 1.5rem | `p-6`, `gap-6` |
| `margin-desktop` | 2rem | `p-8` |
| `space-xl` | 2.5rem | `p-10` |

**Regla útil:** antes de crear un token, revisa si Tailwind ya lo tiene.

### Bordes rectos
El diseño pide `0px` de radio en todo. `--radius-*: initial;` elimina `rounded-sm`, `rounded-lg`, etc., así que no se puede redondear nada por accidente.

---

## Reglas que no son un valor: `@utility` y `@layer base`

Algunas reglas del diseño son CSS más complejo. Para esas se crean **utilidades propias** con `@utility`; funcionan igual que las clases de Tailwind, incluso con variantes (`hover:chamfer`, `lg:chamfer`).

| Utilidad | Regla del DESIGN.md |
|---|---|
| `chamfer` | Esquinas cortadas a 45° con `clip-path` (sección *Shapes*) |
| `octagon` | Visor poligonal del Cryo-Chamber HUD |
| `glow-text` | Halo de fósforo en el texto; usa `currentColor`, sirve para verde y ámbar |
| `crt-glass` | Scanlines cada 2px + viñeta radial (sección *CRT Glass*) |

`@layer base` define lo que aplica a toda la página: fondo `void`, texto `on-surface` y fuente mono en el `body`. También desactiva las animaciones si el usuario tiene activado "reducir movimiento" en su sistema.

> ⚠️ **Trampa con `clip-path`:** recorta todo lo que sale de la forma, incluida la `box-shadow`. Por eso los paneles `featured` (con `chamfer`) no llevan las cruces `+` en las esquinas: quedarían cortadas.

---

## Capa 2: componentes

### Los patrones que se repiten

**1. Props tipadas con TypeScript.** Cada componente declara qué recibe:

```tsx
type BadgeProps = {
  label: string
  value: string
  tone?: Tone          // el ? la hace opcional
}
```

**2. Variantes como objeto de clases.** En vez de muchos `if`, un `Record` que relaciona cada variante con sus clases:

```tsx
const variants: Record<Variant, string> = {
  primary: 'bg-phosphor text-void shadow-glow hover:bg-amber …',
  secondary: 'border border-amber text-amber hover:bg-amber/10',
}
```

Agregar una variante nueva es agregar una línea, y TypeScript avisa si te falta alguna.

**3. `cx()` para combinar clases** ([src/lib/cx.ts](../src/lib/cx.ts)). Une clases y descarta las condiciones falsas:

```tsx
cx('border bg-graphite', featured && 'chamfer', className)
```

**4. Aceptar `className` desde fuera.** Así quien usa el componente puede ajustar su posición (`lg:col-span-6`) sin modificar el componente.

**5. Extender los atributos nativos.** `Button` acepta todo lo que acepta un `<button>` (`type`, `onClick`, `disabled`…) gracias a:

```tsx
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
```

### Componentes genéricos (`ui/`)

| Componente | Sección del DESIGN.md | Qué aprender de él |
|---|---|---|
| [Panel](../src/components/ui/Panel.tsx) | Diagnostic Cells | `relative` + `absolute` para colocar las cruces; `children` para el contenido |
| [Button](../src/components/ui/Button.tsx) | Buttons | Variantes, `hover:animate-flicker`, `focus-visible:` para teclado |
| [Badge](../src/components/ui/Badge.tsx) | Badges & Chips | El componente más simple: buen punto de partida |
| [CommandInput](../src/components/ui/CommandInput.tsx) | Input Fields | `peer` + `peer-placeholder-shown:` para el cursor cuadrado; `useId` para el `label` |
| [DataToggle](../src/components/ui/DataToggle.tsx) | Checkboxes | Checkbox real oculto con `sr-only` (accesible) y dibujado como `[X]` |

#### Biblioteca completa de `ui/`

| Componente | Qué aprender de él |
|---|---|
| [Typography](../src/components/ui/Typography.tsx) | `Heading`, `Text`, `Label` y `Code`. El nivel semántico (`h1`) va separado del tamaño visual (`size`) |
| [Alert](../src/components/ui/Alert.tsx) | Un `Record` con varias claves por variante; `role="alert"` solo para lo urgente |
| [ButtonGroup](../src/components/ui/ButtonGroup.tsx) | Componente **genérico** (`<T extends string>`): TypeScript solo acepta valores que existen en `options` |
| [Breadcrumb](../src/components/ui/Breadcrumb.tsx) | `aria-current="page"` en el último elemento |
| [List](../src/components/ui/List.tsx) | Etiqueta dinámica (`ol` o `ul`) y texto `sr-only` para que el estado no dependa solo del color |
| [ProgressBar](../src/components/ui/ProgressBar.tsx) | Valor arbitrario `bg-[repeating-linear-gradient(...)]` para dividir el relleno en bloques; `_` equivale a un espacio |
| [Accordion](../src/components/ui/Accordion.tsx) | `<details>` nativo + variante `group-open:`; `name` compartido para que solo haya una sección abierta |
| [Tabs](../src/components/ui/Tabs.tsx) | Patrón ARIA de pestañas: `tabIndex` "itinerante" y navegación con flechas |
| [Carousel](../src/components/ui/Carousel.tsx) | `translateX` con `style` (valor calculado) + `inert` en las diapositivas ocultas |
| [Dropdown](../src/components/ui/Dropdown.tsx) | `useRef` + `useEffect` para cerrar al hacer clic fuera; variante `aria-expanded:` |
| [Modal](../src/components/ui/Modal.tsx) | `<dialog>` nativo con `showModal()`; el fondo oscuro se estiliza con `backdrop:` |
| [Pagination](../src/components/ui/Pagination.tsx) | Lógica separada en una función pura (`pageRange`) y variantes combinadas (`disabled:hover:`) |
| [Video](../src/components/ui/Video.tsx) | `aspect-video` y la capa `crt-glass` encima con `pointer-events-none` |
| [Grid](../src/components/ui/Grid.tsx) | `Grid` + `GridItem` para el rack de 1/2/12 columnas. **Lección clave:** las clases se escriben completas en mapas, nunca armadas con `${}` (ver abajo) |
| [MediaList](../src/components/ui/MediaList.tsx) | Filtros encadenados (`grayscale sepia hue-rotate-[70deg] saturate-200`) para teñir fotos de verde fósforo; `truncate` y `line-clamp-2` para textos largos |
| [Notification](../src/components/ui/Notification.tsx) | Estado "leído/no leído" controlado desde fuera (`onRead`, `onReadAll`); texto `sr-only` "(sin leer)" |
| [Popover](../src/components/ui/Popover.tsx) | API nativa `popover` + `popoverTarget` (sin `useState`) y CSS Anchor Positioning con propiedades arbitrarias `[position-area:bottom]` |
| [Tooltip](../src/components/ui/Tooltip.tsx) | Solo CSS para mostrar (`group-hover:` / `group-focus-within:`), `cloneElement` para agregar `aria-describedby` y `invisible!` (el `!` es `!important`) para ocultarlo con Escape |
| [ScrollSpy](../src/components/ui/ScrollSpy.tsx) | `IntersectionObserver` dentro de `useEffect`, con limpieza (`disconnect`) al desmontar |
| [Spinner](../src/components/ui/Spinner.tsx) | Animación con `setInterval` que respeta "reducir movimiento"; `role="status"` |
| [Toast](../src/components/ui/Toast.tsx) | **Context** de React: `ToastProvider` envuelve la app y `useToast()` ([toast-context.ts](../src/components/ui/toast-context.ts)) se usa desde cualquier componente. Reutiliza `Alert` |

> ⚠️ **Nunca armes nombres de clase con variables.** Tailwind busca las clases como texto en tus archivos *antes* de ejecutar el código. Si escribes `` `lg:col-span-${n}` ``, nunca encuentra `lg:col-span-6` escrita completa y no genera esa clase. Por eso [Grid](../src/components/ui/Grid.tsx) tiene un mapa con todas las clases escritas.
>
> ```tsx
> className={`lg:col-span-${n}`}       // ❌ no funciona
> className={spanClasses.lg[n]}         // ✅ 'lg:col-span-6' aparece literal en el mapa
> ```

Para usar los toasts, envuelve la app una sola vez en `main.tsx`:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

Después, en cualquier componente:

```tsx
const toast = useToast()
toast({ title: 'Specimen revived', message: 'SEQ_A estable', tone: 'success' })
```

**Regla de accesibilidad que siguen todos:** antes de construir algo desde cero, usa el elemento HTML nativo que ya lo resuelve (`<details>`, `<dialog>`, `<button>`, `<input type="checkbox">`). Así, el teclado y los lectores de pantalla funcionan sin trabajo extra.

### Componentes del laboratorio (`lab/`)

| Componente | Qué aprender de él |
|---|---|
| [DnaHelixBar](../src/components/lab/DnaHelixBar.tsx) | Generar segmentos con `Array.from`; cada segmento elige su estilo (`ok`, `gap`, `empty`) |
| [Waveform](../src/components/lab/Waveform.tsx) | SVG con clases de Tailwind (`stroke-phosphor`) y valores arbitrarios (`drop-shadow-[…]`) |
| [CryoHud](../src/components/lab/CryoHud.tsx) | Truco del borde: dos octágonos superpuestos, el de afuera es el borde |
| [LogStream](../src/components/lab/LogStream.tsx) | Colores por nivel con un `Record` |
| [LabHeader](../src/components/lab/LabHeader.tsx) | Tipografía responsive: `text-headline-xl-mobile lg:text-headline-xl` |

Los datos de ejemplo están en [src/data/lab.ts](../src/data/lab.ts), separados de los componentes. Cuando haya una API real, solo cambia ese archivo.

---

## Capa 3: el layout responsive

Los breakpoints del diseño coinciden con los de Tailwind:

| DESIGN.md | Prefijo de Tailwind | Layout |
|---|---|---|
| Mobile (< 768px) | *(sin prefijo)* | 1 columna apilada, línea de comandos fija abajo |
| Tablet (768–1024px) | `md:` | 2 columnas: visor \| métricas |
| Desktop (> 1024px) | `lg:` | 12 columnas: ala izq. (3) \| visor (6) \| ala der. (3) |

Tailwind es **mobile-first**: las clases sin prefijo son para móvil, y `md:` / `lg:` las sobrescriben en pantallas más grandes.

```tsx
<main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
```

**Truco del orden:** en el HTML el visor va primero, para que en móvil salga arriba. En desktop se mueve al centro con `lg:col-start-4`, y las alas se colocan con `lg:col-start-1` y `lg:col-start-10`. Todas usan `lg:row-start-1` para quedar en la misma fila.

La línea de comandos usa `sticky bottom-0 md:static`: fija abajo solo en móvil, como pide el diseño.

---

## Cómo crear un componente nuevo (receta)

1. **Busca la sección** del DESIGN.md y anota las reglas: colores, tipografía, bordes, estados.
2. **Traduce cada regla a una clase.** Si no existe, decide si es un token (`@theme`) o una utilidad (`@utility`).
3. **Define las props** con un `type`. ¿Tiene variantes? Usa un `Record`.
4. **Escribe primero la versión móvil** y después agrega `md:` / `lg:`.
5. **Revisa los estados:** `hover:`, `focus-visible:` (navegación con teclado) y `disabled:`.
6. Ejecuta `npm run build` para que TypeScript revise los tipos.

---

## Ejercicios para practicar

Dos componentes del DESIGN.md quedaron sin hacer a propósito:

1. **Tactile Switch** (sección *Buttons*): interruptor con un LED cuadrado verde cuando está activo y gris cuando no. Pista: parte de `DataToggle` y cambia `[X]` por un `<span className="size-2 bg-phosphor" />`.
2. **Phosphor Graph Panel** (sección *Cards*): agrega números en los ejes X e Y del `Waveform`. Pista: no uses `<text>` dentro del SVG, porque `preserveAspectRatio="none"` estiraría las letras. Pon los números como HTML alrededor del SVG (un `flex justify-between` debajo para el eje X) con `font-display text-label-sm text-outline`.
3. **Botón con chamfer y brillo:** intenta poner `chamfer` al botón primario. Vas a ver que el brillo desaparece (por la trampa de `clip-path`). Solución: envuelve el botón en un `<span>` con `drop-shadow-[0_0_6px_var(--color-phosphor)]`, porque el filtro del padre se aplica después del recorte del hijo.
