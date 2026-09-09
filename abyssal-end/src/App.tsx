import { Fragment, useCallback, useEffect, useState } from "react";
import { PainelSubmarino } from "./components/painel/PainelSubmarino";
import { AbyssalLantern } from "./components/AbyssalLantern";
import { AbyssalSilhouettes } from "./components/AbyssalSilhouettes";
import { AmbienteMarinho } from "./components/AmbienteMarinho";
import { DecryptedText } from "./components/DecryptedText";
import { DepthHUD } from "./components/DepthHUD";
import { Sidebar } from "./components/Sidebar";
import { Superficie } from "./components/Superficie";
import { Termoclina } from "./components/Termoclina";
import { VidaMarinha } from "./components/VidaMarinha";
import { COMPONENTES_SECAO } from "./sections";
import { SECOES, ZONAS, obterPerfil, type PerfilAcesso } from "./config/zonas";
import { reiniciarProfundidade } from "./lib/profundidade";
import { useZonaAtiva } from "./hooks/useProfundidade";

/**
 * O nome da zona vive num componente próprio porque `useZonaAtiva` provoca
 * um render a cada travessia. Dentro de `Portfolio` isso re-renderizava a
 * página inteira — todas as seções — cinco vezes por descida, anulando o
 * desenho do monitor de profundidade, que existe para manter o scroll
 * fora do ciclo do React.
 */
function RodapeZona() {
  const zona = useZonaAtiva();

  return (
    <footer className="mt-24 border-t border-white/10 py-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
      {ZONAS[zona].nome} · Abyssal End © {new Date().getFullYear()}
    </footer>
  );
}

function Portfolio({
  perfil,
  onSair,
}: {
  perfil: PerfilAcesso;
  onSair: () => void;
}) {
  const [anomaliaAtiva, setAnomaliaAtiva] = useState(false);
  const { ordem, nome: nomePerfil, cor } = obterPerfil(perfil);

  const ativarAnomalia = useCallback(() => setAnomaliaAtiva(true), []);

  return (
    <div className="relative w-full overflow-x-hidden font-sans text-white">
      {/* Camadas ambientais e overlays ficam FORA do wrapper animado: um
          ancestral com `transform` ou `filter` vira containing block e
          reancora todo descendente `position: fixed` nele, em vez de na
          viewport. Era o que jogava o vídeo da anomalia para o meio da
          página, e o que deslocava HUD, lanterna e partículas durante a
          animação de chegada. */}
      {anomaliaAtiva ? (
        <video
          autoPlay
          controls={false}
          className="fixed inset-0 z-0 h-full w-full object-cover opacity-80"
          style={{ mixBlendMode: "multiply" }}
          src="/bad-apple.mp4"
          onEnded={() => setAnomaliaAtiva(false)}
        />
      ) : (
        <AbyssalSilhouettes />
      )}

      <div className="sunlight-glow" aria-hidden="true" />
      <Superficie />
      <VidaMarinha />
      <AmbienteMarinho />
      <AbyssalLantern />
      <DepthHUD />
      <Sidebar perfil={perfil} />

      {anomaliaAtiva && (
        <button
          type="button"
          onClick={() => setAnomaliaAtiva(false)}
          className="fixed right-8 top-8 z-50 rounded bg-red-900/60 px-4 py-2 font-mono text-xs text-red-200 hover:bg-red-900"
        >
          [ PURGAR ANOMALIA ]
        </button>
      )}

      <main
        className={`entrada-mergulho relative z-20 mx-auto max-w-6xl px-6 py-12 transition-[filter] duration-1000 md:pl-48 md:pr-40 ${
          anomaliaAtiva ? "bg-transparent drop-shadow-2xl" : ""
        }`}
      >
        <header className="relative z-20 mb-24 mt-12 border-b border-white/20 pb-8">
          <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: cor, boxShadow: `0 0 8px ${cor}` }}
              aria-hidden="true"
            />
            Rota ativa: <DecryptedText text={nomePerfil} delay={300} />
          </p>

          <div className="mt-2 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="text-4xl font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] md:text-6xl">
              <DecryptedText text="Abyssal End" delay={100} />
            </h1>

            <button
              type="button"
              onClick={onSair}
              className="group flex items-center gap-3 rounded-lg border-2 border-cyan-500/50 bg-cyan-950/50 px-6 py-3 font-mono text-sm font-bold text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-900 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500 transition-colors group-hover:bg-white" />
              </span>
              [ EMERGIR ]
            </button>
          </div>
        </header>

        {ordem.map((chave, indice) => {
          const zona = ZONAS[indice];
          const meta = SECOES[chave];
          const Secao = COMPONENTES_SECAO[chave];
          const atrasoCascata = 400 + indice * 150;

          return (
            <Fragment key={zona.id}>
              {indice > 0 && <Termoclina zona={zona} />}

              <section
                id={zona.id}
                data-material={zona.material}
                aria-labelledby={`titulo-${zona.id}`}
                className={`min-h-[80vh] scroll-mt-24 pt-16 transition-opacity duration-1000 ${
                  anomaliaAtiva ? "opacity-80" : "opacity-100"
                }`}
              >
                <p className="material-plano mb-6 inline-block rounded-full px-4 py-1 font-mono text-xs uppercase tracking-wide">
                  <DecryptedText
                    text={`Zona ${zona.nome} / ${zona.faixa}`}
                    delay={atrasoCascata}
                    speed={15}
                  />
                </p>

                <h2
                  id={`titulo-${zona.id}`}
                  className="text-3xl font-bold md:text-4xl"
                >
                  <DecryptedText
                    text={meta.titulo}
                    delay={atrasoCascata + 150}
                  />
                </h2>
                <p className="mb-10 mt-2 max-w-xl tenue">{meta.legenda}</p>

                <Secao perfil={perfil} onAtivarAnomalia={ativarAnomalia} />
              </section>
            </Fragment>
          );
        })}

        <RodapeZona />
      </main>
    </div>
  );
}

export default function App() {
  const [perfilAtivo, setPerfilAtivo] = useState<PerfilAcesso | null>(null);

  // A descida sempre começa na superfície, mesmo ao trocar de rota.
  useEffect(() => {
    if (!perfilAtivo) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [perfilAtivo]);

  const emergir = useCallback(() => {
    reiniciarProfundidade();
    setPerfilAtivo(null);
  }, []);

  if (!perfilAtivo) {
    return <PainelSubmarino onSelectProfile={setPerfilAtivo} />;
  }

  return <Portfolio perfil={perfilAtivo} onSair={emergir} />;
}
