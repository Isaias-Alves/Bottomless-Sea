import { useState, type ComponentType } from "react";
import {
  AguaViva,
  Arraia,
  Cachalote,
  Cardume,
  Lula,
  Peixe,
  PeixePescador,
  Tartaruga,
} from "./criaturas";
import { useMovimentoReduzido } from "../hooks/useMovimentoReduzido";

/**
 * Fauna atravessando o fundo.
 *
 * Segue o mesmo contrato das partículas de `AmbienteMarinho`: as três
 * bandas ficam sempre montadas e quem cruza o fade entre elas é o CSS, por
 * `data-zona` no <html>. Desmontar cortaria a travessia no meio — um
 * cachalote sumindo no ar quando o visitante passa dos 1.000m.
 *
 * A fauna é escolhida por profundidade real: tartaruga e cardume não
 * descem à zona batial, água-viva e peixe-pescador não sobem à superfície.
 * É o mesmo critério que já separava bolha de neve marinha.
 */

interface Travessia {
  Criatura: ComponentType<{ largura: number }>;
  /** Largura em px na viewport. */
  largura: number;
  /** Altura da faixa percorrida, em % da viewport. */
  topo: number;
  /** Segundos de ponta a ponta. Silhueta grande atravessa devagar. */
  duracao: number;
  /**
   * Fase inicial, em segundos. Sempre aplicada como atraso negativo: sem
   * isso a primeira tela do site fica vazia e a fauna só aparece meio
   * minuto depois, que é quando ninguém mais está olhando.
   */
  fase: number;
  /** 1 nada para a direita, -1 para a esquerda. */
  sentido: 1 | -1;
  /** Período do bamboleio vertical. Longo = deriva; curto = nado nervoso. */
  balanco: number;
}

/** Epipelágica e topo da mesopelágica: ainda há luz, e ela vem de cima. */
const FAUNA_RASA: Travessia[] = [
  { Criatura: Cardume, largura: 190, topo: 24, duracao: 54, fase: 8, sentido: 1, balanco: 7 },
  { Criatura: Peixe, largura: 64, topo: 62, duracao: 38, fase: 26, sentido: -1, balanco: 4 },
  { Criatura: Tartaruga, largura: 120, topo: 44, duracao: 76, fase: 44, sentido: 1, balanco: 11 },
  { Criatura: Cardume, largura: 130, topo: 76, duracao: 66, fase: 40, sentido: -1, balanco: 8 },
  { Criatura: Arraia, largura: 150, topo: 12, duracao: 92, fase: 66, sentido: 1, balanco: 13 },
];

/** Mesopelágica e batipelágica: menos bicho, maior, mais lento. */
const FAUNA_MEDIA: Travessia[] = [
  { Criatura: Arraia, largura: 230, topo: 20, duracao: 104, fase: 18, sentido: -1, balanco: 15 },
  { Criatura: Lula, largura: 160, topo: 58, duracao: 72, fase: 50, sentido: 1, balanco: 6 },
  { Criatura: Cachalote, largura: 420, topo: 36, duracao: 138, fase: 92, sentido: 1, balanco: 19 },
  { Criatura: Peixe, largura: 90, topo: 80, duracao: 58, fase: 30, sentido: -1, balanco: 5 },
];

/** Abissopelágica e hadal: só o que produz a própria luz desce até aqui. */
const FAUNA_FUNDA: Travessia[] = [
  { Criatura: AguaViva, largura: 70, topo: 18, duracao: 96, fase: 12, sentido: 1, balanco: 9 },
  { Criatura: PeixePescador, largura: 150, topo: 52, duracao: 88, fase: 54, sentido: -1, balanco: 7 },
  { Criatura: AguaViva, largura: 110, topo: 70, duracao: 124, fase: 78, sentido: -1, balanco: 12 },
  { Criatura: Lula, largura: 200, topo: 34, duracao: 110, fase: 34, sentido: 1, balanco: 8 },
  { Criatura: AguaViva, largura: 50, topo: 88, duracao: 82, fase: 60, sentido: 1, balanco: 10 },
];

/**
 * Numa tela de 390px um cachalote de 420px é uma parede, não uma silhueta
 * ao longe — e as três primeiras travessias de cada banda já enchem o
 * quadro sozinhas. Mesmo critério de `CAMADAS_COMPACTAS`: menos elementos
 * compostos onde a GPU costuma ser integrada e a área visível, um terço.
 */
const PROPORCAO_COMPACTA = 0.62;
const TRAVESSIAS_COMPACTAS = 3;

function Banda({
  classe,
  fauna,
  compacta,
}: {
  classe: string;
  fauna: Travessia[];
  compacta: boolean;
}) {
  const visiveis = compacta ? fauna.slice(0, TRAVESSIAS_COMPACTAS) : fauna;
  const escala = compacta ? PROPORCAO_COMPACTA : 1;

  return (
    <div className={`camada camada-vida ${classe}`}>
      {visiveis.map(
        ({ Criatura, largura, topo, duracao, fase, sentido, balanco }, i) => (
          <div
            key={i}
            className="criatura"
            style={{
              top: `${topo}%`,
              animationDuration: `${duracao}s`,
              animationDelay: `-${fase}s`,
              ["--sentido" as string]: sentido,
            }}
          >
            <div
              className="criatura-balanco"
              style={{ animationDuration: `${balanco}s` }}
            >
              <Criatura largura={Math.round(largura * escala)} />
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export function VidaMarinha() {
  const movimentoReduzido = useMovimentoReduzido();

  // Medido uma vez na montagem, como em `AmbienteMarinho`: reavaliar no
  // resize re-sortearia a fauna no meio da travessia.
  const [compacta] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );

  // Movimento reduzido já apaga `.camada` na folha, mas fauna parada não é
  // ambientação — é um peixe colado na tela. Melhor não montar nada.
  if (movimentoReduzido) return null;

  return (
    <div aria-hidden="true">
      <Banda classe="camada-vida-rasa" fauna={FAUNA_RASA} compacta={compacta} />
      <Banda
        classe="camada-vida-media"
        fauna={FAUNA_MEDIA}
        compacta={compacta}
      />
      <Banda
        classe="camada-vida-funda"
        fauna={FAUNA_FUNDA}
        compacta={compacta}
      />
    </div>
  );
}
