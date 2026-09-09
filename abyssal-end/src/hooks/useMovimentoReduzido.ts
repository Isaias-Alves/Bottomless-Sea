import { useSyncExternalStore } from "react";
import { assinarMovimento, lerMovimentoReduzido } from "../lib/movimento";

/**
 * Respeita a preferência de movimento reduzido do sistema.
 * O CSS já neutraliza as animações; este hook existe para as decisões que
 * só o JS toma: pular a descriptografia, cortar a transição de mergulho e
 * não montar as camadas de partículas.
 */
export function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(
    assinarMovimento,
    lerMovimentoReduzido,
    () => false,
  );
}
