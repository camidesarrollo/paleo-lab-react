# Requerimiento 1: el sistema de expedientes forenses

> *"Empieza por hacer que un solo expediente sea extraordinariamente divertido."*
> — [requerimientos.md](requerimientos.md), recomendación final

Este es el corazón del juego (sección 3 de los requerimientos): el jugador recibe un expediente de una especie desconocida, analiza evidencias, propone una identidad y el sistema valida, puntúa y revela.

## Qué cubre y qué no

Criterios del MVP (sección 11) y su estado:

| Criterio | Estado |
|---|---|
| Comenzar un expediente sin conocer la identidad objetivo | ✅ |
| Pistas que se desbloquean de forma controlada y coherente | ✅ En orden, cada una con su coste |
| Validar respuestas con mayúsculas, espacios y formas de escritura | ✅ `normalizeName` |
| Los errores y las ayudas afectan a la puntuación | ✅ `computeScore` |
| Resolver revela la especie y registra la resurrección | ✅ Revela y clasifica. *Registrar en el archivo* llega con la persistencia |
| Probar sin depender de la API, con datos controlados | ✅ 3 casos de prueba + 20 tests |
| El progreso sobrevive al cerrar la app | ⏳ Requerimiento siguiente (localStorage) |
| Errores de PokeAPI no bloquean la partida | ⏳ Cuando se conecte PokeAPI |

Para probarlo: `npm run dev` → botón **"Abrir expediente [iniciar protocolo de excavación]"** del laboratorio.

---

## La idea más importante: separar reglas e interfaz

La sección 8 de los requerimientos lo dice así: *"PokeAPI no debe controlar directamente las reglas del juego. La API entrega datos; el sistema de dominio los convierte en expedientes, pistas, validaciones, puntuaciones y recompensas."*

Por eso el código está en tres capas:

```
src/features/investigation/
├─ domain/                 ← REGLAS: TypeScript puro, sin React
│  ├─ types.ts             ← la forma de los datos
│  ├─ normalize.ts         ← "  KÁBUTO " → "kabuto"
│  ├─ scoring.ts           ← fórmula de puntuación y clasificación
│  ├─ investigation.ts     ← qué pasa con cada acción del jugador
│  ├─ sprites.ts
│  └─ *.test.ts            ← tests de todo lo anterior
├─ data/                   ← DATOS
│  ├─ cases.ts             ← catálogo público (solo pistas)
│  └─ answer-key.ts        ← respuestas (separadas)
├─ hooks/
│  └─ useInvestigation.ts  ← PUENTE entre reglas y React
├─ components/             ← INTERFAZ: solo muestran y avisan
│  ├─ CaseHeader.tsx
│  ├─ EvidenceFragmentCard.tsx
│  ├─ IdentitySignal.tsx
│  ├─ HypothesisForm.tsx
│  └─ ResurrectionResult.tsx
└─ InvestigationPage.tsx   ← arma la pantalla
```

Ventaja práctica: **las reglas se probaron con tests antes de que existiera un solo botón.** Si mañana cambias la fórmula de puntuación, cambias `scoring.ts` y los tests te dicen si rompiste algo, sin abrir el navegador.

---

## Paso 1: los tipos ([types.ts](../src/features/investigation/domain/types.ts))

Se partió del modelo de la sección 10 de los requerimientos, con dos decisiones:

**1. El caso público no tiene la respuesta.** `InvestigationCase` tiene número, dificultad, fragmentos e intentos, pero no `targetPokemonId` ni nombre. La identidad vive en otro tipo, `Revelation`, que solo se entrega al terminar.

**2. El puntaje no se guarda: se calcula.** `InvestigationState` guarda *qué pasó* (fragmentos revelados, hipótesis falladas). El puntaje se deriva de eso.

```ts
// ❌ Guardar el puntaje: hay que acordarse de actualizarlo en cada acción
{ score: 70, revealedFragmentIds: [...], wrongGuesses: [...] }

// ✅ Calcularlo: imposible que quede desincronizado
const score = computeScore(caseData, state)
```

> 💡 **Regla general de React:** si un dato se puede calcular a partir de otros, no lo guardes en el estado.

---

## Paso 2: normalizar respuestas ([normalize.ts](../src/features/investigation/domain/normalize.ts))

El criterio pide aceptar *"diferencias de mayúsculas, espacios y formas admitidas de escritura"*. La estrategia: llevar todo a una **forma canónica** y comparar esa forma.

```ts
input
  .normalize('NFD')                 // "é" → "e" + "´"
  .replace(/\p{Diacritic}/gu, '')   // quita las tildes
  .toLowerCase()
  .replace(/♀/g, 'f').replace(/♂/g, 'm')
  .replace(/[^a-z0-9]/g, '')        // quita espacios, puntos, guiones, apóstrofos
```

| Lo que escribe el jugador | Forma canónica |
|---|---|
| `  KÁBUTO ` | `kabuto` |
| `Mr. Mime` / `mr-mime` | `mrmime` |
| `Farfetch'd` | `farfetchd` |
| `Nidoran♀` | `nidoranf` (igual que `nidoran-f` de PokeAPI) |

Para aceptar nombres alternativos (por ejemplo, el nombre en japonés), basta con agregarlos a `acceptedNames` en la clave de respuestas.

---

## Paso 3: la puntuación ([scoring.ts](../src/features/investigation/domain/scoring.ts))

La sección 5 pide una fórmula *"determinista y fácil de explicar"*:

```
puntaje = 100 − (coste de los fragmentos analizados) − 20 × (hipótesis fallidas)   (mínimo 0)
```

| Fragmento | Coste |
|---|---|
| A — Biometría | 0 (gratis desde el inicio) |
| B — Firma elemental | 10 |
| C — Registro fósil | 20 |
| D — Eco residual (opcional) | 30 |

**Clasificación:**

| Resultado | Condición | Ejemplo |
|---|---|---|
| Perfecta | ≥ 80 pts **y** sin errores | Solo A + B y acertar: 90 |
| Estable | ≥ 50 pts | A + B + C y acertar: 70 |
| Asistida | < 50 pts | Todos los fragmentos: 40 |
| Degradada | Sin intentos | — |

Los umbrales están en la constante `SCORING`: para equilibrar el juego se cambian ahí, en un solo lugar.

---

## Paso 4: las reglas como reducer ([investigation.ts](../src/features/investigation/domain/investigation.ts))

Un **reducer** es una función con esta forma:

```ts
(estadoActual, acción) => estadoNuevo
```

Las tres acciones del jugador:

```ts
type InvestigationAction =
  | { type: 'reveal-next' }                      // analizar el siguiente fragmento
  | { type: 'submit'; hypothesis: string }       // proponer una identidad
  | { type: 'reset' }                            // repetir el caso
```

Es una **función pura**: con el mismo estado y la misma acción, siempre devuelve lo mismo. No modifica el estado anterior (crea uno nuevo con `...state`), no usa la red y no toca el DOM.

Las reglas de diseño de los requerimientos quedan escritas como código:

| Regla (requerimientos.md) | En el reducer |
|---|---|
| Pistas progresivas | `nextLockedFragment` devuelve el primer fragmento no revelado, por `order` |
| Intentos limitados | `attemptsUsed < caseData.maxAttempts` |
| *"El fracaso no debería bloquear"* | Al agotar intentos: `status: 'failed'` y **se revelan todas las pistas** |
| *"Debe enseñar algo"* | El caso fallido muestra igual la especie y las evidencias |
| Coherencia | Un caso terminado ignora más acciones |
| Equidad | Repetir una hipótesis ya descartada **no** gasta otro intento |

---

## Paso 5: tests ([investigation.test.ts](../src/features/investigation/domain/investigation.test.ts))

Como las reglas son funciones puras, probarlas es simple: crear un estado, aplicar acciones y revisar el resultado.

```ts
it('una hipótesis incorrecta gasta un intento y resta 20 puntos', () => {
  const state = play(guess('Omanyte'))
  expect(attemptsLeft(caseData, state)).toBe(2)
  expect(computeScore(caseData, state)).toBe(80)
})
```

```bash
npm test             # ejecuta los tests una vez
npm run test:watch   # los vuelve a ejecutar al guardar un archivo
```

Hay un test especialmente importante para este juego:

```ts
it('el estado inicial no contiene la respuesta', () => {
  expect(JSON.stringify(createInvestigation(caseData)).toLowerCase()).not.toContain('kabuto')
})
```

Si algún día alguien agrega el nombre al estado por error, este test falla.

---

## Paso 6: proteger la respuesta ([answer-key.ts](../src/features/investigation/data/answer-key.ts))

La sección 9 advierte: *"No se debe enviar al navegador la ficha completa del Pokémon para luego esconderla únicamente mediante CSS."*

En esta versión, que corre solo en el navegador:

- `cases.ts` tiene solo las pistas, redactadas para no nombrar la especie.
- `answer-key.ts` tiene las respuestas, y **ningún componente lo importa**. Solo lo usan:
  - el dominio, para validar (`isCorrectHypothesis`);
  - el hook, para pedir la `Revelation` **cuando el caso terminó**.
- El sprite se pide recién al revelar. Una URL con el número del Pokémon en el HTML desde el inicio arruinaría el misterio.

> ⚠️ **Límite honesto:** esto evita revelaciones *accidentales* en la interfaz, pero alguien que inspeccione el código JavaScript puede encontrar las respuestas. Para clasificaciones competitivas, la validación tendrá que hacerse en un servidor (Fase 4).

---

## Paso 7: el puente con React ([useInvestigation.ts](../src/features/investigation/hooks/useInvestigation.ts))

`useReducer` es como `useState`, pero para estado con reglas:

```ts
const [state, dispatch] = useReducer(reducer, caseData, createInvestigation)
dispatch({ type: 'reveal-next' })   // React llama al reducer y vuelve a dibujar
```

El hook esconde esos detalles y le da a la interfaz funciones con nombre claro y datos ya calculados:

```ts
const { state, score, attemptsLeft, rank, revelation, revealNext, submit, reset } = useInvestigation(caseData)
```

Los componentes no saben que existe un reducer: solo llaman a `submit('kabuto')`.

---

## Paso 8: la interfaz

Cada componente nuevo reutiliza piezas que ya existían:

| Componente | Reutiliza | Qué muestra |
|---|---|---|
| [CaseHeader](../src/features/investigation/components/CaseHeader.tsx) | `Card`, `Tag`, `Stat`, `SegmentMeter`, `ProgressBar` | Número, estado, intentos (bloques) y puntuación potencial |
| [EvidenceFragmentCard](../src/features/investigation/components/EvidenceFragmentCard.tsx) | `Panel`, `Tag`, `Stat`, `Button`, `Icon` | Un fragmento en 4 estados: revelado, siguiente, bloqueado, no usado |
| [IdentitySignal](../src/features/investigation/components/IdentitySignal.tsx) | `CrtViewport` | `?` bloqueado o el sprite con la animación `animate-resurrect` |
| [HypothesisForm](../src/features/investigation/components/HypothesisForm.tsx) | `CommandInput`, `Button` | Campo `ID_ESPECIE:>` y botón |
| [ResurrectionResult](../src/features/investigation/components/ResurrectionResult.tsx) | `Card`, `Tag`, `Stat`, `Button` | Ficha final con clasificación |
| Registro de evidencias | `LogStream` | Cada evento del caso, con color por tipo |

**Dónde vive cada estado:**

- El **texto que se está escribiendo** vive en `HypothesisForm`: a nadie más le importa cada tecla.
- El **estado de la investigación** vive en el hook, dentro de `InvestigationPage`.
- **Qué caso está abierto** vive en `App`.

**El truco de `key` para reiniciar:**

```tsx
<InvestigationPage key={activeCase.id} caseData={activeCase} … />
```

Al pasar al siguiente expediente cambia la `key`, así que React descarta la página anterior y crea una nueva con el estado limpio. Sin `key`, el caso 002 heredaría los fragmentos revelados del 001.

**La animación de resurrección** ([index.css](../src/index.css)):

```css
@keyframes resurrect {
  from { opacity: 0; filter: grayscale(1) brightness(3) blur(6px); clip-path: inset(0 0 100% 0); }
  to   { opacity: 1; filter: none; clip-path: inset(0 0 0 0); }
}
```

La imagen se "escanea" de arriba a abajo (`clip-path`), de blanco quemado y borrosa a nítida y en color, en 16 pasos (`steps(16)`) para que parezca un monitor viejo y no una transición suave.

---

## Cómo agregar un expediente nuevo

1. En [cases.ts](../src/features/investigation/data/cases.ts), copia un caso y cambia `id`, `number` y los fragmentos.
2. En [answer-key.ts](../src/features/investigation/data/answer-key.ts), agrega la respuesta con el **mismo `id`**.
3. Revisa que ninguna pista nombre la especie, ni siquiera parcialmente.
4. Ejecuta `npm test`.

---

## Ejercicios

1. **Energía del laboratorio.** La sección 5 dice que cada error consume energía. Agrega un recurso `energy` que baje con cada hipótesis fallida y bloquee el análisis cuando llegue a 0. Empieza por un test.
2. **Revisión del caso.** Al terminar, muestra qué pista fue la más reveladora (*"Revisión del caso"*, sección 3).
3. **Nombres alternativos.** Haz que `Kabuto` también acepte su nombre japonés `カブト`. ¿Qué pasa con `normalizeName`? Pista: el `[^a-z0-9]` borra los caracteres japoneses.

## Siguientes requerimientos sugeridos

1. **Guardado local:** que el progreso sobreviva al cerrar la app (`localStorage` con versión, sección 10).
2. **Generar expedientes desde PokeAPI:** un servicio que convierta `/pokemon/{id}` y `/pokemon-species/{id}` en un `InvestigationCase`, sin filtrar el nombre en las pistas.
3. **Archivo de resucitados:** la pantalla 03, con las especies resueltas.
