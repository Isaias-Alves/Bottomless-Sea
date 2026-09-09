import type { CSSProperties } from "react";
import type { SecaoProps } from "./tipos";
import { METRICAS, STACKS, visivelPara } from "../config/conteudo";

export function Stacks({ perfil }: SecaoProps) {
  const grupos = STACKS.filter((grupo) => visivelPara(grupo.audiencia, perfil));

  return (
    <div className="relative z-20 flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {grupos.map((grupo) => (
          <div
            key={grupo.titulo}
            className="material rounded-2xl p-6"
            // Cor de acento do grupo entra como override do material da zona,
            // em vez de trocar o card inteiro por um fundo colorido.
            style={
              grupo.cor
                ? ({
                    "--material-borda": `${grupo.cor}55`,
                    "--material-realce": grupo.cor,
                  } as CSSProperties)
                : undefined
            }
          >
            <h3 className="text-xl font-bold realce">{grupo.titulo}</h3>
            <p className="mb-4 mt-1 font-mono text-[11px] uppercase tracking-wider tenue">
              {grupo.legenda}
            </p>

            <div className="flex flex-wrap gap-2">
              {grupo.itens.map((item) => (
                <span key={item} className="etiqueta rounded px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {visivelPara(METRICAS.audiencia, perfil) && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {METRICAS.itens.map((metrica) => (
            <div
              key={metrica.rotulo}
              className="material-plano flex flex-col items-center justify-center rounded-2xl p-4 text-center hover:-translate-y-1"
            >
              <span className="text-3xl font-bold realce">{metrica.valor}</span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                {metrica.rotulo}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
