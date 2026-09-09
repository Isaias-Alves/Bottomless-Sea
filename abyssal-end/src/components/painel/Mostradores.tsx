import { useEffect, useRef, type RefObject } from "react";
import styles from "./painel.module.css";
import { Vigia } from "./Vigia";
import { PROFUNDIDADE_MAXIMA, ZONAS } from "../../config/zonas";
import { useMovimentoReduzido } from "../../hooks/useMovimentoReduzido";
import {
  cascoEm,
  descidaEm,
  marulhoEm,
  pressaoEm,
  temperaturaEm,
  zonaEm,
} from "../../lib/instrumentos";

/** Em sincronia com DURACAO_MERGULHO em PainelSubmarino.tsx. */
const DURACAO_MERGULHO = 1100;

/** Um ponto de oxigênio a cada 50 s submerso, com piso em 90%. */
const OXIGENIO_INICIAL = 98;
const SEGUNDOS_POR_PONTO = 50;
const OXIGENIO_MINIMO = 90;

interface BarraProps {
  rotulo: string;
  percentual: number;
  cor: string;
  refTexto?: RefObject<HTMLSpanElement | null>;
  refPreenchimento?: RefObject<HTMLDivElement | null>;
}

function Barra({
  rotulo,
  percentual,
  cor,
  refTexto,
  refPreenchimento,
}: BarraProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest">
        <span className="text-white/45">{rotulo}</span>
        <span ref={refTexto} className="tabular-nums" style={{ color: cor }}>
          {percentual}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          ref={refPreenchimento}
          className={`${styles.barra} h-full rounded-full`}
          style={{
            width: `${percentual}%`,
            background: cor,
            boxShadow: `0 0 8px ${cor}`,
          }}
        />
      </div>
    </div>
  );
}

function Leitura({
  rotulo,
  valor,
  refValor,
}: {
  rotulo: string;
  valor: string;
  refValor: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-white/35">{rotulo}</span>
      <span ref={refValor} className="tabular-nums text-cyan-300">
        {valor}
      </span>
    </div>
  );
}

interface MostradoresProps {
  /** Durante a transição de mergulho os instrumentos saem do repouso. */
  mergulhando: boolean;
}

/**
 * Coluna de instrumentos do console.
 *
 * Os valores eram constantes escritas à mão — 18.4 °C, 1.0 ATM, casco
 * 100% — e a agulha de profundidade apontava para zero e ficava lá. Agora
 * há uma única grandeza real, a profundidade, e todo o resto sai dela por
 * função pura (ver `lib/instrumentos.ts`). Em repouso o submarino não está
 * parado: ele bóia, e o marulho move os números de verdade.
 *
 * O laço escreve direto no DOM por `ref`, como o `DepthHUD` do portfólio:
 * uma leitura que muda a cada quadro não tem por que atravessar o ciclo de
 * render. E escreve só quando o texto EXIBIDO muda — a profundidade tem
 * uma casa decimal, então mudar de 1.24 m para 1.27 m não é motivo para
 * invalidar o layout de um nó de texto.
 *
 * `--calado` (0 na superfície, 1 na fossa) sai no elemento raiz e é o que
 * mantém a vigia e os números concordando: mesma fonte, mesmo quadro.
 */
export function Mostradores({ mergulhando }: MostradoresProps) {
  const raiz = useRef<HTMLDivElement>(null);
  const profundidade = useRef<HTMLSpanElement>(null);
  const pressao = useRef<HTMLSpanElement>(null);
  const temperatura = useRef<HTMLSpanElement>(null);
  const lastro = useRef<HTMLSpanElement>(null);
  const sonar = useRef<HTMLSpanElement>(null);
  const zona = useRef<HTMLSpanElement>(null);
  const oxigenioTexto = useRef<HTMLSpanElement>(null);
  const oxigenioBarra = useRef<HTMLDivElement>(null);
  const energiaTexto = useRef<HTMLSpanElement>(null);
  const energiaBarra = useRef<HTMLDivElement>(null);
  const cascoTexto = useRef<HTMLSpanElement>(null);
  const cascoBarra = useRef<HTMLDivElement>(null);

  const movimentoReduzido = useMovimentoReduzido();

  useEffect(() => {
    // Sem movimento não há marulho: os instrumentos ficam na leitura de
    // repouso, que é justamente o que o JSX já renderizou.
    if (movimentoReduzido) return;

    let quadro = 0;
    const inicio = performance.now();
    let inicioMergulho = 0;
    const ultimo = new Map<Element, string>();

    /** Só toca o DOM quando o texto exibido realmente mudou. */
    const escrever = (
      alvo: RefObject<HTMLElement | null>,
      texto: string,
    ) => {
      const no = alvo.current;
      if (!no || ultimo.get(no) === texto) return;
      ultimo.set(no, texto);
      no.textContent = texto;
    };

    const passo = (agora: number) => {
      quadro = requestAnimationFrame(passo);

      if (mergulhando && !inicioMergulho) inicioMergulho = agora;

      const metros = inicioMergulho
        ? descidaEm((agora - inicioMergulho) / DURACAO_MERGULHO)
        : marulhoEm((agora - inicio) / 1000);

      const calado = metros / PROFUNDIDADE_MAXIMA;
      raiz.current?.style.setProperty("--calado", calado.toFixed(4));

      escrever(profundidade, `${metros.toFixed(1)} m`);
      escrever(pressao, `${pressaoEm(metros).toFixed(1)} ATM`);
      escrever(temperatura, `${temperaturaEm(metros).toFixed(1)} °C`);
      escrever(lastro, inicioMergulho ? "PURGANDO" : "ESTÁVEL");
      escrever(sonar, inicioMergulho ? "VARRENDO" : "ATIVO");
      escrever(zona, ZONAS[zonaEm(metros)].nome.toUpperCase());

      const casco = Math.round(cascoEm(metros));
      escrever(cascoTexto, `${casco}%`);
      if (cascoBarra.current) cascoBarra.current.style.width = `${casco}%`;

      // A comporta consome energia para pressurizar; em repouso não há dreno.
      const energia = Math.round(87 - 7 * calado);
      escrever(energiaTexto, `${energia}%`);
      if (energiaBarra.current) energiaBarra.current.style.width = `${energia}%`;

      // Oxigênio é o único que não vem da profundidade: vem do tempo que o
      // visitante já passou submerso, que também é uma grandeza real.
      const oxigenio = Math.max(
        OXIGENIO_MINIMO,
        OXIGENIO_INICIAL -
          Math.floor((agora - inicio) / 1000 / SEGUNDOS_POR_PONTO),
      );
      escrever(oxigenioTexto, `${oxigenio}%`);
      if (oxigenioBarra.current) {
        oxigenioBarra.current.style.width = `${oxigenio}%`;
      }
    };

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [mergulhando, movimentoReduzido]);

  return (
    <div ref={raiz} className="flex flex-col gap-4">
      <Vigia refProfundidade={profundidade} refZona={zona} />

      <div className={`${styles.mostrador} flex flex-col gap-3 p-4`}>
        <Barra
          rotulo="Oxigênio"
          percentual={OXIGENIO_INICIAL}
          cor="#4ade80"
          refTexto={oxigenioTexto}
          refPreenchimento={oxigenioBarra}
        />
        <Barra
          rotulo="Energia"
          percentual={87}
          cor="#22d3ee"
          refTexto={energiaTexto}
          refPreenchimento={energiaBarra}
        />
        <Barra
          rotulo="Casco"
          percentual={100}
          cor="#a5f3fc"
          refTexto={cascoTexto}
          refPreenchimento={cascoBarra}
        />
      </div>

      <div
        className={`${styles.mostrador} grid grid-cols-2 gap-3 p-4 font-mono text-[10px] uppercase tracking-wider`}
      >
        <Leitura rotulo="Pressão" valor="1.0 ATM" refValor={pressao} />
        <Leitura rotulo="Temp." valor="18.4 °C" refValor={temperatura} />
        <Leitura rotulo="Lastro" valor="ESTÁVEL" refValor={lastro} />
        <Leitura rotulo="Sonar" valor="ATIVO" refValor={sonar} />
      </div>
    </div>
  );
}
