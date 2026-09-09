/**
 * Gerador pseudoaleatório determinístico (mulberry32 com semente textual).
 *
 * Usado por partículas e pelas assinaturas de sonar dos projetos: a mesma
 * semente sempre produz o mesmo desenho, então o layout não "pula" entre
 * renders nem varia a cada recarregamento.
 */
export function criarAleatorio(semente: string): () => number {
  let hash = 1779033703 ^ semente.length;

  for (let i = 0; i < semente.length; i++) {
    hash = Math.imul(hash ^ semente.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  let estado = hash >>> 0;

  return () => {
    estado = (estado + 0x6d2b79f5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
