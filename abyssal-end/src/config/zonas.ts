/**
 * Geografia do portfólio — fonte única de verdade.
 *
 * Tudo que depende de "qual zona" ou "qual perfil" lê deste arquivo:
 * App, Sidebar, DepthHUD, painel de sonar e efeitos ambientais.
 * Antes essa informação vivia duplicada em App.tsx e Sidebar.tsx pareada
 * por índice, o que dessincronizava em silêncio a cada edição.
 */

export type ChaveSecao =
  "sobre" | "stacks" | "projetos" | "experiencia" | "contato";

export type PerfilAcesso = "sardinha" | "tubarao" | "baleia" | "mergulhador";

/** Material aplicado aos cards da zona — ver `[data-material]` em index.css. */
export type Material = "superficie" | "crepusculo" | "abismo" | "trincheira";

export interface Zona {
  id: string;
  nome: string;
  apelido: string;
  faixa: string;
  material: Material;
  /** Frase exibida na termoclina que antecede a zona. */
  travessia: string;
  /**
   * Ambientação da faixa de profundidade, exibida sob o título da seção.
   *
   * Mora na ZONA e não na seção porque descreve a descida, não o conteúdo
   * — e porque as rotas reordenam as seções. Presa à seção, a legenda de
   * "Sobre Mim" ("onde a luz do sol ainda revela") acompanhava a seção
   * para onde ela fosse: na rota Tubarão, "pressão colossal" já aparecia
   * a 200 m e "aos poucos o sol desaparece" a 1.000 m. Na zona, qualquer
   * ordem continua coerente.
   */
}

export const ZONAS: Zona[] = [
  {
    id: "epipelagica",
    nome: "Epipelágica",
    apelido: "Superfície",
    faixa: "0 – 200m",
    material: "superficie",
    travessia: "Luz solar direta. Tudo aqui ainda é visível a olho nu.",
  },
  {
    id: "mesopelagica",
    nome: "Mesopelágica",
    apelido: "Crepúsculo",
    faixa: "200 – 1.000m",
    material: "crepusculo",
    travessia: "A luz começa a falhar. As ferramentas assumem o comando.",
  },
  {
    id: "batipelagica",
    nome: "Batipelágica",
    apelido: "Meia-Noite",
    faixa: "1.000 – 4.000m",
    material: "abismo",
    travessia: "Escuridão total. Só a prática ilumina daqui em diante.",
  },
  {
    id: "abissopelagica",
    nome: "Abissopelágica",
    apelido: "O Abismo",
    faixa: "4.000 – 6.000m",
    material: "abismo",
    travessia: "Pressão colossal. Estruturas mal projetadas implodem.",
  },
  {
    id: "hadal",
    nome: "Hadal",
    apelido: "Trincheiras",
    faixa: "6.000m+",
    material: "trincheira",
    travessia: "Fundo da fossa. Último ponto de contato.",
  },
];

/**
 * Metro de entrada de cada zona, mais o piso da fossa das Marianas.
 * São 6 marcos para 5 zonas: cada zona ocupa o intervalo entre dois marcos.
 */
export const MARCOS_PROFUNDIDADE = [0, 200, 1000, 4000, 6000, 10935];

export const PROFUNDIDADE_MAXIMA =
  MARCOS_PROFUNDIDADE[MARCOS_PROFUNDIDADE.length - 1];

export interface MetaSecao {
  titulo: string;
  /** Rótulo curto usado na navegação lateral. */
  curto: string;
}

export const SECOES: Record<ChaveSecao, MetaSecao> = {
  sobre: {
    titulo: "Sobre Mim",
    curto: "Sobre",
  },
  stacks: {
    titulo: "Stacks Tecnológicas",
    curto: "Stacks",
  },
  projetos: {
    titulo: "Projetos em Destaque",
    curto: "Projetos",
  },
  experiencia: {
    titulo: "Experiência Profissional",
    curto: "Experiência",
  },
  contato: {
    titulo: "Contato",
    curto: "Contato",
  },
};

export type ChaveIcone = "sardinha" | "tubarao" | "baleia" | "mergulhador";

export interface Perfil {
  id: PerfilAcesso;
  nome: string;
  papel: string;
  foco: string;
  descricao: string;
  /** Cor de acento — usada no blip, na borda do card e no LED do HUD. */
  cor: string;
  ordem: ChaveSecao[];
  /**
   * Posição no sonar em coordenadas polares. Uma única fonte alimenta
   * três coisas: o lugar do blip, o rumo exibido na lista de contatos
   * e a fase do eco (para o blip acender quando a varredura passa).
   */
  rumo: number;
  distancia: number;
}

const ORDEM_PADRAO: ChaveSecao[] = [
  "sobre",
  "stacks",
  "projetos",
  "experiencia",
  "contato",
];

export const PERFIS: Perfil[] = [
  {
    id: "mergulhador",
    nome: "Mergulhador",
    papel: "Mergulho Livre",
    foco: "Percurso completo",
    descricao: "Rota original, sem filtros. Todas as camadas reveladas.",
    cor: "#22d3ee",
    ordem: ORDEM_PADRAO,
    rumo: 315,
    distancia: 0.55,
  },
  {
    id: "sardinha",
    nome: "Sardinha",
    papel: "Dev Indie",
    foco: "Stacks › Projetos",
    descricao: "Rota técnica: ferramentas e código antes de qualquer crachá.",
    cor: "#4ade80",
    ordem: ORDEM_PADRAO,
    rumo: 45,
    distancia: 0.5,
  },
  {
    id: "tubarao",
    nome: "Tubarão",
    papel: "Acadêmico",
    foco: "Experiência › Stacks",
    descricao: "Rota acadêmica: trajetória, pesquisa e certificações primeiro.",
    cor: "#f87171",
    ordem: ["sobre", "experiencia", "stacks", "projetos", "contato"],
    rumo: 200,
    distancia: 0.62,
  },
  {
    id: "baleia",
    nome: "Baleia",
    papel: "Corporativo",
    foco: "Experiência › Projetos",
    descricao: "Rota corporativa: atuação em time, escala e entrega.",
    cor: "#c084fc",
    ordem: ["sobre", "experiencia", "projetos", "stacks", "contato"],
    rumo: 130,
    distancia: 0.7,
  },
];

const PERFIS_POR_ID = new Map(PERFIS.map((perfil) => [perfil.id, perfil]));

export function obterPerfil(id: PerfilAcesso): Perfil {
  const perfil = PERFIS_POR_ID.get(id);
  if (!perfil) throw new Error(`Perfil desconhecido: ${id}`);
  return perfil;
}

/** Converte o par rumo/distância em coordenadas percentuais dentro do radar. */
export function posicaoNoRadar(perfil: Perfil) {
  const radianos = (perfil.rumo * Math.PI) / 180;
  const alcance = perfil.distancia * 46;
  return {
    x: 50 + alcance * Math.sin(radianos),
    y: 50 - alcance * Math.cos(radianos),
  };
}
