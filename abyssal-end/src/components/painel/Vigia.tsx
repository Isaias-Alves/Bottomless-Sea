import styles from "./painel.module.css";
import type { RefObject } from "react";
import { Cardume, Peixe } from "../criaturas";

/** Arco útil do mostrador, em graus (7h → 5h no relógio). */
const ARCO = 260;

/**
 * A vigia: uma janela para o mar, com o mostrador de profundidade como
 * moldura.
 *
 * O painel tinha um problema e uma ausência, e os dois se resolviam no
 * mesmo lugar. O problema era este mostrador: uma agulha analógica que
 * apontava para zero e nunca saía de lá, o elemento mais decorativo da
 * tela. A ausência era não haver nada ali que lembrasse que se está DENTRO
 * de alguma coisa, no mar — só instrumento sobre fundo escuro.
 *
 * Juntar os dois cabe no espaço que já existia: a escala e a agulha viram
 * o aro, e o miolo, que antes era vidro pintado, vira água de verdade.
 * Importa que caiba: em 1280x720 o console já usava toda a altura da
 * janela, e qualquer faixa nova empurraria o rodapé para fora da tela.
 *
 * Nada aqui recebe props de estado. A agulha e a água leem `--calado`, a
 * razão de descida que `Mostradores` publica a cada quadro direto no CSS —
 * o mesmo contrato de `--profundidade` no portfólio. É o que mantém a
 * janela e os números concordando entre si sem custar um render.
 */
interface VigiaProps {
  /**
   * A leitura numérica mora DENTRO do instrumento, não na grade de
   * leituras abaixo. São duas razões: é onde ela fica em qualquer
   * profundímetro de verdade — número no terço inferior do mostrador — e
   * a grade tinha voltado a ter três linhas, o que empurrava o console
   * para 742px e estourava a tela em 1280x720, onde antes cabia.
   * Quem escreve nelas é `Mostradores`, no mesmo quadro de `--calado`.
   */
  refProfundidade: RefObject<HTMLSpanElement | null>;
  refZona: RefObject<HTMLSpanElement | null>;
}

export function Vigia({ refProfundidade, refZona }: VigiaProps) {
  return (
    <div className={`${styles.mostrador} ${styles.vigia}`}>
      <div className={styles.vigiaCorpo}>

        {/* Miolo: a água. Recortada no círculo pelo `overflow` do aro. */}
        <div className={styles.vigiaVidro}>
          <div className={styles.vigiaAgua}>
            {/* A superfície vista de dentro. Sobe e some conforme se desce:
                é o que transforma a descida em algo que se vê acontecer, e
                não apenas um número subindo. */}
            <div className={styles.vigiaCeu} />
            <div className={styles.vigiaOnda} />
            <div className={styles.vigiaRaios} />
            <div className={styles.vigiaEscuridao} />

            <div className={styles.vigiaFauna}>
              <span className={styles.vigiaBicho} style={{ top: "34%" }}>
                <Peixe largura={30} />
              </span>
              <span
                className={`${styles.vigiaBicho} ${styles.vigiaBichoVolta}`}
                style={{ top: "62%" }}
              >
                <Cardume largura={54} />
              </span>
            </div>

            {/* Partículas em suspensão: aqui elas cabem. O que não cabia na
                página inteira — 40 flocos animando na zona mais cara —
                custa quase nada dentro de um círculo de 130px. */}
            {[
              { e: 18, t: 22, d: 7 },
              { e: 63, t: 8, d: 9 },
              { e: 41, t: 71, d: 11 },
              { e: 82, t: 47, d: 8 },
              { e: 27, t: 88, d: 13 },
              { e: 71, t: 63, d: 10 },
            ].map((p, i) => (
              <span
                key={i}
                className={styles.vigiaFloco}
                style={{
                  left: `${p.e}%`,
                  top: `${p.t}%`,
                  animationDuration: `${p.d}s`,
                  animationDelay: `-${i * 1.7}s`,
                }}
              />
            ))}
          </div>

          {/* Vidro: reflexo especular e a sombra da espessura do acrílico. */}
          <div className={styles.vigiaBrilho} />
        </div>

        {/* Escala e agulha DEPOIS do vidro, não antes: o aro do vidro é
            desenhado com `box-shadow` opaco, e na ordem anterior ele
            enterrava o índice. Instrumento por cima da moldura. */}
        <svg viewBox="0 0 100 100" className={styles.vigiaEscala} aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => {
            const rad = ((-ARCO / 2 + (i / 10) * ARCO - 90) * Math.PI) / 180;
            const interno = i % 5 === 0 ? 43 : 45.5;
            return (
              <line
                key={i}
                x1={50 + Math.cos(rad) * interno}
                y1={50 + Math.sin(rad) * interno}
                x2={50 + Math.cos(rad) * 49.5}
                y2={50 + Math.sin(rad) * 49.5}
                stroke="rgba(34,211,238,0.45)"
                strokeWidth={i % 5 === 0 ? 1.6 : 0.8}
              />
            );
          })}
          {/* Índice, e não agulha a partir do centro: o centro aqui é a
              janela, e uma agulha vinda de lá ficava inteira por baixo do
              vidro — invisível em qualquer profundidade. Corre no aro, no
              vão entre a borda do vidro e as marcações. Atenção: em SVG o raio é
              a distância até (50,50), não a coordenada — a ponta em y=8
              está a 42 do centro, não a 8. */}
          <g className={styles.vigiaAgulha}>
            <polygon points="50,8 46.6,15.5 53.4,15.5" fill="#22d3ee" />
            <circle cx="50" cy="19" r="1.5" fill="#a5f3fc" />
          </g>
        </svg>

        <div className={styles.vigiaLeitura}>
          <span ref={refProfundidade} className={styles.vigiaMetros}>
            0.0 m
          </span>
          <span ref={refZona} className={styles.vigiaZona}>
            EPIPELÁGICA
          </span>
        </div>

        {/* Parafusos do aro */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={styles.vigiaParafuso}
            style={{ transform: `rotate(${i * 60}deg) translateY(-50%)` }}
          />
        ))}
      </div>
    </div>
  );
}
