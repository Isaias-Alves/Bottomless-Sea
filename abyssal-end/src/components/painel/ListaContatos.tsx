import styles from "./painel.module.css";
import { ICONES_PERFIL } from "./icones";
import { PERFIS, type PerfilAcesso } from "../../config/zonas";

interface ListaContatosProps {
  destacado: PerfilAcesso | null;
  onDestacar: (perfil: PerfilAcesso | null) => void;
  onSelecionar: (perfil: PerfilAcesso) => void;
}

/** Rumo em três dígitos, como num console de navegação real. */
function formatarRumo(rumo: number) {
  return `${String(Math.round(rumo)).padStart(3, "0")}°`;
}

function formatarDistancia(distancia: number) {
  return `${(distancia * 3.2).toFixed(1)} km`;
}

/**
 * Lista de contatos do sonar.
 *
 * Existe para resolver um problema concreto da tela anterior: nada indicava
 * que os bichos no radar eram o menu — o rótulo só aparecia no hover. Aqui
 * cada perfil existe em dois lugares, e a lista é navegável por teclado.
 */
export function ListaContatos({
  destacado,
  onDestacar,
  onSelecionar,
}: ListaContatosProps) {
  return (
    <div className={`${styles.mostrador} flex h-full flex-col p-4`}>
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
        <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Contatos
        </h2>
        <span className="font-mono text-[10px] text-white/30">
          {PERFIS.length} detectados
        </span>
      </div>

      <ul className="flex flex-col gap-1">
        {PERFIS.map((perfil) => {
          const Icone = ICONES_PERFIL[perfil.id];
          const ativo = destacado === perfil.id;

          return (
            <li key={perfil.id}>
              <button
                type="button"
                onClick={() => onSelecionar(perfil.id)}
                onMouseEnter={() => onDestacar(perfil.id)}
                onMouseLeave={() => onDestacar(null)}
                onFocus={() => onDestacar(perfil.id)}
                onBlur={() => onDestacar(null)}
                className="flex w-full items-center gap-3 rounded-lg border border-transparent px-2 py-2.5 text-left transition-colors"
                style={{
                  borderColor: ativo ? `${perfil.cor}66` : undefined,
                  background: ativo ? `${perfil.cor}12` : undefined,
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border"
                  style={{
                    color: perfil.cor,
                    borderColor: `${perfil.cor}40`,
                    background: `${perfil.cor}14`,
                  }}
                >
                  <Icone size={16} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-white">
                    {perfil.nome}
                  </span>
                  <span className="block truncate font-mono text-[10px] text-white/40">
                    {perfil.papel} · {perfil.foco}
                  </span>
                </span>

                <span className="shrink-0 text-right font-mono text-[10px] tabular-nums text-white/35">
                  <span className="block">{formatarRumo(perfil.rumo)}</span>
                  <span className="block">
                    {formatarDistancia(perfil.distancia)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-auto pt-4 font-mono text-[10px] leading-relaxed text-white/30">
        Selecione um contato para definir a rota de descida. A ordem das zonas
        muda conforme a assinatura escolhida.
      </p>
    </div>
  );
}
