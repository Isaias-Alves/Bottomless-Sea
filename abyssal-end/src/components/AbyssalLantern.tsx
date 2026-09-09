import { useEffect, useRef } from "react";
import { useMovimentoReduzido } from "../hooks/useMovimentoReduzido";

/**
 * Lanterna de mergulho que segue o ponteiro.
 * A intensidade é controlada em CSS por `--profundidade`: invisível na
 * superfície (onde já há sol) e forte no abismo, onde é a única luz.
 */
export function AbyssalLantern() {
  const lanternaRef = useRef<HTMLDivElement>(null);
  const movimentoReduzido = useMovimentoReduzido();

  useEffect(() => {
    if (movimentoReduzido) return;

    let frameAgendado = false;
    let x = -1000;
    let y = -1000;

    const aplicar = () => {
      frameAgendado = false;
      if (lanternaRef.current) {
        lanternaRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const aoMover = (evento: PointerEvent) => {
      x = evento.clientX;
      y = evento.clientY;
      if (frameAgendado) return;
      frameAgendado = true;
      requestAnimationFrame(aplicar);
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    return () => window.removeEventListener("pointermove", aoMover);
  }, [movimentoReduzido]);

  if (movimentoReduzido) return null;

  return (
    <div
      ref={lanternaRef}
      aria-hidden="true"
      className="lanterna pointer-events-none fixed left-0 top-0 z-30 h-[46rem] w-[46rem] rounded-full mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(34, 211, 238, 0.20) 0%, rgba(12, 111, 159, 0.10) 40%, transparent 70%)",
        willChange: "transform",
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
    />
  );
}
