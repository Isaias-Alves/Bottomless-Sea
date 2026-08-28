import { useEffect, useRef } from "react";
import { DecryptedText } from "./DecryptedText";

const MARCOS_PROFUNDIDADE = [0, 200, 1000, 4000, 11000];

export function DepthHUD() {
  const depthRef = useRef<HTMLSpanElement>(null);
  const pressureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollRatio = maxScroll > 0 ? scrollPx / maxScroll : 0;

      const totalSegmentos = MARCOS_PROFUNDIDADE.length - 1;
      const segmentoAtual = scrollRatio * totalSegmentos;

      const indice = Math.min(Math.floor(segmentoAtual), totalSegmentos - 1);
      const progressoNoSegmento = segmentoAtual - indice;

      const profundidadeBase = MARCOS_PROFUNDIDADE[indice];
      const profundidadeProxima = MARCOS_PROFUNDIDADE[indice + 1];

      const depth = Math.floor(
        profundidadeBase +
          (profundidadeProxima - profundidadeBase) * progressoNoSegmento,
      );

      // Pressão: 1 ATM (superfície) + 1 ATM a cada 10 metros
      const pressure = (depth / 10 + 1).toFixed(1);

      if (depthRef.current)
        depthRef.current.innerText = `${depth.toLocaleString("pt-BR")}m`;
      if (pressureRef.current)
        pressureRef.current.innerText = `${pressure} ATM`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden flex-col gap-10 opacity-70 transition-opacity hover:opacity-100 md:flex">
      <div className="flex flex-col gap-1 border-l-2 border-cyan-400/30 pl-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          <DecryptedText text="Profundidade" delay={200} />
        </span>
        <span
          ref={depthRef}
          className="font-mono text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
        >
          0m
        </span>
      </div>

      <div className="flex flex-col gap-1 border-l-2 border-cyan-400/30 pl-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          <DecryptedText text="Pressão Externa" delay={600} />
        </span>
        <span
          ref={pressureRef}
          className="font-mono text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
        >
          1.0 ATM
        </span>
      </div>
    </div>
  );
}
