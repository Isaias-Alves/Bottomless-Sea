import type { ComponentType } from "react";
import { GiSharkFin, GiSpermWhale, GiDivingHelmet } from "react-icons/gi";
import { FaFish } from "react-icons/fa";
import type { PerfilAcesso } from "../../config/zonas";

interface PropsIcone {
  size?: number;
  className?: string;
}

/**
 * Ponte entre a configuração (dados puros) e o JSX. Mantém `config/zonas.ts`
 * livre de imports de React, para continuar utilizável em testes e scripts.
 */
export const ICONES_PERFIL: Record<PerfilAcesso, ComponentType<PropsIcone>> = {
  sardinha: FaFish,
  tubarao: GiSharkFin,
  baleia: GiSpermWhale,
  mergulhador: GiDivingHelmet,
};

export const TAMANHO_ICONE: Record<PerfilAcesso, number> = {
  sardinha: 22,
  tubarao: 30,
  baleia: 40,
  mergulhador: 28,
};
