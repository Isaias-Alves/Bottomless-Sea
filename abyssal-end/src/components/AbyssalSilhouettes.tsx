export function AbyssalSilhouettes() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Epipelágica/Mesopelágica: Arraia Jamanta */}
      <div className="absolute top-[15%] left-[-5%] w-[600px] opacity-[0.03] text-white rotate-12">
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 128C341 128 426 213 469 256C426 298 341 384 256 384C170 384 85 298 42 256C85 213 170 128 256 128Z" />
          <path d="M42 256L0 256L21 277L42 256Z" />
          <path d="M469 256L512 256L490 277L469 256Z" />
          <path d="M256 384L256 512L245 384Z" />
        </svg>
      </div>

      {/* Batipelágica: Cachalote Gigante */}
      <div className="absolute top-[45%] right-[-10%] w-[900px] opacity-[0.02] text-white -scale-x-100 -rotate-6">
        <svg
          viewBox="0 0 640 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M608 224C608 171 522 128 416 128C310 128 224 171 224 224C224 242 233 259 250 273C174 290 85 304 0 320C0 355 42 384 96 384C163 384 243 361 316 339C347 348 380 352 416 352C522 352 608 309 608 256C608 245 606 234 601 224L608 224Z" />
        </svg>
      </div>

      {/* Hadal (Fundo): Tentáculos do Kraken */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-end opacity-[0.04] text-white">
        {/* Tentáculos Esquerda */}
        <svg
          width="450"
          height="700"
          viewBox="0 0 400 700"
          fill="currentColor"
          className="transform -translate-x-10"
        >
          <path d="M50 700Q150 450 50 250T180 50Q100 300 200 500T180 700Z" />
          <path d="M250 700Q350 500 200 350T300 150Q200 350 350 550T320 700Z" />
        </svg>

        {/* Tentáculos Direita */}
        <svg
          width="550"
          height="850"
          viewBox="0 0 500 850"
          fill="currentColor"
          className="transform translate-x-20 scale-x-[-1]"
        >
          <path d="M100 850Q200 600 50 350T250 50Q100 400 300 650T280 850Z" />
          <path d="M350 850Q450 650 250 450T400 150Q250 450 500 700T420 850Z" />
          <path d="M-50 850Q50 700 -50 500T80 250Q-20 500 100 750T50 850Z" />
        </svg>
      </div>
    </div>
  );
}
