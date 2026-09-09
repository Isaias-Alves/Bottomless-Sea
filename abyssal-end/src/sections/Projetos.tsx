import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { CSSProperties } from "react";
import type { SecaoProps } from "./tipos";
import { projetosPara } from "../config/projetos";
import { AssinaturaSonar } from "../components/AssinaturaSonar";

export function Projetos({ perfil }: SecaoProps) {
  const mostrarArquitetura = perfil === "baleia" || perfil === "mergulhador";
  const projetos = projetosPara(perfil);

  return (
    <div className="relative z-20 grid grid-cols-1 gap-6 md:grid-cols-3">
      {projetos.map((projeto) => (
        <article
          key={projeto.id}
          className="material flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
          style={
            {
              "--material-borda": `${projeto.cor}44`,
              "--material-realce": projeto.cor,
            } as CSSProperties
          }
        >
          <div className="border-b border-white/5 bg-black/20">
            <AssinaturaSonar semente={projeto.nome} cor={projeto.cor} />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold">{projeto.nome}</h3>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider tenue">
              {projeto.subtitulo}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {projeto.resumo}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {projeto.stack.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="etiqueta rounded px-2 py-0.5 font-mono text-[10px]"
                >
                  {tecnologia}
                </span>
              ))}
            </div>

            {mostrarArquitetura && (
              <p
                className="mt-4 w-fit rounded border px-2 py-1 font-mono text-[10px]"
                style={{
                  color: projeto.cor,
                  borderColor: `${projeto.cor}44`,
                  background: `${projeto.cor}12`,
                }}
              >
                {projeto.arquitetura}
              </p>
            )}

            <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-4">
              {projeto.repo || projeto.demo ? (
                <>
                  {projeto.repo && (
                    <a
                      href={projeto.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white realce"
                    >
                      <FaGithub aria-hidden="true" /> Repositório
                    </a>
                  )}
                  {projeto.demo && (
                    <a
                      href={projeto.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white realce"
                    >
                      <FaArrowUpRightFromSquare aria-hidden="true" /> Demo
                    </a>
                  )}
                </>
              ) : (
                /* Sem URL confirmada, o card assume um estado honesto em vez
                   de oferecer um link que não leva a lugar nenhum. */
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/35">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
                  Sinal em triangulação
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
