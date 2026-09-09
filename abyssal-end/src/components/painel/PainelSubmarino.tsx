import { useEffect, useState } from "react";
import styles from "./painel.module.css";
import { Sonar } from "./Sonar";
import { Mostradores } from "./Mostradores";
import { ListaContatos } from "./ListaContatos";
import { MarDeFundo } from "./MarDeFundo";
import { DecryptedText } from "../DecryptedText";
import { useMovimentoReduzido } from "../../hooks/useMovimentoReduzido";
import { obterPerfil, type PerfilAcesso } from "../../config/zonas";

/** Duração da sequência de comporta, em sincronia com painel.module.css. */
const DURACAO_MERGULHO = 1100;

interface PainelSubmarinoProps {
  onSelectProfile: (perfil: PerfilAcesso) => void;
}

/**
 * Console de mergulho — a antessala do portfólio.
 *
 * Regra que guiou o desenho: isto não pode virar tela de carregamento.
 * Um clique em qualquer contato (blip ou lista) já inicia a descida, e o
 * botão de mergulho livre está sempre visível como saída rápida para quem
 * não quer explorar o painel.
 */
export function PainelSubmarino({ onSelectProfile }: PainelSubmarinoProps) {
  const [destacado, setDestacado] = useState<PerfilAcesso | null>(null);
  const [mergulhando, setMergulhando] = useState<PerfilAcesso | null>(null);
  const movimentoReduzido = useMovimentoReduzido();

  const iniciarMergulho = (perfil: PerfilAcesso) => {
    if (mergulhando) return;
    if (movimentoReduzido) {
      onSelectProfile(perfil);
      return;
    }
    setMergulhando(perfil);
  };

  useEffect(() => {
    if (!mergulhando) return;
    const temporizador = setTimeout(
      () => onSelectProfile(mergulhando),
      DURACAO_MERGULHO,
    );
    return () => clearTimeout(temporizador);
  }, [mergulhando, onSelectProfile]);

  const status = mergulhando
    ? `PRESSURIZANDO COMPORTA · ROTA ${obterPerfil(mergulhando).nome.toUpperCase()}`
    : destacado
      ? obterPerfil(destacado).descricao.toUpperCase()
      : "AGUARDANDO SELEÇÃO DE ASSINATURA BIOLÓGICA";

  return (
    <div
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 text-white ${styles.tela}`}
    >
      <MarDeFundo />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vidro} aria-hidden="true" />
      {mergulhando && <div className={styles.alagamento} aria-hidden="true" />}

      <div
        className={`${styles.console} w-full max-w-5xl p-5 md:p-7 ${
          mergulhando ? styles.submergindo : ""
        }`}
      >
        {[
          "left-3 top-3",
          "right-3 top-3",
          "left-3 bottom-3",
          "right-3 bottom-3",
        ].map((posicao) => (
          <span
            key={posicao}
            aria-hidden="true"
            className={`${styles.rebite} absolute ${posicao}`}
          />
        ))}

        {/* Cabeçalho do console */}
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h1 className="font-mono text-lg font-bold uppercase tracking-[0.25em] text-cyan-300 md:text-2xl">
              Abyssal End
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Console de Mergulho · Isaías Alves
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
            {[
              { rotulo: "Sonar", cor: "#22d3ee" },
              { rotulo: "Casco", cor: "#4ade80" },
              { rotulo: "Comporta", cor: "#facc15" },
            ].map((led) => (
              <span key={led.rotulo} className="flex items-center gap-1.5">
                <span
                  className={`${styles.led} h-1.5 w-1.5 rounded-full`}
                  style={{ background: led.cor, boxShadow: `0 0 6px ${led.cor}` }}
                />
                <span className="text-white/35">{led.rotulo}</span>
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-[190px_1fr] lg:grid-cols-[190px_1fr_270px]">
          {/* Instrumentos: descem para o fim no mobile, onde o sonar importa mais */}
          <div className="order-2 lg:order-1">
            <Mostradores mergulhando={Boolean(mergulhando)} />
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <Sonar
              destacado={destacado}
              onDestacar={setDestacado}
              onSelecionar={iniciarMergulho}
            />
          </div>

          <div className="order-3 md:col-span-2 lg:col-span-1">
            <ListaContatos
              destacado={destacado}
              onDestacar={setDestacado}
              onSelecionar={iniciarMergulho}
            />
          </div>
        </div>

        {/* Barra de status + saída rápida */}
        <footer className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="min-w-0 font-mono text-[11px] tracking-wider text-cyan-300/80">
            <span className="text-white/30">STATUS ›</span>{" "}
            <DecryptedText key={status} text={status} speed={12} />
          </p>

          <button
            type="button"
            onClick={() => iniciarMergulho("mergulhador")}
            disabled={Boolean(mergulhando)}
            className="group flex shrink-0 items-center justify-center gap-3 rounded-lg border-2 border-cyan-500/50 bg-cyan-950/50 px-6 py-3 font-mono text-sm font-bold text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] disabled:opacity-40"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500 transition-colors group-hover:bg-white" />
            </span>
            [ MERGULHO LIVRE ]
          </button>
        </footer>
      </div>
    </div>
  );
}
