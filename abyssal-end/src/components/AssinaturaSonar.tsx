import { useMemo } from "react";
import { criarAleatorio } from "../lib/aleatorio";

interface AssinaturaSonarProps {
  semente: string;
  cor: string;
}

const LARGURA = 320;
const ALTURA = 90;
const PONTOS = 56;

/**
 * "Capa" procedural do card de projeto: um traço de eco de sonar derivado do
 * nome do projeto. Resolve o buraco visual dos cards sem screenshot — e um
 * placeholder cinza genérico destoaria da estética de instrumentação.
 */
/**
 * Traça o eco. Fica fora do componente porque acumula estado entre pontos
 * (cada altura suaviza a anterior) — mutação assim não pertence ao corpo
 * de um render.
 */
function tracarEco(semente: string) {
  const sortear = criarAleatorio(semente);
  const coordenadas: string[] = [];
  let altura = ALTURA * 0.55;

  for (let i = 0; i < PONTOS; i++) {
    const alvo = ALTURA * (0.15 + sortear() * 0.7);
    altura += (alvo - altura) * 0.45;

    const x = (i / (PONTOS - 1)) * LARGURA;
    const y = Math.min(Math.max(altura, 6), ALTURA - 6);
    coordenadas.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  const linha = coordenadas.join(" ");
  return { linha, area: `0,${ALTURA} ${linha} ${LARGURA},${ALTURA}` };
}

export function AssinaturaSonar({ semente, cor }: AssinaturaSonarProps) {
  const { linha, area } = useMemo(() => tracarEco(semente), [semente]);

  const idGradiente = `eco-${semente}`;

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      preserveAspectRatio="none"
      className="h-24 w-full"
      role="img"
      aria-label={`Assinatura de sonar do projeto ${semente}`}
    >
      <defs>
        <linearGradient id={idGradiente} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={cor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke={cor} strokeOpacity="0.12" strokeWidth="0.5">
        {[0.25, 0.5, 0.75].map((fracao) => (
          <line
            key={fracao}
            x1="0"
            x2={LARGURA}
            y1={ALTURA * fracao}
            y2={ALTURA * fracao}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            y1="0"
            y2={ALTURA}
            x1={(LARGURA / 8) * i}
            x2={(LARGURA / 8) * i}
          />
        ))}
      </g>

      <polygon points={area} fill={`url(#${idGradiente})`} />
      <polyline
        points={linha}
        fill="none"
        stroke={cor}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}
