import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="relative w-full font-sans text-white">
      <Sidebar />

      <main className="mx-auto max-w-5xl px-6 py-12 md:pr-40">
        <header className="mb-32 mt-12 border-b border-white/20 pb-8">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/50">
            Portfólio • 2026
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">
            Portfólio — Abyssal End
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Cada código implementado é um mergulho rumo ao desconhecido, escolha
            os equipamentos certos, escolha o mergulhador certo.
          </p>
          <p className="max-w-2xl text-lg text-white/70">
            "Eu olho para o mundo do fundo do mar" ~ Pyke
          </p>
        </header>

        <section id="epipelagica" className="min-h-[80vh] pt-20">
          <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Epipelágica / 0 - 200m
          </div>
          <h2 className="mb-12 text-3xl font-bold">Sobre Mim</h2>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm text-white/50">Foto de Perfil</span>
              </div>
              <p className="mt-4 text-xl font-semibold">Isaías Alves</p>
            </div>

            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold">Desenvolvedor de Software</h3>
              <p className="mt-1 text-white/50">
                19 anos • Estudante de Engenharia de Software • 4º Periodo
              </p>

              <p className="mt-6 leading-relaxed text-white/80">
                Sou estudante de Engenharia de Software na PUC Minas (Coração
                Eucarístico). Tenho foco na construção de sistemas eficientes e
                escaláveis, utilizando ferramentas modernas de desenvolvimento.
                Quando não estou codando meus projetos pessoais, dedico meu
                tempo à ilustração digital e mestrando campanhas de RPG de mesa.
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="rounded-lg bg-white/10 px-6 py-2 transition-colors hover:bg-white hover:text-black"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="rounded-lg bg-white/10 px-6 py-2 transition-colors hover:bg-white hover:text-black"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="mesopelagica" className="min-h-[80vh] pt-20">
          <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Mesopelágica / 200 - 1000m
          </div>
          <h2 className="mb-2 text-3xl font-bold">Stacks Tecnológicas</h2>
          <p className="mb-12 text-white/70">
            O sol some aos poucos, nem todos são capazes de entender o que vive
            por debaixo das ondas.
            <p>"Nade por sua conta e risco" ~ Nami</p>
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform hover:-translate-y-1">
              <h3 className="mb-4 text-xl font-bold">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Tailwind CSS", "JavaScript"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform hover:-translate-y-1">
              <h3 className="mb-4 text-xl font-bold">Backend & Lógica</h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "SQL"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform hover:-translate-y-1">
              <h3 className="mb-4 text-xl font-bold">Ambiente & Ferramentas</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Linux (Fedora/KDE)",
                  "Zed IDE",
                  "IntelliJ IDEA",
                  "Git",
                  "Gemini",
                  "Claude Code",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform hover:-translate-y-1">
              <h3 className="mb-4 text-xl font-bold">Arquitetura</h3>
              <div className="flex flex-wrap gap-2">
                {["UML", "BPMN", "Clean Code", "Estrutura de Dados"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/20 bg-white/5 px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="batipelagica" className="min-h-[80vh] pt-20">
          <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Batipelágica / 1000 - 4000m
          </div>
          <h2 className="mb-12 text-3xl font-bold">Projetos em Destaque</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="h-40 w-full bg-white/10 flex items-center justify-center">
                <span className="text-white/30">Imagem ClinPlaY</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">ClinPlaY</h3>
                <p className="mt-2 flex-1 text-sm text-white/70">
                  Aplicação web e mobile projetada para auxiliar pacientes e
                  clínicas de fisioterapia pélvica.
                </p>
                <div className="my-4 flex flex-wrap gap-2">
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    React
                  </span>
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    Tailwind
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-block border-t border-white/10 pt-4 text-sm font-semibold hover:text-blue-300"
                >
                  Ver projeto →
                </a>
              </div>
            </div>

            <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="h-40 w-full bg-white/10 flex items-center justify-center">
                <span className="text-white/30">Imagem El Banquero</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">El Banquero</h3>
                <p className="mt-2 flex-1 text-sm text-white/70">
                  Implementação do algoritmo do Banqueiro para simulação de
                  processos e evasão de deadlocks.
                </p>
                <div className="my-4 flex flex-wrap gap-2">
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    Python
                  </span>
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    Algoritmos
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-block border-t border-white/10 pt-4 text-sm font-semibold hover:text-blue-300"
                >
                  Ver projeto →
                </a>
              </div>
            </div>

            <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="h-40 w-full bg-white/10 flex items-center justify-center">
                <span className="text-white/30">Imagem Coriollis</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">Coriollis PT-BR</h3>
                <p className="mt-2 flex-1 text-sm text-white/70">
                  Primeira tradução completa de fã para fã do RPG Coriollis, do
                  inglês para português brasileiro.
                </p>
                <div className="my-4 flex flex-wrap gap-2">
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    Tradução
                  </span>
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">
                    Localização
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-block border-t border-white/10 pt-4 text-sm font-semibold hover:text-blue-300"
                >
                  Ver projeto →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="abissopelagica" className="min-h-[80vh] pt-20">
          <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Abissopelágica / 4000 - 6000m
          </div>
          <h2 className="mb-12 text-3xl font-bold">Experiência Profissional</h2>

          <div className="relative border-l border-white/20 pl-8">
            {/* Item 1 */}
            <div className="mb-12 relative">
              <div className="absolute -left-10.25 top-1 h-5 w-5 rounded-full bg-white border-4 border-ocean-abyss"></div>
              <h3 className="text-xl font-bold">Desenvolvedor</h3>
              <p className="text-white/50">
                Equipe de Desenvolvimento de Software • 2026
              </p>
              <p className="mt-4 text-white/80">
                Atuação em equipe colaborativa de 5 pessoas, responsável pelo
                desenvolvimento de funcionalidades e resolução de problemas para
                projetos de software em larga escala com orçamento
                significativo.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-10.25 top-1 h-5 w-5 rounded-full bg-white border-4 border-ocean-abyss"></div>
              <h3 className="text-xl font-bold">
                Idealizador & Desenvolvedor Lead
              </h3>
              <p className="text-white/50">ClinPlaY • 2026 - Presente</p>
              <p className="mt-4 text-white/80">
                Liderança na arquitetura e codificação do sistema web e mobile
                focado em fisioterapia pélvica, gerenciando a stack tecnológica
                e a experiência do usuário.
              </p>
            </div>
          </div>
        </section>

        <section
          id="hadal"
          className="flex min-h-[80vh] flex-col items-center justify-center py-20 text-center"
        >
          <div className="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Hadal / 6000m+
          </div>

          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <h2 className="mb-4 text-3xl font-bold">
              Você chegou ao fundo do oceano.
            </h2>
            <p className="mb-8 text-white/70">
              A pressão aqui é grande, mas grandes projetos nascem sob pressão.
              Vamos conversar?
            </p>

            <a
              href="mailto:isaiasalvesdesouzasantos@gmail.com"
              className="mb-8 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
            >
              isaiasalvesdesouzasantos@gmail.com
            </a>

            <div className="flex justify-center gap-6 border-t border-white/10 pt-8 text-sm">
              <a
                href="https://linkedin.com/in/isaias-alves"
                className="hover:text-blue-300 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/isaias-alves"
                className="hover:text-blue-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
