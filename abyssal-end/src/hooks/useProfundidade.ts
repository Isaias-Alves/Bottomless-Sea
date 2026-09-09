import { useEffect, useRef, useState } from "react";
import {
  assinarProfundidade,
  lerProfundidade,
  type EstadoProfundidade,
} from "../lib/profundidade";

/**
 * Zona ativa. Re-renderiza no máximo uma vez por travessia de zona —
 * os valores contínuos ficam no CSS, fora do ciclo de render.
 */
export function useZonaAtiva(): number {
  const [zona, setZona] = useState(() => lerProfundidade().zona);

  useEffect(
    () =>
      assinarProfundidade((estado) =>
        setZona((atual) => (atual === estado.zona ? atual : estado.zona)),
      ),
    [],
  );

  return zona;
}

/**
 * Leitura contínua por callback, sem estado do React.
 * Para instrumentos que escrevem direto no DOM (mostradores do HUD).
 */
export function useLeituraProfundidade(
  aoAtualizar: (estado: EstadoProfundidade) => void,
) {
  const callbackRef = useRef(aoAtualizar);

  // Mantém a referência fresca sem re-assinar o monitor a cada render.
  useEffect(() => {
    callbackRef.current = aoAtualizar;
  });

  useEffect(
    () => assinarProfundidade((estado) => callbackRef.current(estado)),
    [],
  );
}
