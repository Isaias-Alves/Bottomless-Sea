import { MARCOS_PROFUNDIDADE, PROFUNDIDADE_MAXIMA } from "../config/zonas";

/**
 * Leituras do console de mergulho, todas derivadas de UMA grandeza real.
 *
 * Antes cada mostrador do painel era uma constante escrita à mão —
 * 18.4 °C, 1.0 ATM, casco 100%. Ficavam coerentes entre si por acaso, e
 * paravam de ficar assim que qualquer um fosse mexido. Aqui só a
 * profundidade é dado; pressão, temperatura e carga sobre o casco saem
 * dela por função pura, do mesmo jeito que no portfólio um único
 * `--profundidade` alimenta lanterna, partículas e brilho do sol.
 *
 * Os valores em zero batem de propósito com os que estavam fixos no
 * código: na superfície o painel continua lendo exatamente o que lia.
 */

/** 1 ATM na superfície + 1 ATM a cada 10 m de coluna d'água. */
export function pressaoEm(metros: number): number {
  return metros / 10 + 1;
}

/**
 * Temperatura da água.
 *
 * Exponencial, e não reta, porque é assim que o oceano se comporta: quase
 * toda a queda acontece nos primeiros mil metros — a termoclina — e daí
 * para baixo a água fica estável em torno de 2 °C. Uma interpolação linear
 * daria 10 °C a 5.000 m, o que não existe em lugar nenhum do planeta.
 */
export function temperaturaEm(metros: number): number {
  return 2 + 16.4 * Math.exp(-metros / 700);
}

/**
 * Carga sobre o casco, em percentual de integridade.
 *
 * Não é medida de dano — é o quanto da margem estrutural a pressão já
 * consumiu. Por isso desce devagar e para em 88%: o casco aguenta a fossa,
 * só não aguenta com folga.
 */
export function cascoEm(metros: number): number {
  return 100 - 12 * (metros / PROFUNDIDADE_MAXIMA);
}

/**
 * Marulho: a oscilação de um submarino parado na superfície, esperando
 * ordem de descida.
 *
 * Duas senoides de períodos incomensuráveis, porque uma só produz um
 * vaivém de metrônomo que o olho identifica em dois ciclos. Somadas, o
 * padrão demora minutos para se repetir e lê como ondulação.
 */
export function marulhoEm(segundos: number): number {
  const onda = Math.sin(segundos / 1.9) * 0.6 + Math.sin(segundos / 3.7) * 0.4;
  return Math.max(0, 1.3 + onda * 1.25);
}

/** Aceleração da descida: começa lenta, o peso do lastro faz o resto. */
export function descidaEm(fracao: number): number {
  const t = Math.min(Math.max(fracao, 0), 1);
  return PROFUNDIDADE_MAXIMA * t * t * (3 - 2 * t);
}

/**
 * Índice da zona oceânica correspondente à profundidade.
 *
 * Usa os mesmos marcos do portfólio, e não uma régua própria: o painel
 * anuncia a zona com o mesmo critério que o `DepthHUD` vai anunciar
 * depois da comporta, então a leitura não muda de significado no meio
 * da descida.
 */
export function zonaEm(metros: number): number {
  let i = MARCOS_PROFUNDIDADE.length - 2;
  while (i > 0 && metros < MARCOS_PROFUNDIDADE[i]) i--;
  return i;
}
