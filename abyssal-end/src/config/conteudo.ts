import type { PerfilAcesso } from "./zonas";

/**
 * Conteúdo editável do portfólio. Separado dos componentes de propósito:
 * atualizar o currículo não deveria exigir abrir um arquivo de JSX.
 */

/** `"todos"` ou a lista explícita de perfis que enxergam o bloco. */
export type Audiencia = "todos" | PerfilAcesso[];

export function visivelPara(audiencia: Audiencia, perfil: PerfilAcesso) {
  return audiencia === "todos" || audiencia.includes(perfil);
}

export const PESSOAL = {
  nome: "Isaías Alves",
  foto: "/EU.jpg",
  email: "isaiasalvesdesouzasantos@gmail.com",
  github: "https://github.com/Isaias-Alves",
  linkedin: "https://www.linkedin.com/in/isaias-alves",
};

export const BIOGRAFIA = {
  pt: {
    cargo: "Desenvolvedor de Software Front-End",
    bioAcademica: "19 anos • 4ºP Engenharia de Software (PUC Minas)",
    desc: "Tenho foco na construção de sistemas eficientes e escaláveis. Trabalho em projetos pessoais dos mais diversos tipos, desde aplicações web até mesmo módulos para RPG de mesa.",
    tubaraoTitulo: "Foco Acadêmico & Soft Skills",
    tubaraoLista: [
      "Interesse ativo em Iniciação Científica e Pesquisa.",
      "Comunicação assertiva e adaptável ao público.",
      "Experiência em grupos de iniciação científica no Ensino Médio.",
      "Inglês Avançado (Leitura e Escrita técnica fluentes).",
    ],
    baleiaTags: [
      "Disponível para Estágio",
      "Trabalho em Equipe",
      "Pensamento Analítico",
    ],
  },
  en: {
    cargo: "Front-End Software Developer",
    bioAcademica: "19 years old • 4th Term Software Engineering (PUC Minas)",
    desc: "My focus is on building efficient and scalable systems. I work on personal projects of various kinds, ranging from web applications to tabletop RPG modules.",
    tubaraoTitulo: "Academic Focus & Soft Skills",
    tubaraoLista: [
      "Active interest in Scientific Initiation and Research.",
      "Assertive communication adaptable to the audience.",
      "Experience in high school scientific initiation groups.",
      "Advanced English (Fluent technical reading and writing).",
    ],
    baleiaTags: [
      "Available for Internship",
      "Teamwork",
      "Analytical Thinking",
    ],
  },
} as const;

export type Idioma = keyof typeof BIOGRAFIA;

export interface GrupoStack {
  titulo: string;
  legenda: string;
  itens: string[];
  audiencia: Audiencia;
  /** Cor de acento do card; `undefined` usa o material da zona. */
  cor?: string;
}

export const STACKS: GrupoStack[] = [
  {
    titulo: "Frontend",
    legenda: "Interface, estado e experiência",
    itens: ["React", "TypeScript", "Tailwind CSS", "HTML", "JavaScript"],
    audiencia: "todos",
  },
  {
    titulo: "Backend & Ferramentas",
    legenda: "Dados, lógica e ambiente",
    itens: ["Java", "Python", "SQL", "Spring Boot", "Linux", "Git"],
    audiencia: "todos",
  },
  {
    titulo: "Práticas de Engenharia",
    legenda: "Como o time entrega, não só o que",
    itens: [
      "Scrum / Kanban",
      "Clean Code",
      "Revisão de Código (PRs)",
      "UML & BPMN",
      "Design Patterns",
    ],
    audiencia: ["baleia", "mergulhador"],
    cor: "#c084fc",
  },
];

export interface Metrica {
  rotulo: string;
  valor: string;
}

export const METRICAS: { itens: Metrica[]; audiencia: Audiencia } = {
  audiencia: ["sardinha", "mergulhador"],
  itens: [
    { valor: "5+", rotulo: "Projetos Independentes" },
    { valor: "15+", rotulo: "CTFs & Desafios" },
    { valor: "400+", rotulo: "Commits no Ano" },
    { valor: "8000+", rotulo: "Tentativas de Centralizar a DIV" },
  ],
};

export interface Cargo {
  titulo: string;
  organizacao: string;
  periodo: string;
  descricao: string;
}

export const EXPERIENCIA: Cargo[] = [
  {
    titulo: "Scrum Master & Desenvolvedor Lead",
    organizacao: "ClinPlaY",
    periodo: "2026",
    descricao:
      "Liderança na arquitetura e codificação de sistema gamificado focado em fisioterapia pélvica.",
  },
];

export const RESUMO_CORPORATIVO = {
  audiencia: ["baleia", "mergulhador"] as Audiencia,
  titulo: "Resumo de Atuação Corporativa",
  numeros: [
    { valor: "4+", rotulo: "Pessoas na Equipe Base" },
    { valor: "Escala", rotulo: "Projetos para 100+ usuários" },
    { valor: "Agile", rotulo: "Colaboração & Entregas" },
  ],
  texto:
    "Experiência prática com desenvolvimento em times horizontais, tomada de decisão sob pressão e gerenciamento de escopo e prazo em projetos de software voltados para uso cotidiano. Conhecimentos ágeis e de projetos arquiteturais de software.",
};

export interface Certificacao {
  titulo: string;
  instituicao: string;
  ano: string;
}

export const CERTIFICACOES: {
  audiencia: Audiencia;
  titulo: string;
  itens: Certificacao[];
} = {
  audiencia: ["tubarao", "mergulhador"],
  titulo: "Certificações Acadêmicas",
  itens: [
    {
      titulo: "Grupo de Iniciação Científica",
      instituicao: "E. E. Visconde do Rio das Velhas",
      ano: "2024",
    },
    {
      titulo: "Apadrinhamento de Calouros",
      instituicao: "PUC Minas",
      ano: "2025",
    },
  ],
};
