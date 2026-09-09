import { useEffect, useState } from "react";
import {
  MARCOS_PROFUNDIDADE,
  SECOES,
  ZONAS,
  obterPerfil,
  type PerfilAcesso,
} from "../config/zonas";

interface SidebarProps {
  perfil: PerfilAcesso;
}

/**
 * Giroscópio de profundidade. Os rótulos vêm da ordem de seções do perfil
 * e as profundidades de ZONAS/MARCOS — nada é redigitado aqui, então a
 * navegação não tem como divergir do conteúdo renderizado.
 */
export function Sidebar({ perfil }: SidebarProps) {
  const [idAtivo, setIdAtivo] = useState(ZONAS[0].id);

  const ordem = obterPerfil(perfil).ordem;
  const marcos = ZONAS.map((zona, indice) => ({
    id: zona.id,
    rotulo: SECOES[ordem[indice]].curto,
    profundidade:
      indice === ZONAS.length - 1
        ? `${MARCOS_PROFUNDIDADE[indice].toLocaleString("pt-BR")}m+`
        : `${MARCOS_PROFUNDIDADE[indice].toLocaleString("pt-BR")}m`,
  }));

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setIdAtivo(entrada.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const zona of ZONAS) {
      const elemento = document.getElementById(zona.id);
      if (elemento) observador.observe(elemento);
    }

    return () => observador.disconnect();
  }, [perfil]);

  return (
    <nav
      aria-label="Navegação por profundidade"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-10 md:flex"
    >
      <span className="absolute right-[5px] top-2 bottom-2 -z-10 w-px bg-white/20" />

      {marcos.map((marco) => {
        const ativo = idAtivo === marco.id;

        return (
          <a
            key={marco.id}
            href={`#${marco.id}`}
            aria-current={ativo ? "true" : undefined}
            className={`group flex items-center gap-4 transition-transform duration-500 ease-out ${
              ativo ? "-translate-x-4" : "translate-x-0"
            }`}
          >
            <span
              className={`flex flex-col text-right transition-all duration-300 ${
                ativo
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              }`}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                {marco.rotulo}
              </span>
              <span className="font-mono text-xs text-white/50">
                {marco.profundidade}
              </span>
            </span>

            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={`rounded-full transition-all duration-300 ${
                  ativo
                    ? "h-3 w-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    : "h-2 w-2 bg-white/40 group-hover:h-3 group-hover:w-3 group-hover:bg-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                }`}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
