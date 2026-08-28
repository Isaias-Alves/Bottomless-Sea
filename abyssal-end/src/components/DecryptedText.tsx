import { useState, useEffect, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>TOUHOU";

export function DecryptedText({
  text,
  speed = 30,
  delay = 0,
}: DecryptedTextProps) {
  // Inicializa o texto ofuscado (com o mesmo tamanho da string original)
  const [displayText, setDisplayText] = useState(
    Array(text.length).fill("0").join(""),
  );
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Observador de Scroll: Detecta quando o texto entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Lógica de Descriptografia: Só roda após hasStarted virar true
  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startDecryption = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join(""),
        );

        iteration += 1 / 3;

        if (iteration >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startDecryption, delay);
    } else {
      startDecryption();
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, hasStarted]);

  return <span ref={containerRef}>{displayText}</span>;
}
