/**
 * O teto do oceano: ondas vistas por baixo e os feixes de sol que passam
 * por elas.
 *
 * Faltava a este portfólio o sinal mais barato de "isto é água": a
 * superfície. O gradiente azul sozinho podia ser céu noturno, papel de
 * parede ou tela de login — nada dizia que o visitante está EMBAIXO de
 * alguma coisa. As ondas dizem, e os feixes dizem de onde vem a luz.
 *
 * Tudo aqui é `position: fixed` e some com a profundidade: a superfície
 * não é um elemento do topo da página, é um lugar de onde se afasta.
 *
 * Nada neste arquivo passa pelo React depois da montagem — a opacidade das
 * duas camadas é função de `--profundidade`, publicada pelo monitor de
 * scroll direto no CSS.
 */
export function Superficie() {
  return (
    <div aria-hidden="true">
      {/* Feixes de sol. Duas camadas em ângulos e velocidades diferentes:
          uma só lê como listra de gradiente, duas se cruzam e lêem como
          luz atravessando água agitada. */}
      <div className="raios-solares">
        <div className="raios raios-largos" />
        <div className="raios raios-finos" />
      </div>

      <div className="superficie">
        {/* `preserveAspectRatio="none"` deixa a onda esticar na largura da
            viewport sem esticar a altura junto — é o que mantém a crista
            com a mesma espessura em 1440px e em 360px. */}
        <svg
          className="onda onda-fundo"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0 78 C 120 42 240 42 360 78 C 480 114 600 114 720 78 C 840 42 960 42 1080 78 C 1200 114 1320 114 1440 78 L1440 0 L0 0 Z" />
        </svg>

        <svg
          className="onda onda-frente"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0 60 C 180 20 300 96 480 60 C 660 24 780 96 960 60 C 1140 24 1260 96 1440 60 L1440 0 L0 0 Z" />
        </svg>

        {/* A linha de luz na própria interface ar/água. Sem ela as ondas
            são duas formas azuis; com ela, viram um limite. */}
        <div className="brilho-superficie" />
      </div>
    </div>
  );
}
