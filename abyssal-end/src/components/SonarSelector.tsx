import styles from "./Sonar.module.css";
import { GiSharkFin, GiSpermWhale, GiDivingHelmet } from "react-icons/gi";
import { FaFish } from "react-icons/fa";

export type PerfilAcesso = "sardinha" | "tubarao" | "baleia" | "mergulhador";

interface SonarSelectorProps {
  onSelectProfile: (perfil: PerfilAcesso) => void;
}

export function SonarSelector({ onSelectProfile }: SonarSelectorProps) {
  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center text-white overflow-hidden ${styles.tacticalBackground}`}
    >
      <div className={styles.scanlines}></div>

      <div className="mb-16 text-center z-10">
        <h1 className="mb-2 text-3xl md:text-5xl font-mono text-ocean-surface uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,119,190,0.5)]">
          Sonar Ativo
        </h1>
        <p className="text-white/50 font-mono text-sm md:text-base">
          Identifique sua assinatura biológica ou experimente um mergulho livre.
        </p>
      </div>

      <div className={styles.radarWrapper}>
        <div className={styles.radarContainer}>
          <div className={styles.radarGrid}></div>
          <div className="absolute top-1/2 left-0 h-[1px] w-full bg-ocean-surface/30 -translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-ocean-surface/30 -translate-x-1/2"></div>
          <div className={styles.radarSweep}></div>
        </div>

        <button
          onClick={() => onSelectProfile("sardinha")}
          className="group absolute top-[25%] right-[25%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 hover:z-20 transition-transform hover:scale-110"
        >
          <div className="relative flex items-center justify-center text-green-400">
            <FaFish
              size={24}
              className="relative z-10 drop-shadow-[0_0_8px_#4ade80]"
            />
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400/50"></div>
          </div>
          <div className="absolute top-12 flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-mono bg-black/90 border border-green-400/30 px-3 py-2 rounded-md pointer-events-none w-max z-50">
            <span className="text-xs text-green-400 font-bold mb-1">
              Sardinha (Dev Indie)
            </span>
            <span className="text-[10px] text-white/60">
              Foco: Stacks &gt; Projetos
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelectProfile("tubarao")}
          className="group absolute bottom-[30%] left-[20%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 hover:z-20 transition-transform hover:scale-110"
        >
          <div className="relative flex items-center justify-center text-red-500">
            <GiSharkFin
              size={32}
              className="relative z-10 drop-shadow-[0_0_10px_#ef4444]"
            />
            <div className="absolute inset-0 animate-ping rounded-full bg-red-500/50"></div>
          </div>
          <div className="absolute top-14 flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-mono bg-black/90 border border-red-500/30 px-3 py-2 rounded-md pointer-events-none w-max z-50">
            <span className="text-xs text-red-500 font-bold mb-1">
              Tubarão (Acadêmico)
            </span>
            <span className="text-[10px] text-white/60">
              Foco: Experiência &gt; Stacks
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelectProfile("baleia")}
          className="group absolute top-[60%] right-[15%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 hover:z-20 transition-transform hover:scale-110"
        >
          <div className="relative flex items-center justify-center text-purple-500">
            <GiSpermWhale
              size={44}
              className="relative z-10 drop-shadow-[0_0_15px_#a855f7]"
            />
            <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/50 duration-1000"></div>
          </div>
          <div className="absolute top-16 flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-mono bg-black/90 border border-purple-500/30 px-3 py-2 rounded-md pointer-events-none w-max z-50">
            <span className="text-xs text-purple-400 font-bold mb-1">
              Baleia (Corporativo)
            </span>
            <span className="text-[10px] text-white/60">
              Foco: Experiência &gt; Projetos
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelectProfile("mergulhador")}
          className="group absolute top-[25%] left-[25%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 hover:z-20 transition-transform hover:scale-110"
        >
          <div className="relative flex items-center justify-center text-cyan-400">
            <GiDivingHelmet
              size={30}
              className="relative z-10 drop-shadow-[0_0_10px_#22d3ee]"
            />
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/50"></div>
          </div>
          <div className="absolute top-12 flex flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-mono bg-black/90 border border-cyan-400/30 px-3 py-2 rounded-md pointer-events-none w-max z-50">
            <span className="text-xs text-cyan-400 font-bold mb-1">
              Mergulhador (Livre)
            </span>
            <span className="text-[10px] text-white/60">
              Ordem Padrão Original
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
