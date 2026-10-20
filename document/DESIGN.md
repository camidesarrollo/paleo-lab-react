---
name: Paleo-Terminal OS
colors:
  surface: '#121416'
  surface-dim: '#121416'
  surface-bright: '#38393c'
  surface-container-lowest: '#0c0e10'
  surface-container-low: '#1a1c1e'
  surface-container: '#1e2022'
  surface-container-high: '#282a2c'
  surface-container-highest: '#333537'
  on-surface: '#e2e2e5'
  on-surface-variant: '#b9ccb5'
  inverse-surface: '#e2e2e5'
  inverse-on-surface: '#2f3033'
  outline: '#849581'
  outline-variant: '#3b4b3a'
  surface-tint: '#00e55b'
  primary: '#edffe8'
  on-primary: '#003911'
  primary-container: '#00ff66'
  on-primary-container: '#007128'
  inverse-primary: '#006e27'
  secondary: '#ffd393'
  on-secondary: '#432c00'
  secondary-container: '#fdaf00'
  on-secondary-container: '#694600'
  tertiary: '#efffe4'
  on-tertiary: '#003a02'
  tertiary-container: '#34ff33'
  on-tertiary-container: '#007207'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff83'
  primary-fixed-dim: '#00e55b'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531b'
  secondary-fixed: '#ffddaf'
  secondary-fixed-dim: '#ffba43'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#614000'
  tertiary-fixed: '#76ff65'
  tertiary-fixed-dim: '#00e61b'
  on-tertiary-fixed: '#002201'
  on-tertiary-fixed-variant: '#005303'
  background: '#121416'
  on-background: '#e2e2e5'
  surface-variant: '#333537'
typography:
  headline-xl:
    fontFamily: Space Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Space Mono
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Space Mono
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.12em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system evokes the tactile, cold, and calculated atmosphere of an abandoned subterranean paleogenetics installation reviving prehistoric entities amid societal collapse. It blends 1980s mainframe CRT hardware aesthetics, early military field telemetries, and cold-war bioscience instruments with heavy-duty durability.

The core visual language relies on tactile retro-futurism:
- High-contrast, emissive phosphorus readouts cut into deep, light-swallowing abyssal surfaces.
- Technical utilitarianism: Dense modular layouts, hard edges, bracketed data frames, telemetry tickers, and monospaced diagnostic matrices.
- Subtle decay and optical realism: Monochromatic scanline patterns, discrete raster glitch states, sub-pixel halos, and CRT phosphor persistence without sacrificing operational legibility.

## Colors

The palette operates on radiation-emissive phosphor primaries suspended over pitch-black graphite and zinc substrates.

- **Primary (`#00FF66` / Terminal Phosphor Green):** Primary readouts, active bioscan plots, DNA reconstruction strands, operational states, and active cursor blinks.
- **Secondary (`#FFB000` / Warning Amber):** Danger flags, fossil extraction anomalies, biohazard levels, thermal warnings, and system overrides.
- **Tertiary (`#33FF33` / Hyper Phosphor):** Glowing focus rings, peak spectral spikes, and secondary matrix highlights.
- **Neutral Dark Base (`#0A0C0E` Void & `#12161A` Graphite Zinc):** Non-reflective optical glass and reinforced chassis tones serving as base canvas and panel backplates.
- **Subdued Wireframes (`#1F292E` / Slate CRT):** Inactive telemetry borders, grid rulers, and passive tick lines.

## Typography

Typography functions as a monospace computer instrument readout. All headers, telemetry flags, and system counters utilize uppercase transformations where applicable.

- **Headlines & Labels:** Rendered in **Space Mono**, instilling an austere mechanical structure reminiscent of punch-card terminals and optical readout lenses.
- **Body & Data Output:** Rendered in **JetBrains Mono**, maximizing optical legibility across high-density numeric matrices, genomic sequence lines, and diagnostic logs.
- **Character Spacing:** Labels and technical annotations leverage generous letter spacing (`0.08em` to `0.12em`) to mirror dot-matrix and CRT grid alignment.

## Layout & Spacing

The layout is built upon an uncompromising, rigid 12-column modular instrument rack. Space is dense and utilized purposefully, prioritizing information visibility over decorative emptiness.

- **Grid Architecture:** Multi-pane diagnostic dashboard layout. Outer shell forms the "chassis frame" housing modular diagnostic pods.
- **Gutter & Module Gaps:** Tight 1rem gutters enforce a physical instrumentation vibe, expanding to 1.5rem on large display interfaces.
- **Screen Margins:** Fixed chassis borders (1rem mobile, 2rem desktop) representing the inner bezel of a cathode-ray viewport.
- **Breakpoints:**
  - **Mobile (< 768px):** Single-column stacked telemetry modules with persistent command-line footer.
  - **Tablet (768px - 1024px):** 2-column split (Specimen Viewport + Diagnostic Metrics).
  - **Desktop (> 1024px):** 12-column multi-monitor lab console with auxiliary telemetry wings and system log stream.

## Elevation & Depth

Visual hierarchy does not use soft drop shadows. Depth is instead rendered through structural casing, layered optical surfaces, and luminous intensity:

- **Surface Levels:**
  - **Base Chasm (`#0A0C0E`):** The deepest layer, representing the recessed CRT tube.
  - **Panel Substrate (`#12161A`):** Raised physical chassis plates with etched borders (`#1F292E`).
  - **Emissive Layer:** Phosphor glows rendered using sharp, dual-stage colored luminescence (`box-shadow: 0 0 6px rgba(0, 255, 102, 0.4), inset 0 0 2px rgba(0, 255, 102, 0.2)`).
- **CRT Glass Treatment:** A persistent scanline overlay (`repeating-linear-gradient` with 2px intervals) and a faint radial vignette simulating the curved glass face of a vintage display screen.
- **Borders:** High-contrast, 1px structural framing with technical corner brackets (`+` or `L`-brackets) rather than ambient shadows.

## Shapes

The interface embraces an industrial, non-rounded form factor (`0px` border radius everywhere). 

- **Hard-Edged Geometry:** Every button, viewport, indicator, and card possesses sharp 90-degree corners.
- **Chiseled & Beveled Accents:** High-priority cards and primary action triggers utilize 45-degree chamfered diagonal cut corners (2px to 6px corner cuts via CSS clip-path) to evoke heavy-duty mil-spec scientific hardware.

## Components

### Buttons
- **Primary Action (Revive / Initialize):** Sharp rectangular housing, solid background (`#00FF66`), inverted void-black text (`#0A0C0E`), accompanied by a persistent faint outer glow. Hover state produces an amber phosphor flip (`#FFB000`) with quick 100ms scan-glitch flicker.
- **Secondary Action (Abort / Vent):** Transparent surface with a 1px solid `#FFB000` border, `#FFB000` text, and bracketed edges (`[ RUN_DIAGNOSTIC ]`).
- **Tactile Switches:** Inset mechanical bevel with two-state LED dot markers (Green = Active, Inactive = Zinc grey).

### Badges & Chips
- **Fossil DNA / Status Tags:** High-density, monospaced caps framed inside structural brackets: `[STATUS: FOSSILIZED]` or `[THREAT: APEX]`. Solid amber or green backgrounds denote severity, using inverted black text.

### Cards & Telemetry Pods
- **Diagnostic Cells:** Framed in 1px `#1F292E` borders with corner crosshairs (`+`). Header displays an isolated uppercase metadata strip (e.g., `SEC-04 // INCUBATOR_01`).
- **Phosphor Graph Panels:** Rendered with coordinate ticks along the X and Y axes, displaying live vector waves or DNA sequence matrices.

### Input Fields
- **Command Line Prompts:** Flat `#0A0C0E` field with an unbroken bottom rule or structural perimeter in `#00FF66`. Begins with an active system prompt prefix (`SYS_ROOT:> `) and features a square blinking terminal cursor.

### Checkboxes & Radios
- **Data Toggles:** Monospaced binary markers (`[ ]` unselected, `[X]` active selected) enclosed in rigid, glowing bounding boxes.

### Specialized Paleo-Lab Components
- **Specimen DNA Helix Bar:** Segmented loading bar displaying base-pair integrity percentages with missing sequence gaps highlighted in pulsating warning amber (`#FFB000`).
- **Audio/Vocal Synthesis Waveform:** Oscilloscope line graph displaying reconstructed acoustic calls of prehistoric entities.
- **Cryo-Chamber HUD:** Central circular or polygonal viewport with scanline sweep animations and overlay diagnostic gauges (Core Temp, Neural Sync, Cellular Decay).