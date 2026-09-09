import { useRef, useState } from "react";
import { DecryptedText } from "./DecryptedText";
import { useLeituraProfundidade } from "../hooks/useProfundidade";
import { ZONAS } from "../config/zonas";

/**
 * Instrumentação lateral: profundidade, pressão e zona corrente.
 *
 * Os números são escritos direto no DOM via ref — a leitura muda a cada
 * frame de scroll e não tem por que passar pelo ciclo de render. Só o nome
 * da zona, que muda cinco vezes na página inteira, vira estado.
 */
export function DepthHUD() {
  const profundidadeRef = useRef<HTMLSpanElement>(null);
  const pressaoRef = useRef<HTMLSpanElement>(null);
  const ultimaLeitura = useRef(-1);
  const [zona, setZona] = useState(0);

  useLeituraProfundidade((estado) => {
    // A razão de descida muda a cada frame, mas a leitura em metros só
    // muda de vez em quando. Escrever `textContent` invalida o layout do
    // nó, então só se escreve quando o número realmente mudou.
    if (ultimaLeitura.current !== estado.metros) {
      ultimaLeitura.current = estado.metros;

      if (profundidadeRef.current) {
        profundidadeRef.current.textContent = `${estado.metros.toLocaleString("pt-BR")}m`;
      }
      if (pressaoRef.current) {
        // 1 ATM na superfície + 1 ATM a cada 10 metros de coluna d'água.
        pressaoRef.current.textContent = `${(estado.metros / 10 + 1).toFixed(1)} ATM`;
      }
    }

    setZona((atual) => (atual === estado.zona ? atual : estado.zona));
  });

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-5 opacity-70 md:flex">
      {/* Régua vertical: posição absoluta na coluna d'água. O marcador é
          movido pelo CSS a partir de `--profundidade`, sem JS por frame. */}
      <div className="regua-profundidade relative w-px bg-white/15">
        {ZONAS.map((z, indice) => (
          <span
            key={z.id}
            className="absolute -left-1 h-px w-2.5 bg-white/30"
            style={{ top: `${(indice / ZONAS.length) * 100}%` }}
          />
        ))}
        <div
          aria-hidden="true"
          className="marcador-profundidade absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 border-l-2 border-cyan-400/30 pl-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            <DecryptedText text="Profundidade" delay={200} />
          </span>
          <span
            ref={profundidadeRef}
            className="font-mono text-2xl font-bold tabular-nums text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          >
            0m
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            {ZONAS[zona].nome}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-cyan-400/30 pl-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            <DecryptedText text="Pressão Externa" delay={600} />
          </span>
          <span
            ref={pressaoRef}
            className="font-mono text-2xl font-bold tabular-nums text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          >
            1.0 ATM
          </span>
        </div>
      </div>
    </div>
  );
}
