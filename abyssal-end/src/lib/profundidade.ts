import { MARCOS_PROFUNDIDADE } from "../config/zonas";

/**
 * Monitor de profundidade — um único listener de scroll para toda a aplicação.
 *
 * Valores contínuos (razão de descida) são publicados como custom properties
 * no elemento raiz e consumidos direto pelo CSS: assim a lanterna, as
 * partículas e o brilho do sol reagem ao scroll sem provocar um único
 * re-render do React. Só a zona ativa, que é discreta, chega ao React.
 */

export interface EstadoProfundidade {
  /** 0 na superfície, 1 no piso da fossa. */
  razao: number;
  /** Profundidade interpolada, em metros. */
  metros: number;
  /** Índice da zona atual dentro de ZONAS. */
  zona: number;
}

type Ouvinte = (estado: EstadoProfundidade) => void;

const ouvintes = new Set<Ouvinte>();
let estado: EstadoProfundidade = { razao: 0, metros: 0, zona: 0 };
let frameAgendado = false;

function calcular(): EstadoProfundidade {
  const raiz = document.documentElement;
  const rolagemMaxima = raiz.scrollHeight - raiz.clientHeight;
  const razao =
    rolagemMaxima > 0
      ? Math.min(Math.max(raiz.scrollTop / rolagemMaxima, 0), 1)
      : 0;

  const segmentos = MARCOS_PROFUNDIDADE.length - 1;
  const posicao = razao * segmentos;
  const zona = Math.min(Math.floor(posicao), segmentos - 1);
  const progresso = posicao - zona;

  const metros = Math.round(
    MARCOS_PROFUNDIDADE[zona] +
      (MARCOS_PROFUNDIDADE[zona + 1] - MARCOS_PROFUNDIDADE[zona]) * progresso,
  );

  return { razao, metros, zona };
}

let jaPublicou = false;
let zonaPublicada = -1;

function publicar() {
  frameAgendado = false;

  const proximo = calcular();
  const mudou =
    proximo.razao !== estado.razao ||
    proximo.metros !== estado.metros ||
    proximo.zona !== estado.zona;

  // Sem mudança não há o que escrever nem quem notificar. Sem esta guarda,
  // cada frame de scroll reescrevia `data-zona` no <html> com o mesmo valor
  // — e uma mutação de atributo na raiz invalida o estilo de todo o
  // documento, justamente o custo que este monitor existe para evitar.
  if (jaPublicou && !mudou) return;

  estado = proximo;
  jaPublicou = true;

  const raiz = document.documentElement;
  raiz.style.setProperty("--profundidade", estado.razao.toFixed(4));

  if (estado.zona !== zonaPublicada) {
    zonaPublicada = estado.zona;
    raiz.dataset.zona = String(estado.zona);
  }

  for (const ouvinte of ouvintes) ouvinte(estado);
}

function agendar() {
  if (frameAgendado) return;
  frameAgendado = true;
  requestAnimationFrame(publicar);
}

/** Assina o monitor. Devolve a função de cancelamento. */
export function assinarProfundidade(ouvinte: Ouvinte): () => void {
  if (ouvintes.size === 0) {
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
  }

  ouvintes.add(ouvinte);
  ouvinte(estado);
  agendar();

  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    }
  };
}

export function lerProfundidade(): EstadoProfundidade {
  return estado;
}

/** Devolve o monitor ao estado de superfície (usado ao sair do portfólio). */
export function reiniciarProfundidade() {
  estado = { razao: 0, metros: 0, zona: 0 };
  jaPublicou = false;
  zonaPublicada = 0;

  const raiz = document.documentElement;
  raiz.style.setProperty("--profundidade", "0");
  raiz.dataset.zona = "0";
}
