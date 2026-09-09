import styles from "./painel.module.css";
import { Arraia, Cachalote } from "../criaturas";

/**
 * A água em volta do console.
 *
 * O fundo desta tela era `#01060d` chapado com um brilho radial parado —
 * podia ser terminal, tela de BIOS ou fundo de apresentação. Nada ali
 * dizia que o console está submerso, e os próprios instrumentos ao lado
 * afirmam que está: 2,4 m, 1.2 ATM, zona epipelágica.
 *
 * Agora diz. A luz vem de cima porque a superfície está logo acima; as
 * partículas descem porque é o que matéria em suspensão faz; e os vultos
 * passam muito devagar e muito apagados porque estão longe, do lado de
 * fora. Tudo em contraste baixíssimo de propósito: isto é o fundo atrás
 * do console, e quem tem que ser lido é o console.
 */
export function MarDeFundo() {
  return (
    <div className={styles.mar} aria-hidden="true">
      <div className={styles.marLuz} />

      {/* Vultos ao longe. Dois, grandes e lentos: a tela de entrada não é
          um aquário, é uma pausa antes da descida. */}
      <div className={styles.marVultos}>
        <span className={styles.marVulto} style={{ top: "18%" }}>
          <Cachalote largura={520} />
        </span>
        <span
          className={`${styles.marVulto} ${styles.marVultoVolta}`}
          style={{ top: "62%" }}
        >
          <Arraia largura={300} />
        </span>
      </div>

      <div className={styles.marParticulas}>
        {[
          { e: 8, d: 34, a: 0 },
          { e: 21, d: 47, a: 11 },
          { e: 33, d: 29, a: 22 },
          { e: 46, d: 52, a: 6 },
          { e: 58, d: 38, a: 17 },
          { e: 69, d: 44, a: 29 },
          { e: 81, d: 31, a: 9 },
          { e: 93, d: 49, a: 24 },
          { e: 15, d: 41, a: 33 },
          { e: 74, d: 36, a: 14 },
        ].map((p, i) => (
          <span
            key={i}
            className={styles.marFloco}
            style={{
              left: `${p.e}%`,
              animationDuration: `${p.d}s`,
              animationDelay: `-${p.a}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
