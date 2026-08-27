import React, { useState } from "react";
import { SonarSelector, type PerfilAcesso } from "./components/SonarSelector";
import { Sidebar } from "./components/Sidebar";

export interface SecaoProps {
  perfil: PerfilAcesso;
}

// Configurações de exibição e ordenação
const ordemPerfis: Record<PerfilAcesso, string[]> = {
  mergulhador: ["sobre", "stacks", "projetos", "experiencia", "contato"],
  sardinha: ["sobre", "stacks", "projetos", "experiencia", "contato"],
  tubarao: ["sobre", "experiencia", "stacks", "projetos", "contato"],
  baleia: ["sobre", "experiencia", "projetos", "stacks", "contato"],
};

const ZONAS_OCEANO = [
  { nome: "Superfície", prof: "0 - 200m" },
  { nome: "Crepúsculo", prof: "200 - 1000m" },
  { nome: "Meia-Noite", prof: "1000 - 4000m" },
  { nome: "O Abismo", prof: "4000 - 6000m" },
  { nome: "Trincheiras", prof: "6000m+" },
];

const IDs_MARITIMOS = [
  "epipelagica",
  "mesopelagica",
  "batipelagica",
  "abissopelagica",
  "hadal",
];

// Componentes de conteúdo das seções
const ConteudoSobre: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
    <div className="flex flex-col items-center">
      <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm">
        <span className="text-sm text-white/50">Avatar</span>
      </div>
      <p className="mt-4 text-xl font-semibold">Isaías Alves</p>
    </div>

    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
      <h3 className="text-2xl font-bold">
        Desenvolvedor de Software Front-End
      </h3>
      <p className="mt-1 text-white/50">
        19 anos • 4ºP Engenharia de Software (PUC Minas)
      </p>
      <p className="mt-6 leading-relaxed text-white/80">
        Tenho foco na construção de sistemas eficientes e escaláveis. Trabalho
        em projetos pessoais dos mais diversos tipos, desde aplicações web até
        mesmo módulos para RPG de mesa.
      </p>

      {/* Exclusivo para o perfil Acadêmico */}
      {perfil === "tubarao" && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <h4 className="text-lg font-bold text-red-400 mb-3">
            Foco Acadêmico & Soft Skills
          </h4>
          <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
            <li>Interesse ativo em Iniciação Científica e Pesquisa.</li>
            <li>Comunicação assertiva e adaptável ao público.</li>
            <li>
              Experiência em grupos de iniciação científica no Ensino Médio.
            </li>
            <li>Inglês Avançado (Leitura e Escrita técnica fluentes).</li>
          </ul>
        </div>
      )}

      {/* Exclusivo para o perfil Corporativo */}
      {perfil === "baleia" && (
        <div className="mt-6 flex gap-3">
          <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-bold">
            Disponível para Estágio
          </span>
          <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-bold">
            Trabalho em Equipe
          </span>
          <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs font-bold">
            Pensamento Analítico
          </span>
        </div>
      )}
    </div>
  </div>
);

const ConteudoStacks: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="flex flex-col gap-8">
    {/* Cards Padrão de Stacks */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="mb-4 text-xl font-bold">Frontend</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Tailwind CSS", "HTML", "JavaScript"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm transition-colors hover:bg-white/10"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="mb-4 text-xl font-bold">Backend & Ferramentas</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Java",
            "Python",
            "SQL",
            "Spring Boot",
            "Linux",
            "Prompt Engineering",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm transition-colors hover:bg-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Renderização Condicional - Exclusivo Sardinha (Dev Indie / Parcerias) */}
    {perfil === "sardinha" && (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Projetos Independentes", value: "5+" },
          { label: "CTFs & Desafios", value: "15+" },
          { label: "Commits no Ano", value: "400+" },
          { label: "Tentativas de Centralizar a DIV", value: "8000+" },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/5 p-4 text-center backdrop-blur-md transition-transform hover:scale-105"
          >
            <span className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
              {stat.value}
            </span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);
const ConteudoProjetos: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    {[
      "ClinPlaY (Web/Mobile)",
      "El Banquero (Deadlocks)",
      "Coriollis (Tradução PT-BR)",
    ].map((proj) => (
      <div
        key={proj}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
      >
        <h3 className="text-xl font-bold">{proj}</h3>
        <a
          href="#"
          className="mt-8 inline-block border-t border-white/10 pt-4 text-sm font-semibold hover:text-blue-300"
        >
          Ver projeto →
        </a>
      </div>
    ))}
  </div>
);

const ConteudoExperiencia: React.FC<SecaoProps> = ({ perfil }) => (
  <div>
    {/* Linha do Tempo Vertical - Experiência Padrão */}
    <div className="relative border-l border-white/20 pl-8">
      <div className="mb-12 relative">
        <div className="absolute -left-10.25 top-0.1 h-5 w-5 rounded-full bg-white border-4 border-ocean-abyss"></div>
        <h3 className="text-xl font-bold">Scrum Master & Desenvolvedor Lead</h3>
        <p className="text-white/50">ClinPlaY • 2026</p>
        <p className="mt-4 text-white/80">
          Liderança na arquitetura e codificação de sistema gamificado focado em
          fisioterapia pélvica.
        </p>
      </div>
    </div>

    {/* Renderização Condicional - Exclusivo Tubarão (Professor/Acadêmico) */}
    {perfil === "tubarao" && (
      <div className="mt-24">
        <h3 className="mb-10 text-2xl font-bold text-red-400">
          Certificações Acadêmicas
        </h3>

        <div className="relative">
          {/* Linha guia horizontal (Exibida apenas em telas md+) */}
          <div className="absolute left-0 top-2.25 hidden w-full border-t border-white/20 md:block"></div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                titulo: "Grupo de Iniciação Científica",
                inst: "Escola Estadual Visconde do Rio das Velhas",
                ano: "2024",
              },
              {
                titulo: "Apadrinhamento de Calouros",
                inst: "Puc Minas",
                ano: "2025",
              },
            ].map((cert, index) => (
              <div key={index} className="relative pl-8 md:pl-0 md:pt-8">
                {/* Linha guia vertical (Exibida apenas em telas mobile) */}
                <div className="absolute left-2.25 top-0 h-full border-l border-white/20 md:hidden"></div>

                {/* Bolinha marcadora da linha do tempo */}
                <div className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white border-4 border-ocean-abyss md:left-0 md:-top-[1px]"></div>

                <h4 className="text-lg font-bold">{cert.titulo}</h4>
                <p className="text-sm text-white/50">
                  {cert.inst} • {cert.ano}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const ConteudoContato: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="w-full text-center rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
    <h2 className="mb-4 text-3xl font-bold">Chegamos ao fundo.</h2>
    <a
      href="mailto:isaiasalvesdesouzasantos@gmail.com"
      className="mb-8 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
    >
      isaiasalvesdesouzasantos@gmail.com
    </a>
  </div>
);

// Mapeamento referencial dos componentes
const COMPONENTES_SECAO: Record<
  string,
  { titulo: string; component: React.FC<SecaoProps> }
> = {
  sobre: { titulo: "Sobre Mim", component: ConteudoSobre },
  stacks: { titulo: "Stacks Tecnológicas", component: ConteudoStacks },
  projetos: { titulo: "Projetos em Destaque", component: ConteudoProjetos },
  experiencia: {
    titulo: "Experiência Profissional",
    component: ConteudoExperiencia,
  },
  contato: { titulo: "Contato", component: ConteudoContato },
};

export default function App() {
  const [perfilAtivo, setPerfilAtivo] = useState<PerfilAcesso | null>(null);

  if (!perfilAtivo) {
    return <SonarSelector onSelectProfile={setPerfilAtivo} />;
  }

  const ordemAtual = ordemPerfis[perfilAtivo];

  return (
    <div className="relative w-full font-sans text-white">
      <Sidebar perfil={perfilAtivo} />

      <main className="mx-auto max-w-5xl px-6 py-12 md:pr-40">
        <header className="mb-32 mt-12 border-b border-white/20 pb-8">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/50">
            Acesso Autorizado: {perfilAtivo.toUpperCase()}
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">Abyssal End</h1>

          <button
            onClick={() => setPerfilAtivo(null)}
            className="mt-6 text-sm font-mono text-ocean-surface hover:text-white transition-colors"
          >
            [ Resetar Sonar ]
          </button>
        </header>

        {ordemAtual.map((chaveSecao, index) => {
          const SecaoAtual = COMPONENTES_SECAO[chaveSecao];
          const SecaoComponente = SecaoAtual.component;
          const metadadosZona = ZONAS_OCEANO[index];
          const idFixoMaritimo = IDs_MARITIMOS[index];

          return (
            <section
              id={idFixoMaritimo}
              key={idFixoMaritimo}
              className="min-h-[80vh] pt-20"
            >
              <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-mono tracking-wide uppercase">
                ZONA {idFixoMaritimo} / {metadadosZona.prof}
              </div>

              <h2 className="mb-12 text-3xl font-bold">{SecaoAtual.titulo}</h2>

              <SecaoComponente perfil={perfilAtivo} />
            </section>
          );
        })}
      </main>
    </div>
  );
}
