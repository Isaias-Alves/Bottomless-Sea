import { useEffect, useState } from "react";
import { FaAppleAlt } from "react-icons/fa";
import type { SecaoProps } from "./tipos";
import { BIOGRAFIA, PESSOAL, type Idioma } from "../config/conteudo";

const CLIQUES_PARA_ANOMALIA = 3;

/** Espera a animação de chegada do <main> terminar (ver `.entrada-mergulho`).
 *  Enquanto ela roda, o <main> tem `transform` e ancora este aviso `fixed`
 *  nele, e não na viewport. */
const ATRASO_ENTRADA = 1000;
const DURACAO_AVISO = 12000;

export function Sobre({ perfil, onAtivarAnomalia }: SecaoProps) {
  const [cliques, setCliques] = useState(0);
  // O perfil não muda sem remontar a seção, então dá para derivar o estado
  // inicial da prop em vez de sincronizá-lo dentro de um efeito.
  const [aviso, setAviso] = useState<"aguardando" | "visivel" | "oculto">(
    perfil === "mergulhador" ? "aguardando" : "oculto",
  );
  const [idioma, setIdioma] = useState<Idioma>("pt");

  const conteudo = BIOGRAFIA[idioma];

  useEffect(() => {
    if (aviso === "oculto") return;

    const aguardando = aviso === "aguardando";
    const temporizador = setTimeout(
      () => setAviso(aguardando ? "visivel" : "oculto"),
      aguardando ? ATRASO_ENTRADA : DURACAO_AVISO,
    );

    return () => clearTimeout(temporizador);
  }, [aviso]);

  const aoClicarAvatar = () => {
    if (perfil !== "mergulhador" || !onAtivarAnomalia) return;

    const total = cliques + 1;
    setCliques(total);

    if (total === CLIQUES_PARA_ANOMALIA) {
      onAtivarAnomalia();
      setAviso("oculto");
      setTimeout(() => setCliques(0), 1000);
    }
  };

  return (
    <>
      {aviso === "visivel" && (
        <div
          role="status"
          className="fixed bottom-8 right-8 z-[60] flex max-w-sm items-start gap-4 rounded-xl border border-red-500/30 bg-black/95 p-5 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
          <svg
            className="mt-1 h-6 w-6 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="font-mono text-sm font-bold tracking-widest text-red-400">
              TRANSMISSÃO INTERCEPTADA
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Alguns mergulhadores encontraram uma{" "}
              <span className="font-bold text-red-400">maçã podre</span> próxima
              ao avatar. Sugerimos extrema cautela.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAviso("oculto")}
            aria-label="Fechar aviso"
            className="text-white/40 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={aoClicarAvatar}
            disabled={perfil !== "mergulhador"}
            title={
              perfil === "mergulhador" ? "Anomalia abissal detectada..." : ""
            }
            className={`relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/5 transition-all ${
              perfil === "mergulhador"
                ? "cursor-pointer hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "cursor-default"
            }`}
          >
            <img
              src={PESSOAL.foto}
              alt={PESSOAL.nome}
              className="h-full w-full object-cover"
            />
          </button>

          <p className="mt-4 text-xl font-semibold">{PESSOAL.nome}</p>

          {perfil === "mergulhador" && (
            <div className="mt-4 flex gap-3" aria-hidden="true">
              {Array.from({ length: CLIQUES_PARA_ANOMALIA }, (_, indice) => (
                <FaAppleAlt
                  key={indice}
                  className={`h-5 w-5 transition-all duration-700 ${
                    cliques > indice
                      ? "scale-90 text-black drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                      : "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="material relative flex-1 rounded-2xl p-8">
          <div className="absolute right-6 top-6 flex gap-2 font-mono text-xs">
            {(["pt", "en"] as const).map((chave, indice) => (
              <span key={chave} className="flex gap-2">
                {indice > 0 && <span className="text-white/20">|</span>}
                <button
                  type="button"
                  onClick={() => setIdioma(chave)}
                  aria-pressed={idioma === chave}
                  className={`transition-colors ${
                    idioma === chave
                      ? "font-bold realce"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {chave.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <h3 className="pr-20 text-2xl font-bold">{conteudo.cargo}</h3>
          <p className="mt-1 tenue">{conteudo.bioAcademica}</p>
          <p className="mt-6 leading-relaxed text-white/80">{conteudo.desc}</p>

          {(perfil === "tubarao" || perfil === "mergulhador") && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <h4 className="mb-3 text-lg font-bold text-red-400">
                {conteudo.tubaraoTitulo}
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-white/70">
                {conteudo.tubaraoLista.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {(perfil === "baleia" || perfil === "mergulhador") && (
            <div className="mt-6 flex flex-wrap gap-3">
              {conteudo.baleiaTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-purple-500/30 bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
