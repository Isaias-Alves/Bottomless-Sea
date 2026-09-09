import styles from "./painel.module.css";
import { ICONES_PERFIL, TAMANHO_ICONE } from "./icones";
import { PERFIS, posicaoNoRadar, type PerfilAcesso } from "../../config/zonas";

/** Período da varredura. Blips e feixe compartilham este valor. */
export const DURACAO_VARREDURA = 4;

interface SonarProps {
  destacado: PerfilAcesso | null;
  onDestacar: (perfil: PerfilAcesso | null) => void;
  onSelecionar: (perfil: PerfilAcesso) => void;
}

/**
 * Deslocamento negativo que faz o eco do contato acender exatamente quando
 * o feixe cruza o rumo dele. O feixe leva `DURACAO * (rumo/360)` segundos
 * para chegar lá; a animação precisa estar adiantada do complemento disso.
 */
function faseDoEco(rumo: number) {
  return -DURACAO_VARREDURA * (1 - (((rumo % 360) + 360) % 360) / 360);
}

export function Sonar({ destacado, onDestacar, onSelecionar }: SonarProps) {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      style={{ ["--varredura" as string]: `${DURACAO_VARREDURA}s` }}
    >
      <div className={styles.radar}>
        <div className={styles.grade} />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-400/20" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-400/20" />
        <div className={styles.varredura} />
      </div>

      {/* Rosa dos rumos */}
      {[
        { rotulo: "N", classe: "left-1/2 top-2 -translate-x-1/2" },
        { rotulo: "L", classe: "right-2 top-1/2 -translate-y-1/2" },
        { rotulo: "S", classe: "bottom-2 left-1/2 -translate-x-1/2" },
        { rotulo: "O", classe: "left-2 top-1/2 -translate-y-1/2" },
      ].map((ponto) => (
        <span
          key={ponto.rotulo}
          aria-hidden="true"
          className={`pointer-events-none absolute font-mono text-[10px] text-cyan-400/40 ${ponto.classe}`}
        >
          {ponto.rotulo}
        </span>
      ))}

      {PERFIS.map((perfil) => {
        const { x, y } = posicaoNoRadar(perfil);
        const Icone = ICONES_PERFIL[perfil.id];
        const ativo = destacado === perfil.id;

        return (
          <button
            key={perfil.id}
            type="button"
            onClick={() => onSelecionar(perfil.id)}
            onMouseEnter={() => onDestacar(perfil.id)}
            onMouseLeave={() => onDestacar(null)}
            onFocus={() => onDestacar(perfil.id)}
            onBlur={() => onDestacar(null)}
            aria-label={`${perfil.nome} — ${perfil.papel}. ${perfil.descricao}`}
            className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-transform duration-300 ${
              ativo ? "z-20 scale-125" : "hover:scale-110"
            } ${ativo ? styles.destacado : ""}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: perfil.cor,
              ["--fase" as string]: `${faseDoEco(perfil.rumo)}s`,
            }}
          >
            <span className={styles.onda} aria-hidden="true" />
            <Icone
              size={TAMANHO_ICONE[perfil.id]}
              className={`relative z-10 ${styles.eco}`}
            />
          </button>
        );
      })}
    </div>
  );
}
