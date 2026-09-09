import type { PerfilAcesso } from "./zonas";

/**
 * Links conferidos contra a API do GitHub (github.com/Isaias-Alves).
 *
 * `El Banquero` segue com `repo: null` porque não há repositório público
 * correspondente — enquanto for nulo, o card assume o estado "SINAL EM
 * TRIANGULAÇÃO" em vez de oferecer um link morto.
 */

export interface Projeto {
  id: string;
  nome: string;
  subtitulo: string;
  resumo: string;
  stack: string[];
  /** Selo técnico mostrado a quem avalia arquitetura. */
  arquitetura: string;
  repo: string | null;
  demo: string | null;
  /** Cor do eco na assinatura de sonar do card. */
  cor: string;
  /** Perfis para os quais este projeto sobe ao topo da lista. */
  destaquePara: PerfilAcesso[];
}

export const PROJETOS: Projeto[] = [
  {
    id: "clinplay",
    nome: "ClinPlaY",
    subtitulo: "PWA Web/Mobile First",
    resumo:
      "Plataforma gamificada que conecta clínicas e pacientes de fisioterapia pélvica, com acompanhamento de sessões e adesão ao tratamento.",
    stack: ["TypeScript", "React", "MDX", "Tailwind"],
    arquitetura: "Arquitetura Componentizada / API REST",
    repo: "https://github.com/Isaias-Alves/Front-ClinPlay",
    demo: "https://front-clin-play.vercel.app",
    cor: "#22d3ee",
    destaquePara: ["baleia"],
  },
  {
    id: "el-banquero",
    nome: "El Banquero",
    subtitulo: "Algoritmo do Banqueiro",
    resumo:
      "Implementação do algoritmo do Banqueiro em Python para simular e prevenir deadlocks na alocação concorrente de recursos.",
    stack: ["Python", "Concorrência", "Estruturas de Dados"],
    arquitetura: "Algoritmos Otimizados / Concorrência",
    repo: null,
    demo: null,
    cor: "#4ade80",
    destaquePara: ["sardinha", "tubarao"],
  },
  {
    id: "coriollis",
    nome: "Coriolis PT-BR",
    subtitulo: "Módulo para Foundry VTT",
    resumo:
      "Tradução brasileira do sistema Coriolis RPG (EN › PT-BR) empacotada como módulo do Foundry VTT, com glossário padronizado e versionamento dos ativos.",
    stack: ["Foundry VTT", "JavaScript", "CSS", "Localização"],
    arquitetura: "Gestão de Ativos / Versionamento",
    repo: "https://github.com/Isaias-Alves/coriolis-rpg-traducao-pt-br",
    demo: null,
    cor: "#c084fc",
    destaquePara: ["mergulhador"],
  },
];

/**
 * Reordena os projetos conforme o perfil, mantendo a mesma ideia central do
 * portfólio: o visitante não muda o conteúdo, muda a ordem de leitura dele.
 */
export function projetosPara(perfil: PerfilAcesso): Projeto[] {
  return [...PROJETOS].sort((a, b) => {
    const pesoA = a.destaquePara.includes(perfil) ? 0 : 1;
    const pesoB = b.destaquePara.includes(perfil) ? 0 : 1;
    return pesoA - pesoB;
  });
}
