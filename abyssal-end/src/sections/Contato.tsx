import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope } from "react-icons/fa";
import { PESSOAL } from "../config/conteudo";

const CAMPO =
  "w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/30 transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400";

export function Contato() {
  const [dados, setDados] = useState({ nome: "", email: "", mensagem: "" });

  const aoEnviar = (evento: FormEvent) => {
    evento.preventDefault();

    const assunto = encodeURIComponent(`Contato via Portfólio - ${dados.nome}`);
    const corpo = encodeURIComponent(
      `Nome: ${dados.nome}\nEmail: ${dados.email}\n\nMensagem:\n${dados.mensagem}`,
    );

    window.open(`mailto:${PESSOAL.email}?subject=${assunto}&body=${corpo}`);
  };

  const aoMudar = (
    evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDados((atual) => ({
      ...atual,
      [evento.target.name]: evento.target.value,
    }));
  };

  return (
    <div className="material relative z-20 flex w-full flex-col gap-12 rounded-3xl p-8 md:flex-row md:p-12">
      <div className="flex-1">
        <h3 className="mb-6 text-3xl font-bold">Chegamos ao fundo.</h3>
        <p className="mb-8 text-white/60">
          Sinta-se à vontade para enviar uma mensagem diretamente. Retornarei o
          contato o mais breve possível.
        </p>

        <form onSubmit={aoEnviar} className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="contato-nome">
            Seu nome
          </label>
          <input
            id="contato-nome"
            type="text"
            name="nome"
            required
            placeholder="Seu Nome"
            value={dados.nome}
            onChange={aoMudar}
            className={CAMPO}
          />

          <label className="sr-only" htmlFor="contato-email">
            Seu e-mail
          </label>
          <input
            id="contato-email"
            type="email"
            name="email"
            required
            placeholder="Seu E-mail"
            value={dados.email}
            onChange={aoMudar}
            className={CAMPO}
          />

          <label className="sr-only" htmlFor="contato-mensagem">
            Sua mensagem
          </label>
          <textarea
            id="contato-mensagem"
            name="mensagem"
            required
            rows={4}
            placeholder="Sua Mensagem..."
            value={dados.mensagem}
            onChange={aoMudar}
            className={`${CAMPO} resize-none`}
          />

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-950/80 px-6 py-4 font-bold text-cyan-300 transition-all hover:bg-cyan-900 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            <FaPaperPlane aria-hidden="true" />
            ENVIAR TRANSMISSÃO
          </button>
        </form>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center border-t border-white/10 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
        <h4 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] tenue">
          Outros Canais
        </h4>

        <div className="flex w-full max-w-xs flex-col gap-4">
          <a
            href={`mailto:${PESSOAL.email}`}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            <FaEnvelope aria-hidden="true" />
            E-MAIL DIRETO
          </a>

          <a
            href={PESSOAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-6 py-4 font-semibold transition-all hover:border-white/50 hover:bg-white/10"
          >
            <FaGithub className="text-xl" aria-hidden="true" />
            GitHub
          </a>

          <a
            href={PESSOAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-4 font-semibold text-blue-200 transition-all hover:border-blue-500/60 hover:bg-blue-500/20"
          >
            <FaLinkedin className="text-xl" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
