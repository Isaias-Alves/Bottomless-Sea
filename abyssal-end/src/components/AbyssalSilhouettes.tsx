/**
 * Fundo da fossa.
 *
 * Este componente já carregou também uma arraia e um cachalote, ancorados a
 * 15% e 45% da PÁGINA. Como a página tem cinco zonas de altura, os dois
 * caíam no meio de uma seção qualquer e ficavam ali, parados — a 2% de
 * opacidade não liam como bicho, liam como mancha no gradiente. Os dois
 * viraram fauna de verdade em `VidaMarinha`, que atravessa a viewport e
 * respeita a profundidade em que cada espécie vive.
 *
 * O que restou é o que sempre foi cenário e não fauna: o piso da
 * trincheira. Ele é `absolute` de propósito — não segue o scroll como as
 * camadas `fixed`, ele espera lá embaixo e só é alcançado ao fim da
 * descida.
 */
export function AbyssalSilhouettes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <div className="absolute bottom-0 left-0 flex w-full items-end justify-between text-white opacity-[0.04]">
        {/* Tentáculos à esquerda */}
        <svg
          width="450"
          height="700"
          viewBox="0 0 400 700"
          fill="currentColor"
          className="-translate-x-10 transform"
        >
          <path d="M50 700Q150 450 50 250T180 50Q100 300 200 500T180 700Z" />
          <path d="M250 700Q350 500 200 350T300 150Q200 350 350 550T320 700Z" />
        </svg>

        {/* Tentáculos à direita */}
        <svg
          width="550"
          height="850"
          viewBox="0 0 500 850"
          fill="currentColor"
          className="translate-x-20 scale-x-[-1] transform"
        >
          <path d="M100 850Q200 600 50 350T250 50Q100 400 300 650T280 850Z" />
          <path d="M350 850Q450 650 250 450T400 150Q250 450 500 700T420 850Z" />
          <path d="M-50 850Q50 700 -50 500T80 250Q-20 500 100 750T50 850Z" />
        </svg>
      </div>
    </div>
  );
}
