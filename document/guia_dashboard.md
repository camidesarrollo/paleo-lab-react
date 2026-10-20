# Guía: del HTML del dashboard a componentes React reutilizables

Esta guía muestra cómo se convirtió [src/layout/dashboard/code.html](../src/layout/dashboard/code.html), un HTML de unas 700 líneas con Tailwind v3 por CDN y JavaScript suelto, en piezas de React que se pueden reutilizar en otras pantallas.

La idea central: **no se traduce el HTML de arriba a abajo**. Primero se buscan los patrones que se repiten, se convierten en piezas y al final se arma la página con esas piezas.

---

## Paso 0: analizar el HTML antes de escribir código

Recorre el HTML y anota cada bloque visual. Después busca qué **se repite** (aunque cambie el texto o el color). Cada patrón repetido es un componente.

| Patrón en el HTML | Veces | Componente |
|---|---|---|
| `<div class="bg-surface-container-lowest p-space-md rounded shadow-xl …">` (caja de cada bloque) | 8 | `Card` |
| `<span class="w-2 h-2 rounded-full bg-primary-container animate-ping">` (LED) | 10+ | `StatusDot` |
| `<span class="px-1.5 py-0.5 bg-error-container … uppercase">CORROMPIDO</span>` | 10+ | `Tag` |
| Etiqueta chica + valor debajo (`COSTO DE PROTOCOLO:` / `-15 ⚡`) | 12+ | `Stat` |
| Título + badge a la izquierda, texto o botones a la derecha | 4 | `SectionHeader` |
| Botones `[ESTADO ACTIVO] [TUTORIAL VACÍO]…` y `[TODOS] [AUDIO-CLIPS]…` | 2 | `ButtonGroup` (ya existía) |
| Barra de reconstrucción Pokédex | 1 | `ProgressBar` (ya existía) |
| Bloques de energía `▮▮▮▯` | 1 | `SegmentMeter` |
| `<span class="material-symbols-outlined">science</span>` | 12 | `Icon` |
| Expedientes pendientes (3 tarjetas iguales) | 3 | `DossierCard` |
| Fragmentos sueltos (4 tarjetas iguales) | 4 | `FragmentCard` |
| Resurrecciones con rango S/A/B | 3 | `RankedItem` |
| Pasos del tutorial | 4 | `StepCard` |
| Líneas `[SYS_WARN 03:14:02] texto…` | 4 | `LogStream` (ya existía) |
| Barra segmentada de ADN | 1 | `DnaHelixBar` (ya existía) |
| Visor con cuadrícula, viñeta y barras de estado | 1 | `CrtViewport` |
| SVG de la amonite | 1 | `FossilSilhouette` |
| Volcado hexadecimal | 1 | `HexStream` |
| Mini ecualizador | 1 | `EqualizerBars` |

> 💡 Algunas piezas aparecen **una sola vez** (`CrtViewport`, `FossilSilhouette`) pero igual se separan: son autocontenidas y probablemente se usen en otras pantallas (Cámara incubadora, Sala de gritos…).

---

## Paso 1: traducir las clases de Tailwind v3 a nuestro Tailwind v4

El HTML trae su propia configuración de Tailwind v3. Nosotros ya tenemos los tokens en [src/index.css](../src/index.css), así que se traducen las clases:

| HTML (Tailwind v3 de Stitch) | Nuestro proyecto (v4) | Por qué |
|---|---|---|
| `font-label-sm text-label-sm` | `font-display text-label-sm` | En v4 la familia va aparte: `font-display` (Space Mono) |
| `font-body-sm text-body-sm` | `text-body-sm` | El `body` ya usa JetBrains Mono |
| `p-space-xs` / `p-space-sm` / `p-space-md` / `p-space-lg` / `p-space-xl` | `p-1` / `p-2` / `p-4` / `p-6` / `p-10` | La escala de Tailwind ya coincide (ver [dashboard_componentes.md](dashboard_componentes.md)) |
| `gap-space-md` | `gap-4` | Igual que arriba |
| `text-primary-container` / `bg-primary-container` | `text-phosphor` / `bg-phosphor` | Mismo color (`#00ff66`) con nombre de marca |
| `rounded`, `rounded-full` | *(se quitan)* | El DESIGN.md pide 0px de radio |
| `shadow-xl`, `shadow-2xl` | `border border-slate-crt` | El DESIGN.md no usa sombras suaves: profundidad con bordes |
| `shadow-[0_0_8px_#00ff66]` | `shadow-glow` | Token de brillo de fósforo |
| `tracking-widest`, `font-bold` | *(se quitan)* | Cada token `text-label-*` ya trae tracking y peso |
| `animate-[spin_20s_linear_infinite]` | `animate-orbit` | Animación con nombre en `@theme` |
| `<svg><pattern id="crt-grid">…` | `crt-grid` | Utilidad propia en `index.css`, sin ids repetidos |

---

## Paso 2: decidir dónde vive cada pieza

```
src/
├─ components/
│  ├─ ui/        ← genéricas: no saben nada del laboratorio (Card, Tag, Stat, Icon…)
│  └─ lab/       ← del dominio: expedientes, fragmentos, visor CRT… (reciben datos por props)
├─ layout/
│  └─ dashboard/ ← el marco común: DashboardLayout, Sidebar, SideNav, Topbar
├─ pages/
│  └─ dashboard/
│     ├─ DashboardPage.tsx  ← arma la página y guarda el estado compartido
│     └─ sections/          ← cada bloque de la página conectado a sus datos
└─ data/
   └─ dashboard.ts          ← todo el texto y los números
```

**Regla de dependencias:** cada capa solo importa de las de abajo.

```
pages  →  layout  →  lab  →  ui
  ↓                    ↓
 data  ←──────────────┘ (solo tipos)
```

- Un componente de `ui/` **nunca** importa de `lab/` ni de `data/`.
- Un componente de `lab/` recibe todo por props: no importa datos.
- Solo las **secciones** y el **layout** leen `data/`.

Así, `DossierCard` sirve con datos de prueba, de una API o de un test, sin cambiarla.

---

## Paso 3: piezas genéricas (`components/ui/`)

Se construyen primero porque todas las demás las usan. El proceso es siempre igual: copia el HTML de una aparición, identifica qué cambia entre apariciones (eso serán **props**) y qué no (eso son **clases fijas**).

### Ejemplo completo: `Tag`

Tres apariciones en el HTML:

```html
<span class="px-1.5 py-0.5 bg-error-container text-on-error-container font-label-sm text-label-sm rounded uppercase font-mono">CORROMPIDO</span>
<span class="px-1.5 py-0.5 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded uppercase font-mono">CONGELADO</span>
<span class="px-1.5 py-0.5 bg-surface-container-high text-secondary font-label-sm text-label-sm rounded uppercase font-mono">SIN DECODIFICAR</span>
```

- **Fijo:** `px-1.5 py-0.5 font-display text-label-sm uppercase`
- **Cambia:** el par fondo + texto → prop `tone`
- **Cambia:** el contenido → `children`

```tsx
const tones: Record<TagTone, string> = {
  neutral: 'bg-surface-container-highest text-on-surface-variant',
  phosphor: 'bg-surface-container-high text-phosphor',
  amber: 'bg-surface-container-high text-secondary',
  warning: 'bg-secondary-container text-on-secondary-container',
  danger: 'bg-error-container text-on-error-container',
}

export function Tag({ tone = 'neutral', children }: TagProps) {
  return <span className={cx('… clases fijas …', tones[tone])}>{children}</span>
}
```

Uso: `<Tag tone="danger">CORROMPIDO</Tag>`.

### El resto de piezas genéricas

| Pieza | Props principales | Decisión de diseño |
|---|---|---|
| [Icon](../src/components/ui/Icon.tsx) | `name`, `size`, `label?` | Sin `label` es decorativo (`aria-hidden`). La fuente se carga en `index.html` |
| [StatusDot](../src/components/ui/StatusDot.tsx) | `tone`, `motion` (`pulse` / `ping`), `size` | Cuadrado, no redondo |
| [Stat](../src/components/ui/Stat.tsx) | `label`, `value`, `tone`, `size`, `align`, `boxed` | `boxed` le da fondo para las cuadrículas de lecturas |
| [SegmentMeter](../src/components/ui/SegmentMeter.tsx) | `value`, `max`, `segments`, `tone` | Calcula cuántos bloques encender |
| [Card](../src/components/ui/Card.tsx) | `as`, `padding`, `className` | **Solo** el contenedor: el encabezado se compone por fuera |
| [SectionHeader](../src/components/ui/SectionHeader.tsx) | `title`, `subtitle`, `icon`, `badge`, `aside` | Recibe **elementos** en `icon`, `badge` y `aside` (no strings) |
| [StepCard](../src/components/ui/StepCard.tsx) | `title`, `description`, `tone` | Es un `<li>`: va dentro de un `<ol>` |

También se ampliaron piezas que ya existían, en vez de crear otras casi iguales:

- **`Button`**: nueva variante `ghost` (`[ANALIZAR]`, `[PURGAR]`) y prop `size` (`sm` / `md` / `lg`).
- **`ProgressBar`**: prop `valueText` para mostrar `14 / 151 (9.2%)` en vez del porcentaje.
- **`LogStream`**: nivel `error` y el prompt `SYS_ROOT:>` al final.
- **`ButtonGroup`**: `flex-wrap`, para que los filtros bajen de línea en móvil.

> 💡 **Props que reciben elementos (`ReactNode`).** `SectionHeader` no sabe si a la derecha va un texto, un botón o un grupo de filtros: recibe lo que le pases en `aside`. Eso lo hace reutilizable en los 4 encabezados del dashboard, que son distintos.
>
> ```tsx
> <SectionHeader title="Expedientes pendientes" badge={<Tag tone="warning">3 en espera</Tag>} aside="Gabinete-B" />
> <SectionHeader title="Fragmentos sueltos" aside={<ButtonGroup … />} />
> ```

---

## Paso 4: piezas del laboratorio (`components/lab/`)

Se construyen **con** las piezas genéricas. Las tarjetas reciben **un objeto completo** en vez de muchas props sueltas, porque así es como llegan los datos:

```tsx
// ❌ difícil de mantener
<DossierCard code="EXP-140" title="FÓSIL DOMO" status="CORROMPIDO" statusTone="danger" dna={42} … />

// ✅ el objeto viene tal cual de los datos
<DossierCard dossier={dossier} onAction={handleDossier} />
```

El **tipo** del objeto (`Dossier`, `Fragment`, `RankedEntry`…) se exporta desde el mismo archivo del componente, y `data/dashboard.ts` lo importa. Así, si te falta un campo en los datos, TypeScript te avisa.

| Pieza | Compuesta con | Lección |
|---|---|---|
| [DossierCard](../src/components/lab/DossierCard.tsx) | `Tag`, `Button`, `Icon` | Si hay `lockedReason`, muestra el candado y deshabilita el botón: **un estado, dos efectos** |
| [FragmentCard](../src/components/lab/FragmentCard.tsx) | `Tag`, `Button`, `Icon` | El campo `type` no se ve: sirve para filtrar |
| [RankedItem](../src/components/lab/RankedItem.tsx) | — | `sr-only` "Rango" para que el lector diga "Rango S" y no solo "S" |
| [CrtViewport](../src/components/lab/CrtViewport.tsx) | `StatusDot` | Capas decorativas `absolute` + contenido `relative` encima |
| [FossilSilhouette](../src/components/lab/FossilSilhouette.tsx) | — | SVG en JSX (`stroke-width` → `strokeWidth`) y rotación con `[transform-box:fill-box]` |
| [HexStream](../src/components/lab/HexStream.tsx) | — | Color por estado con un `Record` |
| [EqualizerBars](../src/components/lab/EqualizerBars.tsx) | — | Mapa de alturas con clases completas (`h-1`… `h-6`), nunca `` `h-${n}` `` |

---

## Paso 5: sacar los datos a `data/dashboard.ts`

Todo el texto y los números del HTML pasan a [src/data/dashboard.ts](../src/data/dashboard.ts). Los componentes no tienen texto de contenido "pegado".

```ts
export const pendingDossiers: Dossier[] = [
  { id: 'exp-140', code: 'EXP-140 // SEC-02', title: 'FÓSIL DOMO', status: { label: 'CORROMPIDO', tone: 'danger' }, … },
  …
]
```

**Beneficio:** cuando conectes la PokeAPI, solo cambia este archivo (o se reemplaza por un `fetch`). Ningún componente se toca.

---

## Paso 6: el marco (`layout/dashboard/`)

El layout es lo que **todas** las pantallas del laboratorio comparten.

| Pieza | Qué hace |
|---|---|
| [DashboardLayout](../src/layout/dashboard/DashboardLayout.tsx) | Vidrio CRT + `Sidebar` + `Topbar` + `<main>{children}</main>`. Guarda si el menú móvil está abierto |
| [Sidebar](../src/layout/dashboard/Sidebar.tsx) | Estado del núcleo, `SideNav` y caja de terminal |
| [SideNav](../src/layout/dashboard/SideNav.tsx) | La lista `> LABORATORIO_PRINCIPAL…` con el elemento activo resaltado |
| [Topbar](../src/layout/dashboard/Topbar.tsx) | Marca, nivel, `ProgressBar`, `Stat` + `SegmentMeter` de energía, módulos |

**Cambios respecto al HTML para que funcione en móvil:**

- **La barra lateral** era `fixed w-72` siempre. Ahora es fija solo en desktop (`lg:`). En móvil y tablet es un cajón que se abre con el botón ☰: se cierra con Escape, con el fondo oscuro o al elegir una sección.

  ```tsx
  open ? 'translate-x-0' : 'invisible -translate-x-full'   // + lg:visible lg:translate-x-0
  ```

  `invisible` evita que, cerrado, se pueda llegar a sus enlaces con Tab.

- **La barra superior** era `fixed h-28` y obligaba a poner `pt-28` en el contenido. Ahora es `sticky top-0`: ocupa su propio espacio, crece si el texto baja de línea y no hace falta compensar nada.

- **Los módulos** (`SALA DE GRITOS [ACTIVO]`…) solo se muestran en pantallas `xl:` para no saturar la barra.

---

## Paso 7: las secciones (`pages/dashboard/sections/`)

Una **sección** es un bloque de la página que une piezas con sus datos. No contiene estilos complejos: es composición.

```tsx
export function RecentResurrections() {
  return (
    <Card>
      <SectionHeader level={3} title="Resurrecciones recientes" icon={<StatusDot />} aside="[Histórico]" />
      <ul className="flex flex-col gap-1">
        {resurrections.map((entry) => (
          <li key={entry.id}>
            <RankedItem entry={entry} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
```

| Sección | Piezas que usa |
|---|---|
| [ConsoleStatusBar](../src/pages/dashboard/sections/ConsoleStatusBar.tsx) | `Card`, `Tag`, `StatusDot`, `ButtonGroup` |
| [ActiveDossier](../src/pages/dashboard/sections/ActiveDossier.tsx) | `Card`, `Tag`, `StatusDot`, `CrtViewport`, `FossilSilhouette`, `DnaHelixBar`, `HexStream`, `Stat`, `Button`, `Icon` |
| [PendingDossiers](../src/pages/dashboard/sections/PendingDossiers.tsx) | `SectionHeader`, `Tag`, `DossierCard` |
| [RecentResurrections](../src/pages/dashboard/sections/RecentResurrections.tsx) | `Card`, `SectionHeader`, `StatusDot`, `RankedItem` |
| [SubsoilDiagnostics](../src/pages/dashboard/sections/SubsoilDiagnostics.tsx) | `Card`, `StatusDot`, `LogStream`, `Icon`, `EqualizerBars` |
| [IncubatorStatus](../src/pages/dashboard/sections/IncubatorStatus.tsx) | `Card`, `Stat` |
| [FragmentTray](../src/pages/dashboard/sections/FragmentTray.tsx) | `Card`, `SectionHeader`, `Icon`, `ButtonGroup`, `FragmentCard` |
| [TutorialSteps](../src/pages/dashboard/sections/TutorialSteps.tsx) | `Card`, `SectionHeader`, `Icon`, `Button`, `StepCard` |

---

## Paso 8: la página y el estado (adiós al JavaScript suelto)

El HTML tenía tres funciones que modificaban el DOM a mano. En React se reemplazan por **estado**:

| HTML (JavaScript suelto) | React |
|---|---|
| `setSimState()` cambia `className` de 4 botones con `getElementById` | `const [simState, setSimState] = useState('active')` + `ButtonGroup` marca el activo solo |
| `tutorialOverlay.classList.remove('hidden')` | `{simState === 'tutorial' && <TutorialSteps />}` |
| `mainDossier.classList.add('opacity-40')` | `<ActiveDossier offline={simState === 'error'} />` |
| `filterFragments()` oculta tarjetas con `style.display = 'none'` | `fragments.filter((f) => f.type === filter)` dentro de `FragmentTray` |
| `alert('[SISTEMA]: …')` | `toast({ tone: 'success', title: '…' })` con el `ToastProvider` |

**¿Dónde vive cada estado?** Lo más abajo posible:

- El **filtro de fragmentos** solo le importa a `FragmentTray`, así que vive **ahí**.
- El **estado simulado** afecta a varias secciones (consola, tutorial, expediente), así que vive en la **página** ([DashboardPage](../src/pages/dashboard/DashboardPage.tsx)).
- **El menú móvil abierto** afecta a `Topbar` y `Sidebar`, así que vive en su padre común: `DashboardLayout`.

Las secciones no deciden qué pasa al hacer clic: **avisan** con un callback (`onAction`, `onStartProtocol`) y la página decide.

```tsx
<PendingDossiers onAction={handleDossier} />
```

---

## Paso 9: montar todo

```tsx
// main.tsx: el proveedor de toasts envuelve la app una sola vez
<ToastProvider>
  <App />
</ToastProvider>

// App.tsx: el marco + la página
<DashboardLayout>
  <DashboardPage />
</DashboardLayout>
```

La distribución de la página reutiliza `Grid`: 1 columna en móvil, 8 + 4 columnas en desktop.

```tsx
<Grid columns={{ base: 1, lg: 12 }}>
  <GridItem span={{ lg: 8 }}>…expedientes…</GridItem>
  <GridItem span={{ lg: 4 }}>…telemetría…</GridItem>
</Grid>
```

---

## Cambios intencionales respecto al HTML

| HTML | Ahora | Motivo |
|---|---|---|
| Esquinas redondeadas y LEDs circulares | Todo recto, LEDs cuadrados | DESIGN.md: 0px de radio |
| Sombras `shadow-xl` | Bordes `slate-crt` | DESIGN.md: sin sombras suaves |
| Visor de la amonite circular | Octagonal (`octagon`) | Coherente con el Cryo-Chamber HUD |
| Emblema desde `lh3.googleusercontent.com` | Ícono `genetics` | La URL generada por Stitch es externa y puede caducar |
| `alert()` del navegador | Toasts | No bloquea la pantalla y sigue el estilo |
| Barra lateral siempre fija | Cajón en móvil | El HTML no funcionaba en pantallas chicas |
| Botones sin estado accesible | `aria-pressed`, `aria-current`, `role="meter"`… | Lectores de pantalla |

---

## Cómo reutilizar: una pantalla nueva en minutos

Ejemplo: la pantalla **SALA_DE_GRITOS** con piezas que ya existen.

```tsx
import { Waveform } from '../../components/lab/Waveform'
import { Card } from '../../components/ui/Card'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { Stat } from '../../components/ui/Stat'
import { Icon } from '../../components/ui/Icon'
import { vocalWaveform } from '../../data/lab'

export function ScreamRoomPage() {
  return (
    <Card>
      <SectionHeader
        title="Sala de gritos"
        icon={<Icon name="graphic_eq" className="text-secondary" />}
        aside="FREQ: 8.4 kHz"
      />
      <Waveform label="Grito reconstruido" points={vocalWaveform} />
      <div className="flex justify-between">
        <Stat label="Especie" value="EXP-131 // LAPRAS" />
        <Stat label="Fidelidad" value="99.4%" tone="phosphor" align="end" />
      </div>
    </Card>
  )
}
```

Y se muestra dentro del mismo marco:

```tsx
<DashboardLayout>
  <ScreamRoomPage />
</DashboardLayout>
```

No hubo que escribir ni una clase de color, borde o tipografía nueva: todo sale de las piezas.

---

## Ejercicios

1. **Navegación real.** Hoy `SideNav` solo resalta la sección. Instala `react-router` y haz que cada enlace cambie la página dentro de `DashboardLayout`.
2. **Pantalla Archivo de especímenes.** Usa `MediaList`, `Pagination` y `Tag` para listar especímenes.
3. **Datos de la API.** Reemplaza `resurrections` por datos de `https://pokeapi.co/api/v2/pokemon?limit=3` con `useEffect` + `fetch`, mostrando `Spinner` mientras carga.
4. **Energía que se gasta.** Mueve `labStatus.energy` a estado en `DashboardPage` y resta 15 al iniciar el protocolo. Pista: el `Topbar` necesitará recibirlo por props (o un Context, como el de los toasts).
