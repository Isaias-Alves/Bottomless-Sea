import type { ComponentType } from "react";
import type { ChaveSecao } from "../config/zonas";
import type { SecaoProps } from "./tipos";
import { Sobre } from "./Sobre";
import { Stacks } from "./Stacks";
import { Projetos } from "./Projetos";
import { Experiencia } from "./Experiencia";
import { Contato } from "./Contato";

/** Registro de seções. Adicionar uma nova = uma entrada aqui e em SECOES. */
export const COMPONENTES_SECAO: Record<
  ChaveSecao,
  ComponentType<SecaoProps>
> = {
  sobre: Sobre,
  stacks: Stacks,
  projetos: Projetos,
  experiencia: Experiencia,
  contato: Contato,
};

export type { SecaoProps };
