# PALEO-LAB

## El último guardián de la Pokédex

Videojuego de investigación, deducción y restauración de datos inspirado en el universo Pokémon.

# 1. Concepto del juego

## La premisa

El mundo Pokémon ha sufrido un acontecimiento conocido como El Colapso de los Datos: un cataclismo digital que destruyó la Pokédex Nacional y fragmentó los registros de miles de especies.

Los nombres desaparecieron. Las imágenes quedaron corrompidas. Los movimientos perdieron sus propietarios y las cadenas evolutivas se separaron de sus registros originales.

El jugador asume el papel del último paleontólogo de la Liga Pokémon, responsable de reactivar un laboratorio de investigación abandonado y reconstruir el archivo biológico perdido.

Su única fuente de información es una red de datos parcialmente funcional conectada a PokeAPI.

Cada expediente contiene evidencias incompletas: características físicas, estadísticas, tipos elementales, movimientos, registros de hábitat, relaciones evolutivas y señales de audio. Ninguna pista garantiza por sí sola la identificación correcta.

La misión no consiste en capturar Pokémon, sino en descubrir qué especies sobrevivieron al colapso y devolverles su identidad.

A medida que avanza la investigación, el jugador descubre que algunos registros no se perdieron accidentalmente. Alguien manipuló la información para borrar de la memoria colectiva a una especie concreta.

Y el laboratorio conserva las pruebas.

## Identidad del producto

Género

Aventura narrativa, puzzles de deducción, investigación científica ficticia y colección.

Mecánica principal

Identificar Pokémon desconocidos mediante pistas progresivas obtenidas de datos reales de PokeAPI.

Elemento diferenciador

Convertir estadísticas, sonidos, movimientos y evoluciones en pruebas que el jugador debe interpretar, no simplemente consultar.

Objetivo a largo plazo

Reconstruir la Pokédex, recuperar el laboratorio y resolver el misterio detrás del borrado de una especie legendaria.

# 2. El bucle principal de juego

La experiencia debe seguir un ciclo fácil de entender, pero con suficiente profundidad para mantener el interés.

01

Recibir un expediente

Una especie desconocida genera una señal de datos incompleta.

02

Analizar las evidencias

El jugador examina características, tipos, movimientos y sonidos.

03

Formular una hipótesis

Introduce el nombre de la especie o selecciona una posible identidad.

04

Verificar la identificación

El sistema valida la respuesta y calcula la calidad de la investigación.

05

Resucitar la especie

Se restaura su imagen, su ficha y su lugar en el archivo.

06

Desbloquear nuevas investigaciones

Se recuperan herramientas, regiones, cadenas evolutivas y pistas narrativas.

La clave es que cada decisión del jugador tenga una consecuencia. Solicitar otra pista reduce la puntuación potencial; resolver un expediente con pocas ayudas otorga una mejor clasificación; completar una cadena evolutiva aporta información para futuras investigaciones.

El fracaso no debería bloquear al jugador. Debe consumir recursos, revelar información y enseñar algo sobre la especie investigada.

# 3. El sistema de expedientes forenses

Esta es la mecánica central y la que debe recibir la mayor atención durante el desarrollo.

Cada Pokémon tiene un expediente que se genera a partir de datos reales de PokeAPI. Al comenzar, el sistema selecciona una especie objetivo y construye un conjunto de pistas de dificultad creciente.

El nombre, el sprite y cualquier dato que revele directamente la respuesta permanecen ocultos hasta completar la investigación.

## Ejemplo de un expediente

EXPEDIENTE 001

ESTADO: INESTABLE

# Identidad desconocida

Se ha recuperado un registro biológico parcialmente dañado.

SEÑAL BIOMÉTRICA DETECTADA

Identidad y representación visual bloqueadas

Fragmento A — Biometría

Altura, peso y distribución de características físicas.

Disponible desde el inicio.

Fragmento B — Firma elemental

Tipos elementales y patrones de estadísticas base.

Se desbloquea al analizar la primera evidencia.

Fragmento C — Registro fósil

Movimientos compatibles, comportamiento y datos de especie.

Disponible mediante el análisis avanzado.

Fragmento D — Eco residual

Reproducción del grito original con distorsión de audio.

Evidencia opcional de alta dificultad.

Proponer una identidad

Analizar hipótesis

Demostración conceptual: la validación real se implementará en el juego contra los datos de PokeAPI.

### Reglas que hacen interesante la deducción

- Pistas progresivas: el jugador decide cuándo necesita más información.
- Intentos limitados: cada error consume energía de laboratorio.
- Puntuación por eficiencia: resolver con menos pistas aumenta la recompensa.
- Ayudas contextualizadas: las pistas adicionales deben reducir la incertidumbre, no limitarse a mostrar datos aleatorios.
- Revelación final: una animación reconstruye la especie, muestra su sprite y presenta su ficha completa.
- Revisión del caso: después de resolverlo, el jugador puede consultar las evidencias y entender por qué la respuesta era correcta.

Un detalle importante: los datos de la API deben procesarse antes de mostrarse. Si se oculta el nombre, pero se presenta una URL con el nombre de la especie o un recurso que la identifica directamente, el misterio desaparece.

# 4. Las cinco mecánicas que definen PALEO-LAB

## 4.1. Cries Lab: el laboratorio de gritos

[Whispers in White Noise | Criminal](https://images.openai.com/static-rsc-4/tavbviPcKDfK2JnWUsyX6QJyk6nEbJCd8vX9_gdowAGszCbw2CAsEvrn-2E0AmF008d4an21SBtSDP3ntsP8yUFhDzNoDClmDNsrZtPZRamA3t7QeCsj6Fuhfo-DDeW05g8D4duSnY44zFigjVw3ZNMMLQdvfNmy0T4-zZbEbnc?purpose=inline)

[vocal.media](https://vocal.media/criminal/whispers-in-white-noise?utm_source=chatgpt.com)

El jugador escucha el grito de una especie desconocida y debe identificarla utilizando su memoria auditiva.

La dificultad no depende únicamente de bajar el volumen. El sistema puede modificar el audio mediante procesamiento de señal:

- Alteración moderada de la velocidad o del tono.
- Ruido de fondo y filtrado de frecuencias.
- Reproducción de segmentos cortos.
- Superposición de interferencias ficticias.
- Comparación de dos señales para determinar si pertenecen a la misma especie.

Cada ronda debe permitir reproducir el sonido varias veces, pero con una puntuación que dependa de cuántas ayudas se soliciten.

Regla de diseño: la distorsión debe conservar suficientes características reconocibles para que el reto sea difícil, pero justo.

En la implementación, los gritos disponibles y sus formatos deben verificarse en los datos reales de PokeAPI. El procesamiento puede realizarse mediante Web Audio API, sin necesidad de descargar archivos de audio adicionales.

## 4.2. Evolution Lab: reconstrucción de cadenas evolutivas

[Civ 7 Civilizations Ranked: Unique Abilities, Tech Paths & Victory Strategies](https://images.openai.com/static-rsc-4/VrxvQGseUCH1dnsw-2SQo9-3hU3eAv4jTe7iGKRWGRZ13u0oBCnaLXkgDKRTKJLl_2M1ubqUclvnmtNMhMxMrfZRldQAF36yzdLfHWsP3dW4JNOcSjRda-cymCg_laKMexXAlHzxDnspTlKIVEtxyrBRs29Qdy0mmfivPXeJ9j8?purpose=inline)

[nowloading.co](https://nowloading.co/civ-7-civilizations-ranked-unique-abilities-tech-paths-and-victory-strategies?utm_source=chatgpt.com)

Las cadenas evolutivas aparecen incompletas. El jugador debe reconstruir sus relaciones y determinar qué condiciones permiten pasar de una etapa a otra.

El sistema utiliza la estructura de `/evolution-chain/{id}` para obtener las relaciones entre especies y las condiciones de evolución.

Los desafíos pueden incluir:

- Identificar la evolución anterior o posterior.
- Ordenar los estadios evolutivos.
- Asociar piedras, niveles u otras condiciones cuando corresponda.
- Reconstruir ramas evolutivas alternativas.
- Resolver cadenas con evoluciones que no dependen de un nivel tradicional.

Completar una cadena concede una bonificación y puede desbloquear expedientes relacionados.

Es importante no asumir que todas las especies tienen una cadena lineal: existen ramas, evoluciones especiales y especies que no evolucionan.

## 4.3. Migration Lab: mapa de hábitats

[Holo_Map on Behance | Holo, Sci-fi ui, Space map](https://images.openai.com/static-rsc-4/IhviOAzepfchgpDsiSDJMr1UYiaPNAv9pOeomJSlqmzHRdP5RWV6iVTRoCk6JktAoJmt2I9Jg9fmmQMJ7BzQ6HYzlQuu7V-iwhusK0vvA92Vm9Cf_DY-RLb-a6AgLZMVbkj989HSwBBIG9RnuDgYxBcjJ7dFbFSiYUPCP3K6aMo?purpose=inline)

[pinterest.com](https://www.pinterest.com/pin/420101471487227095/?utm_source=chatgpt.com)

La recuperación de una especie no termina cuando se descubre su identidad. También hay que reconstruir su relación con el entorno.

El jugador recibe registros de encuentros, datos de especie y pistas ambientales, y debe asignar la especie a la región o al hábitat que corresponda dentro del modelo de juego.

Las ubicaciones de encuentro disponibles mediante `/pokemon/{id}/encounters` dependen de los juegos y registros soportados por la API. Por eso, el mapa debe distinguir entre datos documentados y hábitats inferidos por la narrativa.

La progresión se basa en objetivos como:

- Restaurar una región con un número mínimo de especies.
- Identificar patrones entre especies de tipos concretos.
- Completar grupos de especies vinculadas a una zona.
- Desbloquear nuevas expediciones mediante la recuperación de registros suficientes.

## 4.4. Nursery Lab: herencia de evidencias

Este modo avanzado permite generar expedientes relacionados con grupos huevo, evoluciones y características compartidas.

En vez de simular una crianza completa, el prototipo puede utilizar estas relaciones como una mecánica de deducción: el jugador conoce una especie y debe inferir qué pistas podrían aparecer en un expediente relacionado.

La idea es interesante, pero la dejaría para una segunda fase. No es necesaria para demostrar el valor principal del juego y añade complejidad a la generación de casos.

## 4.5. Anomalías: expedientes corruptos

Esta sería una mecánica adicional que reforzaría la identidad narrativa.

De vez en cuando, el jugador encuentra un expediente que contiene datos contradictorios:

- Un tipo elemental que no coincide con los movimientos registrados.
- Una cadena evolutiva con una relación aparentemente imposible.
- Un registro duplicado con identificadores diferentes.
- Un grito asociado a una especie incorrecta.
- Una ficha de especie cuyo contenido textual ha sido alterado.

El objetivo no es solamente identificar un Pokémon, sino determinar qué dato está corrupto y reconstruir el registro coherente.

Esto permite aprovechar la API como fuente de información para puzzles de consistencia, no solo para preguntas de identificación.

# 5. Progresión y economía del laboratorio

El juego necesita una progresión que tenga sentido tanto mecánico como narrativo.

| Recurso                   | Función                                                             |
| ------------------------- | ------------------------------------------------------------------- |
| Energía de laboratorio    | Limita los análisis adicionales y penaliza los intentos fallidos.   |
| Créditos de investigación | Recompensan expedientes resueltos y permiten adquirir herramientas. |
| Integridad de datos       | Representa la calidad del registro reconstruido.                    |
| Nivel de investigación    | Desbloquea expedientes y herramientas de mayor complejidad.         |
| Fragmentos recuperados    | Permiten completar registros y acceder a nuevos desafíos.           |

Conviene separar la energía, que puede gastarse, de la puntuación, que mide el rendimiento. De esa forma, un jugador puede equivocarse sin perder permanentemente el progreso.

## Clasificación de las resurrecciones

Resurrección perfecta

Identificación temprana, sin errores y con pocas ayudas.

Resurrección estable

Identificación correcta después de analizar varias evidencias.

Resurrección asistida

Se utilizaron varias ayudas o se agotaron intentos antes de acertar.

La fórmula de puntuación debe ser determinista y fácil de explicar. Por ejemplo, partir de 100 puntos y descontar por errores y pistas solicitadas, con un mínimo de cero. Las bonificaciones por completar cadenas evolutivas pueden sumarse después, respetando un límite definido.

# 6. La narrativa: una historia que se descubre jugando

El misterio central no debería aparecer solamente en un texto al final. Debe estar integrado en los expedientes.

Cada especie resucitada aporta un fragmento de información sobre el colapso. Algunos registros contienen referencias anómalas; otros, descripciones incompletas o señales de modificaciones deliberadas.

La historia puede dividirse en cuatro actos.

[Stream Broken Lab by BackRunner | Listen online for free on SoundCloud](https://images.openai.com/static-rsc-4/w0-vwjZU9znSfsulOVdpJWIZqx5UGErOS9s0dCxAPVbWSFM9tJ8HLMa2PD0uOMZZSSPGzJd2G7-pW8Q3fOtJeBn9E1IYgwS_fU_XN117iOXRQg0zetaSue7AM3njqXmXuG8Drxmh2eQkBeqau48V7jrGoUo70o-RsYEuWO3RRcM?purpose=inline)

ACTO I

Reactivar el laboratorio

El jugador restaura los sistemas básicos, aprende a analizar expedientes y recupera las primeras especies.

[Movie Choose Your Own Documentary and the Illusion of Control - tasteray.com](https://images.openai.com/static-rsc-4/ezlnUGpfZRnKt849Q87gHQla5rmAx6-rcLTWgF55mwpzz-9Tc47r3WwWMDJXET-8kzbaA59rUYB1IoRcsIYdQL_lgYxp9csREZRn2m0nKAmQbXFe5oGEb0Vi-qn28OourLcNud6tt2QTtrqLE6pN1VZSGj3H2cGph_qZbbKmmuk?purpose=inline)

ACTO II

Las inconsistencias

Aparecen datos que no coinciden entre sí. Las primeras anomalías revelan que alguien alteró el archivo.

[The Quantum Veil | Futurism](https://images.openai.com/static-rsc-4/hdRLL2hu57ali20rl-UV-zYOp8rWcCDrWpw3nNeDBpC2HgxJeZFm1pxBuuU4ba-h3k8jlHqqTJRJciRfsn7xm4Z85ZDcq2klqQs7712wZR_4vgtsMDm4P0LjxdKbm_knUr8r1GHcO1V3HG0KTyLUc0Td5uasyB6XZezvxQaWdPA?purpose=inline)

ACTO III

El registro prohibido

Una parte significativa de la Pokédex está reconstruida y el jugador descubre indicios de un borrado intencional.

[Why Movie Giant Monster Cinema Became Our Modern Myth](https://images.openai.com/static-rsc-4/1LzRgtb-lheJVEPmzeYhjOFjN8zVcTBqoqxbf98Kcb0bVHVJjiyPoMtNQudtPPKp6KUxD0ryW-JtilaF5QhBttbtwy18aKG6fYKJErmINKtSUdEq_qDYZzzJfz_FL0fGm8Qi39K4bhRbMOTC6IHSw_Z1-k_-uIxrxMjnkMrS1WQ?purpose=inline)

ACTO IV

La última resurrección

El último expediente contiene una señal de audio, una silueta y una estructura evolutiva incompleta. La decisión final determina el destino del registro.

La historia puede desbloquearse mediante umbrales de progreso, por ejemplo, al recuperar el 10 %, 25 %, 50 % y 100 % de los expedientes disponibles en la versión del juego.

No es necesario exigir la reconstrucción de toda la Pokédex Nacional para terminar la historia principal. Una campaña limitada puede ofrecer una experiencia completa y, al mismo tiempo, dejar una progresión adicional para quienes quieran seguir investigando.

# 7. Diseño de las pantallas

La interfaz debería parecer una herramienta científica que está recuperando sus sistemas, no un catálogo convencional de Pokémon.

[Futuristic control room Images - Free Download on Magnific (formerly Freepik)](https://images.openai.com/static-rsc-4/8tQeDtJOcXpMmiRra4Fq4JPSr9Oi3Qq4jvQ5LaA7raSZB5BO1sIxWoqq6hb8yLA1TbgwBPn17b_34J3SK6FhAB5vNdbfAsKO9Xdsifbbq93cP7ZkMcB5GVr1Ndo23tEdvoa4AnTRWevuUwPNskHl61yJEzpwtGO718LLp8Yi0NY?purpose=inline)

01\. Centro de operaciones

Panel con porcentaje de archivo recuperado, energía, nivel de investigación, actividad reciente y expedientes pendientes.

[Alien Morgue - Info, Tip, Walkthrough, Glitch](https://images.openai.com/static-rsc-4/lrIXxeb1h9RB9yKlBXEcyLk3LiVz7NZb7J0PNVRZCOE8SLlbtesI3aZVOtuSopLxsWsy9sjLQMhATMQ66Ert73PdNjqWwkyxBZRzf_mAvRA9eCG7s1rb4mQJA_7WuR2v-wvW0p6JeM77S3CEeDIP_5f5g6vjdCv1iW7df1Crv_I?purpose=inline)

02\. Expediente activo

Zona principal de investigación, fragmentos desbloqueables, formulario de hipótesis, intentos restantes y registro de evidencias.

[Databank | Subnautica Wiki | Fandom | Subnautica creatures, Alien creatures, Light background images](https://images.openai.com/static-rsc-4/vVScXEO_lSFgJIH3DQ2AvyPPTKUl_0SYM6AmPvE9kYDwSKJbuhCU6iJSkwU-3W1jwSeK1yIOO1c3JiwVXHr914svy__eTdDImFPaAmA-OH16z26pqpxw8utDgIuNAliFAeRKMVat-S6UXPx7lp4NtcD47rjFTfvAyoaVNg7KMeM?purpose=inline)

03\. Archivo de resucitados

Colección organizada por dificultad, calidad de reconstrucción, tipo de evidencia y relaciones evolutivas, sin orden alfabético predeterminado.

[Bot Verification](https://images.openai.com/static-rsc-4/q7AFnoPTBXpu3x1U0udk3C6UeNc6XVnZDV-HfSB2HU1j2Psk6sA9S9DbVPIayzOokaOIPudkH5uxoElbJsKyNZEOHhuUdbwx_5iURYtSm7NEGUXp6UH58CWakQiCGfemlUJ0KwBl7GfyPbDs5ARR69FUAVTnkmdL2Vfoq-ISx1g?purpose=inline)

04\. Sala de gritos

Desafío independiente de cinco rondas con dificultad creciente, puntuación acumulada y récord local.

[Map, Guides, Co-op & Early Access | Subnautica 2 Wiki](https://images.openai.com/static-rsc-4/v0cz1yu8F-xRShDo1SqFfQmqTqkTSNVL4vZVHEPH26xYAGdZLTSzvVsmbklPVsjLNN7bZbwF8k1Z3qFjx-VPB_zFzVjS1bVe3To_snDkq65QHkstL2y9uSjKLQoKbCcX-skMzLyImFh29TZL0ggCNP7NkZUXWywaB3J475VTDk0?purpose=inline)

05\. Mapa de regiones

Mapa interactivo que se desbloquea después de diez resurrecciones. Permite resolver retos de hábitat y explorar conexiones entre especies.

# 8. Arquitectura técnica propuesta

Para que el proyecto sea factible, conviene separar los datos externos, las reglas del juego y la interfaz.

Mi recomendación para una primera versión es Next.js con TypeScript, porque permite organizar las pantallas, las rutas y los componentes dentro de un mismo proyecto. React con Vite también es una alternativa válida si prefieres una aplicación exclusivamente cliente.

## Stack recomendado

| Capa                 | Tecnología                   | Responsabilidad                                      |
| -------------------- | ---------------------------- | ---------------------------------------------------- |
| Aplicación           | Next.js + React + TypeScript | Pantallas, rutas y componentes.                      |
| Estilos              | Tailwind CSS                 | Diseño adaptable y sistema visual.                   |
| Animaciones          | Motion para React            | Transiciones, análisis y resurrecciones.             |
| Estado               | Zustand                      | Expedientes, progreso, recursos y colección.         |
| Datos remotos        | TanStack Query               | Caché, peticiones y estados de carga.                |
| API externa          | PokeAPI                      | Datos de especies, movimientos, tipos y evoluciones. |
| Audio                | Web Audio API                | Reproducción y transformación de gritos.             |
| Persistencia inicial | localStorage                 | Progreso local y puntuaciones.                       |
| Persistencia futura  | Supabase                     | Perfiles, sincronización y clasificación remota.     |

No es necesario instalar todas las dependencias desde el primer día. La arquitectura debe responder a las necesidades reales de cada fase.

## Cómo organizar el código

```

src/
├── app/
│   ├── page.tsx
│   ├── expedientes/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── archivo/page.tsx
│   ├── laboratorio-de-gritos/page.tsx
│   └── mapa/page.tsx
├── features/
│   ├── investigation/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── domain/
│   │   └── services/
│   ├── evolution/
│   ├── audio/
│   ├── migration/
│   └── resurrection/
├── components/
│   ├── ui/
│   ├── laboratory/
│   └── layout/
├── lib/
│   ├── pokeapi/
│   ├── audio/
│   └── storage/
├── stores/
│   └── game-store.ts
└── types/
    ├── pokemon.ts
    ├── investigation.ts
    └── progression.ts

```

La regla arquitectónica más importante es que PokeAPI no debe controlar directamente las reglas del juego. La API entrega datos; el sistema de dominio los convierte en expedientes, pistas, validaciones, puntuaciones y recompensas.

Esto permite cambiar las reglas sin modificar la integración externa y facilita las pruebas automatizadas.

# 9. Integración inteligente con PokeAPI

Los endpoints deben seleccionarse según la función que cumplen en la investigación.

| Endpoint                        | Utilidad dentro del juego                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| `/pokemon/{id or name}`         | Tipos, estadísticas, habilidades, movimientos, medidas, sprites y gritos disponibles.          |
| `/pokemon-species/{id or name}` | Descripciones, hábitat cuando está informado, grupos huevo y referencia a la cadena evolutiva. |
| `/evolution-chain/{id}`         | Estructura del árbol evolutivo y condiciones de evolución.                                     |
| `/pokemon/{id}/encounters`      | Registros de ubicaciones y métodos de encuentro documentados.                                  |
| `/location/{id or name}`        | Información de ubicaciones y zonas disponibles en la API.                                      |

### Tres decisiones técnicas importantes

1\. Generar pistas sin revelar la respuesta.

El servidor o la lógica del juego debe conservar la identidad objetivo separada de las pistas visibles. No se debe enviar al navegador la ficha completa del Pokémon para luego esconderla únicamente mediante CSS.

En una versión local sin backend, esto será una barrera contra la revelación accidental en la interfaz, no una protección contra alguien que inspeccione el código o el tráfico. Para una competición con clasificación fiable, la validación debe trasladarse al servidor.

2\. No asumir que todos los datos están disponibles.

Algunos Pokémon pueden carecer de determinados registros, movimientos con un método de aprendizaje específico, encuentros o información de hábitat. La generación de expedientes debe comprobar la disponibilidad de los datos y elegir pistas alternativas.

Además, la información de movimientos depende del juego y de la versión; no conviene presentar un movimiento como aprendido por nivel sin verificar sus datos.

3\. Aplicar caché y normalización.

Las respuestas estáticas de PokeAPI deben almacenarse en caché. También es conveniente normalizar nombres, gestionar errores de red, limitar peticiones redundantes y construir expedientes deterministas para que el mismo caso no cambie cada vez que se renderiza.

Para la progresión, conviene utilizar un catálogo de expedientes con identificadores estables, dificultad y pistas configuradas, en lugar de descargar toda la Pokédex cada vez que se inicia la aplicación.

# 10. Modelo de datos del juego

La información original de PokeAPI y el progreso del jugador deben mantenerse separados.

Un modelo conceptual mínimo sería:

```

type EvidenceType =
  | "biometry"
  | "elemental-signature"
  | "moves"
  | "habitat"
  | "evolution"
  | "cry"
  | "anomaly";

type InvestigationStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "solved";

interface EvidenceFragment {
  id: string;
  type: EvidenceType;
  title: string;
  clue: string;
  unlockCost: number;
  order: number;
}

interface InvestigationCase {
  id: string;
  targetPokemonId: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  fragments: EvidenceFragment[];
  maxAttempts: number;
}

interface InvestigationProgress {
  caseId: string;
  status: InvestigationStatus;
  attemptsUsed: number;
  revealedFragmentIds: string[];
  score: number;
  solvedAt?: string;
}

interface PlayerProgress {
  version: number;
  researchLevel: number;
  laboratoryEnergy: number;
  researchCredits: number;
  solvedCaseIds: string[];
  investigations: InvestigationProgress[];
}

```

Este esquema es una base inicial, no una definición definitiva. El identificador objetivo no debería exponerse al cliente antes de resolver el caso si se quiere evitar que el jugador inspeccione la respuesta.

También conviene versionar el almacenamiento local para poder migrar los datos guardados cuando se incorporen nuevas mecánicas.

# 11. Qué construir primero: alcance realista del MVP

El mayor riesgo de esta idea es intentar implementar simultáneamente cinco modos de juego, una campaña narrativa completa y miles de expedientes.

La solución es construir una primera versión que ya sea divertida con un conjunto pequeño de especies y después ampliar el contenido.

Fase 1 — Prototipo jugable

Prioridad máxima

- Laboratorio principal.
- Entre 20 y 30 expedientes seleccionados.
- Tres niveles de pistas progresivas.
- Entrada de respuestas y validación.
- Sistema de intentos y puntuación.
- Animación de resurrección.
- Guardado local del progreso.

Fase 2 — Identidad propia

- Cries Lab con audio real y filtros.
- Árboles evolutivos interactivos.
- Archivo de resucitados.
- Primeras anomalías narrativas.

Fase 3 — Mundo e investigación avanzada

- Mapa de hábitats.
- Desafíos de consistencia de datos.
- Campaña narrativa por capítulos.
- Nuevas regiones y cadenas evolutivas.

Fase 4 — Persistencia y competición

- Perfiles y sincronización con Supabase.
- Retos diarios.
- Clasificaciones verificadas por servidor.
- Catálogo ampliado y nuevas campañas.

## Criterios para considerar terminado el MVP

La primera versión estará lista cuando:

- El jugador pueda comenzar un expediente sin conocer la identidad objetivo.
- Las pistas se desbloqueen de forma controlada y coherente.
- Las respuestas se validen correctamente, incluyendo diferencias de mayúsculas, espacios y formas admitidas de escritura.
- Los errores y las ayudas afecten a la puntuación.
- Resolver un caso revele la especie y registre la resurrección.
- El progreso sobreviva al cierre y reapertura de la aplicación.
- Los errores de PokeAPI, los registros incompletos y la ausencia de audio no bloqueen la partida.
- Los expedientes puedan probarse sin depender de la disponibilidad permanente de la API, mediante datos de prueba controlados.

# 12. Qué hace que esta versión sea diferente

La mejora más importante es la coherencia entre mecánica, historia y arquitectura.

| Diseño convencional      | PALEO-LAB                                          |
| ------------------------ | -------------------------------------------------- |
| Consultar una ficha.     | Investigar una identidad desconocida.              |
| Ver estadísticas.        | Interpretar evidencias biométricas.                |
| Reproducir un sonido.    | Resolver un desafío de reconocimiento auditivo.    |
| Consultar una evolución. | Reconstruir una relación evolutiva rota.           |
| Navegar por ubicaciones. | Resolver un caso de distribución y hábitat.        |
| Completar una colección. | Recuperar un archivo y descubrir una conspiración. |

La API deja de ser el producto visible y se convierte en el motor de una experiencia de investigación.

La colección es la recompensa; la deducción es el juego; el misterio es la razón para continuar.

## Definición final del producto

# PALEO-LAB: El último guardián de la Pokédex

**PALEO-LAB** es una aventura narrativa de investigación y deducción en la que el jugador debe reconstruir la Pokédex Nacional después de un cataclismo digital que destruyó los registros de miles de especies Pokémon.

Como último paleontólogo de la Liga Pokémon, el jugador trabaja en un laboratorio abandonado y utiliza fragmentos de datos obtenidos de PokeAPI para identificar especies desconocidas. Cada expediente presenta pistas incompletas relacionadas con características físicas, estadísticas, tipos elementales, movimientos, gritos, hábitats y cadenas evolutivas.

El objetivo no es consultar información, sino interpretarla. El jugador formula hipótesis, solicita análisis adicionales, administra recursos y decide cuándo dispone de evidencia suficiente para identificar una especie. Los errores y las ayudas afectan a la puntuación, mientras que las identificaciones eficientes otorgan mejores recompensas y desbloquean nuevas herramientas de investigación.

El juego incorpora cinco sistemas principales: investigación de expedientes, análisis de gritos distorsionados, reconstrucción de cadenas evolutivas, recuperación de hábitats y detección de anomalías en los datos. Estas mecánicas se integran en una campaña narrativa que revela progresivamente las causas del cataclismo.

La progresión transforma el laboratorio a medida que se recuperan especies y registros. El jugador desbloquea expedientes, reconstruye el archivo, restaura regiones y descubre indicios de una manipulación deliberada de la Pokédex. La historia culmina con un expediente excepcional que obliga a decidir el destino de una especie borrada de la memoria colectiva.

El proyecto se desarrollará con React, TypeScript y Next.js, utilizando PokeAPI como fuente de datos, TanStack Query para la gestión de peticiones y caché, Zustand para el estado del juego, Web Audio API para el procesamiento de sonido y almacenamiento local para conservar el progreso.

La primera versión priorizará una experiencia completa de identificación mediante expedientes progresivos, puntuación, resurrección visual y persistencia local. Los modos de audio avanzado, evolución, hábitats y narrativa ampliada se incorporarán gradualmente.

**Principio de diseño:** cada dato debe convertirse en una evidencia, cada evidencia debe ayudar a resolver un misterio y cada misterio resuelto debe acercar al jugador a la verdad sobre el Colapso de los Datos.

PALEO-LAB no es una Pokédex para consultar. Es una Pokédex que el jugador debe reconstruir, comprender y salvar.

Mi recomendación definitiva: empieza por hacer que un solo expediente sea extraordinariamente divertido. Si investigar, deducir y resucitar un Pokémon resulta satisfactorio, tendrás una base sólida para construir el resto del laboratorio sin perder la identidad del juego.