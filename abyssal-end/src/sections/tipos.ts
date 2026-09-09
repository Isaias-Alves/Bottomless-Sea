import type { PerfilAcesso } from "../config/zonas";

export interface SecaoProps {
  perfil: PerfilAcesso;
  onAtivarAnomalia?: () => void;
}
