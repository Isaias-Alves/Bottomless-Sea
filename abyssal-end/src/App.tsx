import React, { useState } from "react";
import { SonarSelector, type PerfilAcesso } from "./components/SonarSelector";
import { AbyssalLantern } from "./components/AbyssalLantern";
import { Sidebar } from "./components/Sidebar";
import { DepthHUD } from "./components/DepthHUD";
import { DecryptedText } from "./components/DecryptedText";
import { AbyssalSilhouettes } from "./components/AbyssalSilhouettes";

export interface SecaoProps {
  perfil: PerfilAcesso;
  onAtivarAnomalia?: () => void;
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

// Efeitos de Fundo (Bolhas e Luz)
const BackgroundEffects = () => {
  const bubbles = [
    { size: 24, left: 10, duration: 18, delay: 0 },
    { size: 16, left: 25, duration: 22, delay: 5 },
    { size: 32, left: 45, duration: 15, delay: 2 },
    { size: 12, left: 65, duration: 25, delay: 8 },
    { size: 28, left: 85, duration: 20, delay: 12 },
    { size: 18, left: 75, duration: 19, delay: 18 },
    { size: 10, left: 35, duration: 24, delay: 15 },
  ];

  return (
    <>
      <div className="sunlight-glow"></div>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        ></div>
      ))}
    </>
  );
};

// Componentes de conteúdo das seções
const ConteudoSobre: React.FC<SecaoProps> = ({ perfil, onAtivarAnomalia }) => {
  const [clickCount, setClickCount] = React.useState(0);

  const handleAvatarClick = () => {
    if (perfil === "mergulhador" && onAtivarAnomalia) {
      const newCount = clickCount + 1;
      setClickCount(newCount);

      if (newCount === 3) {
        onAtivarAnomalia();
        setClickCount(0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-start relative z-20">
      <div className="flex flex-col items-center">
        <div
          onClick={handleAvatarClick}
          className={`flex h-40 w-40 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-colors ${
            perfil === "mergulhador"
              ? "cursor-pointer hover:border-white/50 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              : ""
          }`}
          title={
            perfil === "mergulhador" ? "Anomalia abissal detectada..." : ""
          }
        >
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
};

const ConteudoStacks: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="flex flex-col gap-8 relative z-20">
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

    {perfil === "baleia" && (
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 backdrop-blur-md">
        <h3 className="mb-4 text-xl font-bold text-purple-300">
          Práticas de Engenharia & Metodologias
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Scrum / Kanban",
            "Clean Code",
            "Git",
            "Revisão de Código (PRs)",
            "UML & BPMN",
            "Design Patterns",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-sm text-purple-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    )}

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

const ConteudoProjetos: React.FC<SecaoProps> = ({ perfil }) => {
  const archBadges: Record<string, string> = {
    "ClinPlaY (Web/Mobile First PWA)": "Arquitetura Componentizada / API REST",
    "El Banquero (Deadlocks)": "Algoritmos Otimizados / Concorrência",
    "Coriollis (Tradução PT-BR)": "Gestão de Ativos / Versionamento",
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative z-20">
      {[
        "ClinPlaY (Web/Mobile First PWA)",
        "El Banquero (Deadlocks)",
        "Coriollis (Tradução PT-BR)",
      ].map((proj) => (
        <div
          key={proj}
          className={`flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-transform hover:-translate-y-1 ${
            perfil === "baleia"
              ? "border-purple-500/30 bg-purple-500/5"
              : "border-white/10 bg-white/5"
          }`}
        >
          <h3 className="text-xl font-bold">{proj}</h3>

          {perfil === "baleia" && archBadges[proj] && (
            <div className="mt-4 inline-block w-fit rounded bg-purple-500/20 border border-purple-500/30 px-2 py-1 text-xs text-purple-300">
              {archBadges[proj]}
            </div>
          )}

          <a
            href="#"
            className="mt-auto inline-block border-t border-white/10 pt-4 text-sm font-semibold hover:text-blue-300"
          >
            Ver projeto →
          </a>
        </div>
      ))}
    </div>
  );
};

const ConteudoExperiencia: React.FC<SecaoProps> = ({ perfil }) => (
  <div className="relative z-20">
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

    {perfil === "baleia" && (
      <div className="mt-12 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">
        <h3 className="mb-6 text-xl font-bold text-purple-300">
          Resumo de Atuação Corporativa
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-white">4+</p>
            <p className="mt-1 text-sm text-white/60">Pessoas na Equipe Base</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">Escala</p>
            <p className="mt-1 text-sm text-white/60">
              Projetos para 100+ usuários
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">Agile</p>
            <p className="mt-1 text-sm text-white/60">Colaboração & Entregas</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-white/70 leading-relaxed border-t border-purple-500/20 pt-6">
          Experiência prática com desenvolvimento em times horizontais, tomada
          de decisão sob pressão e gerenciamento de escopo e prazo em projetos
          de software voltado para uso cotidiano. Conhecimentos ágeis e de
          projetos arquiteturais de software.
        </p>
      </div>
    )}

    {perfil === "tubarao" && (
      <div className="mt-24">
        <h3 className="mb-10 text-2xl font-bold text-red-400">
          Certificações Acadêmicas
        </h3>

        <div className="relative">
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
                <div className="absolute left-2.25 top-0 h-full border-l border-white/20 md:hidden"></div>
                <div className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white border-4 border-ocean-abyss md:left-0 md:-top-px"></div>
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

const ConteudoContato: React.FC<SecaoProps> = () => (
  <div className="w-full text-center rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl relative z-20">
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
  const [anomaliaAtiva, setAnomaliaAtiva] = useState(false);

  if (!perfilAtivo) {
    return <SonarSelector onSelectProfile={setPerfilAtivo} />;
  }

  const ordemAtual = ordemPerfis[perfilAtivo];

  return (
    <div className="relative w-full overflow-x-hidden font-sans text-white">
      {/* Camada de Fundo Dinâmica */}
      {anomaliaAtiva ? (
        <video
          autoPlay
          controls={false}
          className="fixed inset-0 w-full h-full object-cover z-0 opacity-80"
          style={{ mixBlendMode: "multiply" }}
          src="/bad-apple.mp4"
          onEnded={() => setAnomaliaAtiva(false)}
        />
      ) : (
        <AbyssalSilhouettes />
      )}

      <BackgroundEffects />
      <AbyssalLantern />
      <DepthHUD />
      <Sidebar perfil={perfilAtivo} />

      <main
        className={`mx-auto max-w-6xl px-6 py-12 md:pl-48 md:pr-40 relative z-20 transition-all duration-1000 ${anomaliaAtiva ? "bg-transparent drop-shadow-2xl" : ""}`}
      >
        {anomaliaAtiva && (
          <button
            onClick={() => setAnomaliaAtiva(false)}
            className="fixed top-8 right-8 z-50 rounded bg-red-900/50 px-4 py-2 font-mono text-xs text-red-300 hover:bg-red-900"
          >
            [ PURGAR ANOMALIA ]
          </button>
        )}

        <header className="mb-32 mt-12 border-b border-white/20 pb-8 relative z-20">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/50">
            Acesso Autorizado:{" "}
            <DecryptedText text={perfilAtivo.toUpperCase()} delay={300} />
          </p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2">
            <h1 className="text-4xl font-bold md:text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <DecryptedText text="Abyssal End" delay={100} />
            </h1>

            <button
              onClick={() => {
                setPerfilAtivo(null);
                setAnomaliaAtiva(false);
              }}
              className="rounded-lg border border-ocean-surface/50 bg-ocean-surface/10 px-5 py-2.5 font-mono text-sm text-ocean-surface backdrop-blur-md transition-all hover:border-ocean-surface hover:bg-ocean-surface/20 hover:text-white hover:shadow-[0_0_15px_rgba(0,119,190,0.4)]"
            >
              [ Resetar Sonar ]
            </button>
          </div>
        </header>

        {ordemAtual.map((chaveSecao, index) => {
          const SecaoAtual = COMPONENTES_SECAO[chaveSecao];
          const SecaoComponente = SecaoAtual.component;
          const metadadosZona = ZONAS_OCEANO[index];
          const idFixoMaritimo = IDs_MARITIMOS[index];

          const cascadeDelay = 500 + index * 200;

          return (
            <section
              id={idFixoMaritimo}
              key={idFixoMaritimo}
              className={`min-h-[80vh] pt-20 transition-opacity duration-1000 ${anomaliaAtiva ? "opacity-80" : "opacity-100"}`}
            >
              <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-mono tracking-wide uppercase backdrop-blur-sm">
                <DecryptedText
                  text={`ZONA ${idFixoMaritimo} / ${metadadosZona.prof}`}
                  delay={cascadeDelay}
                  speed={15}
                />
              </div>

              <h2 className="mb-12 text-3xl font-bold">
                <DecryptedText
                  text={SecaoAtual.titulo}
                  delay={cascadeDelay + 150}
                />
              </h2>

              <SecaoComponente
                perfil={perfilAtivo}
                onAtivarAnomalia={() => setAnomaliaAtiva(true)}
              />
            </section>
          );
        })}
      </main>
    </div>
  );
}
