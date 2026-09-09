import type { CSSProperties } from "react";
import type { SecaoProps } from "./tipos";
import {
  CERTIFICACOES,
  EXPERIENCIA,
  RESUMO_CORPORATIVO,
  visivelPara,
} from "../config/conteudo";

/** Marcador da linha do tempo, centrado sobre a régua vertical. */
function Marcador() {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-8 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 bg-white"
      style={{ borderColor: "var(--color-ocean-abyss)" }}
    />
  );
}

export function Experiencia({ perfil }: SecaoProps) {
  return (
    <div className="relative z-20">
      <ol className="relative border-l border-white/20 pl-8">
        {EXPERIENCIA.map((cargo) => (
          <li key={`${cargo.organizacao}-${cargo.periodo}`} className="relative mb-12 last:mb-0">
            <Marcador />
            <h3 className="text-xl font-bold">{cargo.titulo}</h3>
            <p className="font-mono text-sm tenue">
              {cargo.organizacao} • {cargo.periodo}
            </p>
            <p className="mt-4 max-w-2xl text-white/80">{cargo.descricao}</p>
          </li>
        ))}
      </ol>

      {visivelPara(RESUMO_CORPORATIVO.audiencia, perfil) && (
        <div
          className="material mt-12 rounded-2xl p-8"
          style={
            {
              "--material-borda": "#c084fc55",
              "--material-realce": "#c084fc",
            } as CSSProperties
          }
        >
          <h3 className="mb-6 text-xl font-bold realce">
            {RESUMO_CORPORATIVO.titulo}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {RESUMO_CORPORATIVO.numeros.map((numero) => (
              <div key={numero.rotulo}>
                <p className="text-3xl font-bold text-white">{numero.valor}</p>
                <p className="mt-1 text-sm text-white/60">{numero.rotulo}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/70">
            {RESUMO_CORPORATIVO.texto}
          </p>
        </div>
      )}

      {visivelPara(CERTIFICACOES.audiencia, perfil) && (
        <div className="mt-20">
          <h3 className="mb-8 text-2xl font-bold text-red-400">
            {CERTIFICACOES.titulo}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CERTIFICACOES.itens.map((certificacao) => (
              <div
                key={certificacao.titulo}
                className="material rounded-2xl p-5"
                style={
                  {
                    "--material-borda": "#f8717144",
                  } as CSSProperties
                }
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
                  {certificacao.ano}
                </p>
                <h4 className="mt-2 text-lg font-bold">{certificacao.titulo}</h4>
                <p className="mt-1 text-sm tenue">{certificacao.instituicao}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
