import { useState, useEffect, useRef } from "react";
import { useMovimentoReduzido } from "../hooks/useMovimentoReduzido";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

const CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>TOUHOU";

/**
 * Texto que "descriptografa" ao entrar na tela.
 * Com movimento reduzido o efeito é pulado — o conteúdo aparece direto,
 * sem meio segundo de ruído ilegível.
 */
export function DecryptedText({
  text,
  speed = 30,
  delay = 0,
}: DecryptedTextProps) {
  const movimentoReduzido = useMovimentoReduzido();
  const [textoDecifrado, setTextoDecifrado] = useState(() =>
    "0".repeat(text.length),
  );
  const containerRef = useRef<HTMLSpanElement>(null);
  const [iniciou, setIniciou] = useState(false);

  useEffect(() => {
    if (movimentoReduzido) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setIniciou(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (containerRef.current) observador.observe(containerRef.current);
    return () => observador.disconnect();
  }, [movimentoReduzido]);

  useEffect(() => {
    if (movimentoReduzido || !iniciou) return;

    let iteracao = 0;
    let intervalo: ReturnType<typeof setInterval>;

    const descriptografar = () => {
      intervalo = setInterval(() => {
        setTextoDecifrado(
          text
            .split("")
            .map((caractere, indice) =>
              indice < iteracao
                ? caractere
                : CARACTERES[Math.floor(Math.random() * CARACTERES.length)],
            )
            .join(""),
        );

        iteracao += 1 / 3;
        if (iteracao >= text.length) {
          clearInterval(intervalo);
          setTextoDecifrado(text);
        }
      }, speed);
    };

    const temporizador = setTimeout(descriptografar, delay);

    return () => {
      clearInterval(intervalo);
      clearTimeout(temporizador);
    };
  }, [text, speed, delay, iniciou, movimentoReduzido]);

  // O texto real fica no DOM para leitores de tela; o ruído é decorativo.
  const textoVisivel = movimentoReduzido ? text : textoDecifrado;

  return (
    <span ref={containerRef}>
      <span aria-hidden="true">{textoVisivel}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
