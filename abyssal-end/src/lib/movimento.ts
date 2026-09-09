const CONSULTA = "(prefers-reduced-motion: reduce)";

/**
 * Preferência de movimento reduzido, compartilhada por toda a aplicação.
 *
 * Cada `DecryptedText` da página consulta esta preferência — são mais de
 * quinze instâncias. Com um `matchMedia` por componente seriam quinze
 * listeners para um único bit que muda quase nunca; aqui há um só,
 * consumido via `useSyncExternalStore`.
 */

const ouvintes = new Set<() => void>();
let consulta: MediaQueryList | null = null;

function obterConsulta() {
  if (!consulta && typeof window !== "undefined") {
    consulta = window.matchMedia(CONSULTA);
  }
  return consulta;
}

function notificar() {
  for (const ouvinte of ouvintes) ouvinte();
}

export function assinarMovimento(ouvinte: () => void): () => void {
  const alvo = obterConsulta();
  if (!alvo) return () => {};

  if (ouvintes.size === 0) alvo.addEventListener("change", notificar);
  ouvintes.add(ouvinte);

  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) alvo.removeEventListener("change", notificar);
  };
}

export function lerMovimentoReduzido(): boolean {
  return obterConsulta()?.matches ?? false;
}
