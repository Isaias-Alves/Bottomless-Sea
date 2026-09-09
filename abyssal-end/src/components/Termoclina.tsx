import type { Zona } from "../config/zonas";

interface TermoclinaProps {
  zona: Zona;
}

/**
 * Marco de travessia entre duas zonas.
 * Sem ele a descida é contínua demais e o visitante não percebe que mudou
 * de camada — o wireframe prometia esse ritmo e a implementação não tinha.
 */
export function Termoclina({ zona }: TermoclinaProps) {
  return (
    <div
      className="termoclina relative z-20 my-4 flex flex-col items-center gap-3 py-10 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-10 w-full opacity-40"
        style={{ color: "var(--material-realce, #fff)" }}
      >
        <path
          className="termoclina-linha"
          d="M0 20 Q 75 4 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="font-mono text-[10px] tracking-[0.35em] uppercase tenue">
        ▼ Termoclina · {zona.nome}
      </p>
      <p className="max-w-md px-6 text-center font-mono text-xs tenue">
        {zona.travessia}
      </p>
    </div>
  );
}
