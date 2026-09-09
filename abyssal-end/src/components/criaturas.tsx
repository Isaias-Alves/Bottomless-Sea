/**
 * Silhuetas de fauna, desenhadas para serem lidas a 4% de opacidade e a
 * 60px de largura — que é como elas aparecem passando ao fundo.
 *
 * Por isso todas seguem as mesmas regras: contorno fechado, sem traço,
 * sem detalhe interno menor que ~3% do viewBox. Olho, guelra e escama
 * somem no primeiro downscale e só custam nós de path.
 *
 * Todas nadam para a DIREITA. Quem inverte o sentido é a camada, via
 * `--sentido` no keyframe de travessia — assim uma única árvore de SVG
 * serve aos dois rumos.
 */

interface PropsCriatura {
  /** Largura em px; a altura sai da razão do viewBox. */
  largura: number;
}

export function Peixe({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 100 44"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Cauda */}
      <path d="M27 22 L5 5 C11 13 11 31 5 39 Z" />
      {/* Corpo */}
      <path d="M27 22 C39 7 64 3 84 11 C93 15 98 21 98 22 C98 23 93 29 84 33 C64 41 39 37 27 22 Z" />
      {/* Dorsal */}
      <path d="M55 9 C62 1 73 0 79 5 C70 5 62 6 55 9 Z" />
      {/* Ventral */}
      <path d="M55 35 C61 39 70 40 76 37 C68 37 61 36 55 35 Z" />
    </svg>
  );
}

/**
 * Cardume: um grupo inteiro num só nó animado.
 *
 * Vinte peixes independentes seriam vinte elementos compostos e vinte
 * animações — e ainda assim pareceriam vinte peixes soltos, não um
 * cardume. Agrupados, o navegador anima um elemento e o olho lê banco.
 */
export function Cardume({ largura }: PropsCriatura) {
  // Deslocamentos em % do viewBox. Escolhidos à mão: fileiras escalonadas,
  // nunca alinhadas, porque cardume alinhado parece grade.
  const membros = [
    { x: 0, y: 26, e: 1 },
    { x: 22, y: 8, e: 0.85 },
    { x: 26, y: 44, e: 0.9 },
    { x: 48, y: 22, e: 1 },
    { x: 52, y: 62, e: 0.8 },
    { x: 74, y: 4, e: 0.75 },
    { x: 78, y: 38, e: 0.95 },
    { x: 96, y: 58, e: 0.8 },
    { x: 118, y: 18, e: 0.9 },
    { x: 124, y: 48, e: 0.7 },
  ];

  return (
    <svg
      width={largura}
      viewBox="0 0 190 90"
      fill="currentColor"
      aria-hidden="true"
    >
      {membros.map((membro, i) => (
        <g
          key={i}
          transform={`translate(${membro.x} ${membro.y}) scale(${membro.e * 0.4})`}
        >
          <path d="M27 22 L5 5 C11 13 11 31 5 39 Z" />
          <path d="M27 22 C39 7 64 3 84 11 C93 15 98 21 98 22 C98 23 93 29 84 33 C64 41 39 37 27 22 Z" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Jamanta vista de cima, planando para a direita.
 *
 * Arraia não tem perfil lateral que se leia — de lado ela é um traço. Por
 * isso esta é a única criatura do conjunto desenhada em planta: cabeça à
 * direita, asas abertas para cima e para baixo da tela, pontas varridas
 * PARA TRÁS. Asa varrida para frente vira guarda-chuva.
 */
export function Arraia({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 172 128"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Cauda, em chicote */}
      <path d="M46 61 C32 62 16 63 2 64 C16 66 32 67 46 68 Z" />
      {/* Disco. Duas regras, e as duas custaram uma rodada de desenho:
          o bordo de ataque é CONVEXO (pontos de controle à FRENTE da
          corda — atrás dela a arraia vira bumerangue), e o bordo de fuga
          é quase reto, com a raiz da cauda recuada até a altura das pontas
          das asas. Cavá-lo até o meio do corpo afina o centro do disco e
          o que sobra é uma concha de vieira. Os dois bordos precisam
          ainda se encontrar em ângulo fechado na ponta: arredondada, a
          asa lê escudo. */}
      <path d="M150 63 C146 36 120 16 86 9 C64 5 38 5 18 8 C26 20 38 36 46 51 L46 75 C38 90 26 106 18 118 C38 121 64 121 86 117 C120 110 146 90 150 63 Z" />
      {/* Nadadeiras cefálicas: o par de lobos junto à boca. É o detalhe que
          separa jamanta de "triângulo escuro". */}
      <path d="M144 52 C152 45 162 42 168 44 C161 49 153 55 147 60 Z" />
      <path d="M144 74 C152 81 162 84 168 82 C161 77 153 71 147 66 Z" />
    </svg>
  );
}

/**
 * Tartaruga vista de cima.
 *
 * O que a distingue de "mancha oval com quatro cotocos" são as peitorais:
 * longas, varridas para trás como asas, saindo MUITO além da linha do
 * casco. Encolhê-las para caber no viewBox é exatamente o que transforma
 * a silhueta num besouro.
 */
export function Tartaruga({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 160 122"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Peitorais: tão longas quanto o casco e afilando até quase nada na
          ponta. Curtas e grossas — que é o erro fácil — viram orelhas. */}
      <path d="M97 38 C112 23 132 9 155 3 C151 12 142 23 127 35 C117 44 106 49 98 49 Z" />
      <path d="M97 82 C112 97 132 111 155 117 C151 108 142 97 127 85 C117 76 106 71 98 71 Z" />
      {/* Traseiras: curtas, varridas para trás */}
      <path d="M41 44 C31 35 17 27 4 25 C10 35 23 46 39 52 Z" />
      <path d="M41 76 C31 85 17 93 4 95 C10 85 23 74 39 68 Z" />
      {/* Carapaça em gota: ombro largo à frente, afilando até a traseira.
          Redonda, a silhueta perde o rumo — não dá para dizer para que
          lado o bicho nada, e nadadeira simétrica em casco redondo lê
          gravata-borboleta. */}
      <path d="M108 60 C108 36 90 22 68 22 C46 22 28 34 22 50 C21 54 21 66 23 71 C30 85 46 94 66 94 C90 94 108 82 108 60 Z" />
      {/* Cabeça, destacada além da linha do casco */}
      <path d="M104 48 C120 43 137 49 141 60 C137 71 120 77 104 72 Z" />
    </svg>
  );
}

/**
 * Cachalote. Três traços o separam de "peixe grande", e todos os três
 * precisam sobreviver ao downscale: a testa CHATA e vertical, a mandíbula
 * fina correndo por baixo dela, e a ausência de dorsal — cachalote tem
 * corcova, não barbatana.
 */
export function Cachalote({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 244 96"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Flucas */}
      <path d="M44 48 L4 16 C14 30 14 66 4 80 Z" />
      {/* Corpo. A parede reta em x=236 é um terço do comprimento: é ela que
          faz a silhueta ler como cachalote e não como baleia qualquer. */}
      <path d="M236 28 C238 22 234 19 226 19 C196 19 148 20 110 25 C86 29 62 36 42 48 C62 60 86 67 110 71 C148 76 196 77 226 77 C234 77 238 74 236 68 Z" />
      {/* Mandíbula: fina, reta e recuada sob a testa. */}
      <path d="M232 71 C216 79 194 82 174 80 C196 76 216 73 232 68 Z" />
      {/* Corcova e as vértebras que descem dela até a cauda. */}
      <path d="M84 30 C94 20 108 18 116 23 C104 24 93 26 84 30 Z" />
      <path d="M50 44 C58 40 66 38 72 38 C66 41 58 44 52 47 Z" />
      {/* Peitoral, curta e baixa */}
      <path d="M150 73 C156 85 168 93 180 95 C170 87 162 80 158 73 Z" />
    </svg>
  );
}

/**
 * Lula, deslocando-se a jato — manto na frente, braços arrastando atrás.
 * É o sentido real de nado do bicho, e também o único que deixa o feixe de
 * tentáculos legível: à frente eles viram um borrão colado no corpo.
 */
export function Lula({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 172 92"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Manto, terminando em ponta */}
      <path d="M168 46 C156 24 134 14 112 14 C96 14 86 27 86 46 C86 65 96 78 112 78 C134 78 156 68 168 46 Z" />
      {/* Aletas triangulares na ponta do manto */}
      <path d="M166 46 C156 26 142 12 130 6 C140 20 145 33 146 46 C145 59 140 72 130 86 C142 80 156 66 166 46 Z" />
      {/* Cabeça, entre o manto e a coroa de braços */}
      <path d="M86 34 L74 35 C69 38 69 54 74 57 L86 58 Z" />
      {/* Os oito braços curtos */}
      <path d="M74 38 C58 32 40 28 20 30 C38 34 57 39 74 42 Z" />
      <path d="M74 44 C52 44 30 47 8 53 C30 53 53 50 74 47 Z" />
      <path d="M74 50 C58 57 42 66 28 78 C44 66 60 58 74 53 Z" />
      {/* Os dois tentáculos longos, terminando na maça de captura */}
      <path d="M74 40 C48 30 24 20 2 17 C4 22 9 25 16 26 C36 30 56 36 73 44 Z" />
      <path d="M74 48 C52 60 30 72 10 88 C16 90 23 88 29 84 C45 72 59 63 73 56 Z" />
    </svg>
  );
}

/**
 * Água-viva. Uma cúpula lisa sobre riscos retos é um abajur — o que faz o
 * olho ler medusa é a umbrela ACHATADA (mais larga que alta), a franja
 * recortada na borda e o tentáculo que ondula em vez de descer reto.
 *
 * Ela não "nada para a direita" como o resto da fauna: deriva. Por isso é
 * simétrica, e espelhá-la pelo `--sentido` não muda nada — de propósito.
 */
export function AguaViva({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 110 176"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Umbrela: 100 de largura para 38 de altura. Cúpula alta lê cogumelo;
          o que lê medusa é a calota rasa com a franja recortada na borda. */}
      <path d="M5 46 C5 24 27 8 55 8 C83 8 105 24 105 46 C97 40 90 53 80 45 C71 55 62 43 55 51 C48 43 39 55 30 45 C20 53 13 40 5 46 Z" />
      {/* Braços orais: curtos, largos, franzidos */}
      <path d="M40 48 C32 68 44 84 34 106 C26 84 34 66 36 48 Z" />
      <path d="M70 48 C78 68 66 84 76 106 C84 84 76 66 74 48 Z" />
      <path d="M55 51 C50 74 60 92 55 118 C48 92 52 72 52 51 Z" />
      {/* Tentáculos marginais. A ondulação precisa de amplitude real — a
          curva discreta que eu tinha antes reta na renderização e a medusa
          fica com quatro barras penduradas, que é um pente, não um bicho. */}
      <path d="M10 47 C0 70 18 92 4 128 C-2 96 4 70 7 47 Z" />
      <path d="M26 46 C14 76 34 100 20 152 C8 104 20 74 23 46 Z" />
      <path d="M84 46 C96 76 76 100 90 152 C102 104 90 74 87 46 Z" />
      <path d="M100 47 C110 70 92 92 106 128 C112 96 106 70 103 47 Z" />
    </svg>
  );
}

/**
 * Peixe-pescador. A isca fica num nó separado (`.isca`) porque é o único
 * ponto da fauna que emite luz em vez de bloquear — a camada pinta o corpo
 * de escuro e deixa a isca acender por conta própria.
 */
export function PeixePescador({ largura }: PropsCriatura) {
  return (
    <svg
      width={largura}
      viewBox="0 0 148 108"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Cauda */}
      <path d="M26 62 L4 44 C10 53 10 73 4 84 Z" />
      {/* Corpo globular. Termina em x=96 porque o terço final da silhueta
          é só boca — é essa desproporção que identifica o bicho. */}
      <path d="M26 62 C26 40 42 26 66 26 C86 26 100 34 106 46 L106 76 C92 84 62 86 44 79 C32 74 26 68 26 62 Z" />
      {/* Maxilar superior e a mandíbula, abertos num ângulo largo. */}
      <path d="M100 44 C112 46 126 52 136 60 C126 62 112 62 98 60 Z" />
      <path d="M98 68 C112 70 126 74 136 82 C124 92 106 94 94 88 C88 85 88 74 98 68 Z" />
      {/* Dentes. Grandes de propósito: presa fina some no primeiro
          downscale, e sem presa a cabeça vira uma bolha. */}
      <path d="M104 60 L108 72 L113 60 Z" />
      <path d="M116 60 L121 74 L126 62 Z" />
      <path d="M110 74 L114 62 L119 73 Z" />
      <path d="M124 78 L127 66 L132 76 Z" />
      {/* Ilício: a haste sai da testa, arqueia para a frente e leva a isca
          exatamente sobre a boca — que é para onde ela atrai. */}
      <path d="M72 28 C70 14 84 4 104 2 L105 9 C90 11 79 17 78 29 Z" />
      {/* Peitoral */}
      <path d="M60 80 C62 90 70 98 80 100 C72 92 66 86 64 80 Z" />
      {/* Dorsal esfarrapada */}
      <path d="M46 27 C50 18 58 12 64 11 C58 16 54 21 52 27 Z" />
      <circle className="isca" cx="108" cy="6" r="8" />
    </svg>
  );
}
