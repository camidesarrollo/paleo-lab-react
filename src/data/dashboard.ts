// Contenido del dashboard (extraído de src/layout/dashboard/code.html).
// Cuando haya API (por ejemplo PokeAPI), solo cambia este archivo: los componentes no se tocan.

import type { Dossier } from '../components/lab/DossierCard'
import type { EqualizerBar } from '../components/lab/EqualizerBars'
import type { Fragment } from '../components/lab/FragmentCard'
import type { HexRow } from '../components/lab/HexStream'
import type { RankedEntry } from '../components/lab/RankedItem'
import type { StatTone } from '../components/ui/Stat'
import type { StepTone } from '../components/ui/StepCard'
import type { LogEntry } from './lab'

// ── Barra lateral ────────────────────────────────────────────────

export type NavItem = {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'laboratorio', label: 'LABORATORIO_PRINCIPAL', href: '#laboratorio' },
  { id: 'secuenciador', label: 'SECUENCIADOR_DNA', href: '#secuenciador' },
  { id: 'incubadora', label: 'CÁMARA_INCUBADORA', href: '#incubadora' },
  { id: 'gritos', label: 'SALA_DE_GRITOS', href: '#gritos' },
  { id: 'archivo', label: 'ARCHIVO_ESPECÍMENES', href: '#archivo' },
  { id: 'mapa', label: 'MAPA_REGIONAL', href: '#mapa' },
  { id: 'red', label: 'DIAGNÓSTICO_RED', href: '#red' },
]

// ── Barra superior ───────────────────────────────────────────────

export const labStatus = {
  version: 'PALEODEX // RECON-TERM v0.94b',
  sector: '[SEC-04 :: SECTOR DE FÓSILES]',
  level: 'NIVEL DE LABORATORIO: LVL 03 [INVESTIGADOR ADJUNTO]',
  nextLevel: '+2 resurrecciones para LVL 04',
  pokedex: { found: 14, total: 151 },
  energy: { value: 78, max: 100, regen: '+1 / 4min' },
}

export type ModuleState = 'active' | 'locked' | 'synced'

export const labModules: Array<{ label: string; state: ModuleState }> = [
  { label: 'SALA DE GRITOS [ACTIVO]', state: 'active' },
  { label: 'MAPA DE REGIONES [BLOQUEADO - 4 RESTANTES]', state: 'locked' },
  { label: 'POKEAPI v2 SYNC OK', state: 'synced' },
]

// ── Expediente activo ────────────────────────────────────────────

export const activeDossier = {
  location: 'STN-LOC://BAY-04',
  priority: 'RECONSTRUCCIÓN PRIORITARIA // NIVEL DE AMENAZA: MODERADO',
  code: 'EXPEDIENTE REC-138',
  title: 'ESPECIE NO IDENTIFICADA',
  taxon: 'TAXON_TMP: [ANCIENT_AMMONITE_01] :: SECTOR MARINO PROFUNDO',
  status: 'ESTADO: EXTRAÍDO (68%)',
  hash: 'HASH: 0x7E3A-OMANYTE',
  silhouetteTag: '[ESP_SILUETA: #138]',
  viability: 85,
  scanStatus: 'SISTEMA DE BIO-ESCANEO: 4 DE 6 FRAGMENTOS DETECTADOS',
  energyCost: 15,
  successRate: '88.4%',
}

export const hexRows: HexRow[] = [
  { address: '0x00FF', bytes: '41 54 43 47 4F 4D', status: '[OK]', tone: 'amber' },
  { address: '0x00A1', bytes: '4E 41 55 54 ?? ??', status: '[SECTOR_CORRUPT]', tone: 'error' },
  { address: '0x00C4', bytes: '41 51 55 41 5F 31', status: '[REPARADO]', tone: 'phosphor' },
]

export const specimenStats: Array<{ label: string; value: string; tone: StatTone }> = [
  { label: 'TIPO GENÉTICO:', value: '[ROCA / AGUA]', tone: 'default' },
  { label: 'GRITO ACÚSTICO:', value: '[DISTORSIONADO]', tone: 'amber' },
  { label: 'HUELLA COMBATE:', value: '[PENDIENTE]', tone: 'muted' },
  { label: 'INTEGRIDAD:', value: '68.2 %', tone: 'phosphor' },
]

// ── Expedientes pendientes ───────────────────────────────────────

export const pendingDossiers: Dossier[] = [
  {
    id: 'exp-140',
    code: 'EXP-140 // SEC-02',
    title: 'FÓSIL DOMO',
    description:
      'Especie: KABUTO. Caparazón quitinoso endurecido. Frecuencia de latido detectada débilmente en el estrato arcilloso.',
    status: { label: 'CORROMPIDO', tone: 'danger' },
    stripe: 'amber',
    dna: 42,
    action: '[ANALIZAR]',
  },
  {
    id: 'exp-142',
    code: 'EXP-142 // SEC-09',
    title: 'ÁMBAR VIEJO',
    description:
      'Especie: AERODACTYL. Tejido alado encapsulado en resina fósil. Requiere Nivel de Laboratorio 05 para desbloqueo térmico.',
    status: { label: 'CONGELADO', tone: 'neutral' },
    stripe: 'error',
    lockedReason: 'LVL 05 REQ',
    action: '[BLOQUEADO]',
  },
  {
    id: 'exp-034',
    code: 'EXP-034 // SEC-01',
    title: 'LINAJE PERDIDO',
    description:
      'Especie: ¿NIDORAN_PREHISTÓRICO? Glándula venenosa fosilizada intacta. Cromosoma sexual en bucle recurrente.',
    status: { label: 'SIN DECODIFICAR', tone: 'amber' },
    stripe: 'muted',
    dna: 18,
    action: '[PURGAR]',
  },
]

// ── Columna derecha ──────────────────────────────────────────────

export const resurrections: RankedEntry[] = [
  { id: 'exp-131', rank: 'S', title: 'EXP-131 // LAPRAS', detail: 'Reconstrucción pura: 99.4%', reward: '+35 ⚡' },
  { id: 'exp-133', rank: 'A', title: 'EXP-133 // EEVEE', detail: 'Genómica estable: 92.1%', reward: '+25 ⚡' },
  { id: 'exp-137', rank: 'B', title: 'EXP-137 // PORYGON', detail: 'Residuos corregidos: 84.7%', reward: '+15 ⚡' },
]

export const diagnosticsLogs: LogEntry[] = [
  {
    time: '[SYS_WARN 03:14:02]',
    level: 'error',
    message: 'Interferencia cuántica en Archivo 151. Presencia de firma anómala en Isla Canela.',
  },
  {
    time: '[SYS_LOG 02:45:11]',
    level: 'ok',
    message: 'Lámpara bahía 3 estabilizada. Nivel iluminación: 24% (+2% por última resurrección).',
  },
  {
    time: '[AUDIO_MON]',
    level: 'warn',
    message: 'Eco distante en frecuencia 8.4kHz. Resonancia de grito prehistórico registrada.',
  },
  {
    time: '[ENV_STATUS]',
    level: 'info',
    message: 'Temperatura criogénica: -18.4°C // Presión barométrica: 1042 hPa.',
  },
]

export const equalizerBars: EqualizerBar[] = [
  { level: 2, tone: 'amber', pulse: true },
  { level: 4, tone: 'amber' },
  { level: 6, tone: 'phosphor', pulse: true },
  { level: 3, tone: 'phosphor' },
  { level: 5, tone: 'amber', pulse: true },
  { level: 2, tone: 'phosphor' },
  { level: 4, tone: 'amber' },
  { level: 1, tone: 'phosphor' },
]

export const incubator = {
  name: 'CÁMARA DE INCUBACIÓN #01',
  status: '[EN ESPERA]',
  fluid: '98.2% pH 7.2',
  neural: '0.00 μV [STANDBY]',
}

// ── Fragmentos sueltos ───────────────────────────────────────────

export const fragments: Fragment[] = [
  {
    id: 'sprite-038',
    code: '[SPRITE_CORRUPT_038]',
    type: 'hex',
    tone: 'amber',
    tag: { label: 'GRÁFICO', tone: 'phosphor' },
    icon: 'local_fire_department',
    title: '9 COLAS EN LLAMAS',
    description: '¿Vulpix o Ninetales? Fuego etéreo.',
    action: 'ASOCIAR A EXPEDIENTE',
  },
  {
    id: 'cry-006',
    code: '[CRY_HASH_#006]',
    type: 'audio',
    tone: 'phosphor',
    tag: { label: 'AUDIO 440Hz', tone: 'warning' },
    icon: 'volume_up',
    title: 'RUGIDO DE COMBUSTIÓN',
    description: 'Frecuencia acústica Charizard.',
    action: 'REPRODUCIR EN SALA',
  },
  {
    id: 'stat-hp',
    code: '[STAT_VECTOR_HP]',
    type: 'stats',
    tone: 'muted',
    tag: { label: 'MATRIZ', tone: 'amber' },
    icon: 'bar_chart',
    title: 'HP: 105 / SpAtk: 120',
    description: 'Array numérico sin anclaje de especie.',
    action: 'MAPEAR EN CADENA',
  },
  {
    id: 'evo-err',
    code: '[EVO_BRANCH_ERR]',
    type: 'hex',
    tone: 'error',
    tag: { label: 'MUTAGÉNICO', tone: 'danger' },
    icon: 'alt_route',
    title: 'NEXO: PIEDRA AGUA',
    description: 'Divergencia inestable hacia Poliwrath/Vaporeon.',
    action: 'ESTABILIZAR RADIACIÓN',
  },
]

// ── Tutorial ─────────────────────────────────────────────────────

export const tutorialSteps: Array<{ id: string; title: string; description: string; tone: StepTone }> = [
  {
    id: 'identificar',
    title: '01. IDENTIFICAR',
    description: 'Localiza expedientes con fósiles en el sector criogénico y verifica el porcentaje de ADN viable.',
    tone: 'phosphor',
  },
  {
    id: 'extraer',
    title: '02. EXTRAER',
    description: 'Consume energía del núcleo para purgar impurezas rocosas y reparar los pares de bases incompletos.',
    tone: 'amber',
  },
  {
    id: 'sintetizar',
    title: '03. SINTETIZAR',
    description: 'Transfiere la muestra a la cámara incubadora y calibra la frecuencia acústica en la Sala de Gritos.',
    tone: 'default',
  },
  {
    id: 'sincronizar',
    title: '04. SINCRONIZAR',
    description: 'Registra el espécimen revivido en la PokéAPI nacional y recupera energía extra para tu núcleo.',
    tone: 'phosphor',
  },
]
