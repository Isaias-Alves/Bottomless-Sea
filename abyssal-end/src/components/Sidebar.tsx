import { useState, useEffect } from "react";
import type { PerfilAcesso } from "./SonarSelector";

interface SidebarProps {
  perfil: PerfilAcesso;
}

const zonasBase = [
  { id: "epipelagica", depth: "0m" },
  { id: "mesopelagica", depth: "200m" },
  { id: "batipelagica", depth: "1000m" },
  { id: "abissopelagica", depth: "4000m" },
  { id: "hadal", depth: "6000m+" },
];

const ordemPerfis: Record<PerfilAcesso, string[]> = {
  mergulhador: ["Sobre Mim", "Stacks", "Projetos", "Experiência", "Contato"],
  sardinha: ["Sobre Mim", "Stacks", "Projetos", "Experiência", "Contato"],
  tubarao: ["Sobre Mim", "Experiência", "Stacks", "Projetos", "Contato"],
  baleia: ["Sobre Mim", "Experiência", "Projetos", "Stacks", "Contato"],
};

export function Sidebar({ perfil }: SidebarProps) {
  const [activeId, setActiveId] = useState("");

  const zonas = zonasBase.map((zona, index) => ({
    id: zona.id,
    label: ordemPerfis[perfil][index],
    depth: zona.depth,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    zonas.forEach((zona) => {
      const element = document.getElementById(zona.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [perfil]);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-10 items-end">
      <div className="absolute right-1.25 top-2 bottom-2 w-0.5 bg-white/20 -z-10"></div>

      {zonas.map((zona) => {
        const isActive = activeId === zona.id;

        return (
          <a
            key={zona.id}
            href={`#${zona.id}`}
            className={`group flex items-center gap-4 cursor-pointer transition-all duration-500 ease-out ${
              isActive ? "-translate-x-4" : "translate-x-0"
            }`}
          >
            <div
              className={`flex flex-col text-right transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              <span className="text-white font-bold text-sm tracking-widest uppercase">
                {zona.label}
              </span>
              <span className="text-white/50 text-xs font-mono">
                Depth: {zona.depth}
              </span>
            </div>

            <div className="relative flex justify-center items-center w-3 h-3">
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    : "w-2 h-2 bg-white/40 group-hover:w-3 group-hover:h-3 group-hover:bg-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                }`}
              ></div>
            </div>
          </a>
        );
      })}
    </nav>
  );
}
