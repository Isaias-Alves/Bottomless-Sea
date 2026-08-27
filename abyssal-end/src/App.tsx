import { useState } from "react";
import { SonarSelector, type PerfilAcesso } from "./components/SonarSelector";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  // Estado que guarda qual perfil o usuário escolheu
  const [perfilAtivo, setPerfilAtivo] = useState<PerfilAcesso | null>(null);

  // Se o usuário ainda não escolheu um perfil, trava na tela do Sonar
  if (!perfilAtivo) {
    return <SonarSelector onSelectProfile={setPerfilAtivo} />;
  }

  // A partir daqui, o usuário escolheu o perfil.
  // O componente Portfólio é renderizado.
  return (
    <div className="relative w-full font-sans text-white">
      <Sidebar />

      <main className="mx-auto max-w-5xl px-6 py-12 md:pr-40">
        <header className="mb-32 mt-12 border-b border-white/20 pb-8">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/50">
            Acesso Autorizado: {perfilAtivo.toUpperCase()}
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">
            Portfólio — Zonas Oceânicas
          </h1>

          {/* Apenas para teste visual de troca: um botão para voltar ao Sonar e testar outro perfil */}
          <button
            onClick={() => setPerfilAtivo(null)}
            className="mt-6 text-sm text-ocean-surface underline hover:text-white"
          >
            [ Reiniciar Sonar ]
          </button>
        </header>

        {/* ... Restante do código do portfólio (vamos modularizar essas seções depois!) ... */}
      </main>
    </div>
  );
}
