// Convierte lo que escribe el jugador en una forma comparable:
//   "  Mr. Mime " → "mrmime"
//   "Farfetch'd"  → "farfetchd"
//   "Nidoran♀"    → "nidoranf"   (igual que "nidoran-f" de PokeAPI)
//   "GÉNGAR"      → "gengar"
export function normalizeName(input: string): string {
  return (
    input
      // Separa las letras de sus tildes ("é" → "e" + "´") y quita las tildes
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/♀/g, 'f')
      .replace(/♂/g, 'm')
      // Quita espacios, guiones, puntos, apóstrofos y cualquier otro símbolo
      .replace(/[^a-z0-9]/g, '')
  )
}
