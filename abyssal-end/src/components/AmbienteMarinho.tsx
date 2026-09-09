import { useMemo, useState } from "react";
import { criarAleatorio } from "../lib/aleatorio";
import { useMovimentoReduzido } from "../hooks/useMovimentoReduzido";

/**
 * Partículas do fundo, reagindo à profundidade.
 *
 * As três camadas ficam sempre montadas — quem cruza o fade entre elas é o
 * CSS, via `data-zona` no <html>. Antes havia bolhas subindo até os 11.000m,
 * o que contradizia a própria premissa do site.
 */

const CAMADAS = {
  bolhas: 7,
  neve: 40,
  biolum: 14,
} as const;

/** Telas pequenas costumam vir com GPU integrada e menos área visível. */
const CAMADAS_COMPACTAS = {
  bolhas: 5,
  neve: 18,
  biolum: 8,
} as const;

const CORES_BIOLUM = ["#22d3ee", "#67e8f9", "#a5f3fc", "#4ade80"];

function useParticulas<T>(
  semente: string,
  quantidade: number,
  criar: (sortear: () => number, indice: number) => T,
) {
  return useMemo(() => {
    const sortear = criarAleatorio(semente);
    return Array.from({ length: quantidade }, (_, i) => criar(sortear, i));
    // `criar` é estável por chamada; a semente é o que define o resultado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semente, quantidade]);
}

export function AmbienteMarinho() {
  const movimentoReduzido = useMovimentoReduzido();

  // Medido uma vez na montagem: a densidade não precisa acompanhar o
  // redimensionamento, e re-sortear partículas no meio do voo cortaria o
  // movimento delas.
  const [camadas] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
      ? CAMADAS_COMPACTAS
      : CAMADAS,
  );

  const bolhas = useParticulas("bolhas", camadas.bolhas, (sortear) => ({
    tamanho: 10 + sortear() * 22,
    esquerda: sortear() * 100,
    duracao: 15 + sortear() * 12,
    atraso: sortear() * 20,
    deriva: 20 + sortear() * 50,
  }));

  const neve = useParticulas("neve-marinha", camadas.neve, (sortear) => ({
    tamanho: 1 + sortear() * 2.6,
    esquerda: sortear() * 100,
    duracao: 22 + sortear() * 30,
    atraso: sortear() * 40,
    deriva: -30 + sortear() * 60,
    brilho: 0.2 + sortear() * 0.5,
  }));

  const faiscas = useParticulas("bioluminescencia", camadas.biolum, (sortear) => ({
    tamanho: 2 + sortear() * 4,
    esquerda: sortear() * 100,
    topo: sortear() * 100,
    duracao: 3 + sortear() * 6,
    atraso: sortear() * 10,
    cor: CORES_BIOLUM[Math.floor(sortear() * CORES_BIOLUM.length)],
  }));

  if (movimentoReduzido) return null;

  return (
    <div aria-hidden="true">
      <div className="camada camada-bolhas">
        {bolhas.map((bolha, i) => (
          <span
            key={i}
            className="bolha"
            style={{
              width: `${bolha.tamanho}px`,
              height: `${bolha.tamanho}px`,
              left: `${bolha.esquerda}%`,
              animationDuration: `${bolha.duracao}s`,
              animationDelay: `${bolha.atraso}s`,
              ["--deriva" as string]: `${bolha.deriva}px`,
            }}
          />
        ))}
      </div>

      <div className="camada camada-neve">
        {neve.map((floco, i) => (
          <span
            key={i}
            className="floco"
            style={{
              width: `${floco.tamanho}px`,
              height: `${floco.tamanho}px`,
              left: `${floco.esquerda}%`,
              animationDuration: `${floco.duracao}s`,
              animationDelay: `-${floco.atraso}s`,
              ["--deriva" as string]: `${floco.deriva}px`,
              ["--brilho" as string]: floco.brilho,
            }}
          />
        ))}
      </div>

      <div className="camada camada-biolum">
        {faiscas.map((faisca, i) => (
          <span
            key={i}
            className="faisca"
            style={{
              width: `${faisca.tamanho}px`,
              height: `${faisca.tamanho}px`,
              left: `${faisca.esquerda}%`,
              top: `${faisca.topo}%`,
              color: faisca.cor,
              animationDuration: `${faisca.duracao}s`,
              animationDelay: `-${faisca.atraso}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
