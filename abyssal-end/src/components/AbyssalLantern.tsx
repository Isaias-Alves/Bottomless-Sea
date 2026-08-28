import { useEffect, useRef } from "react";

export function AbyssalLantern() {
  const lanternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lanternRef.current) {
        lanternRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={lanternRef}
      className="pointer-events-none fixed left-0 top-0 z-30 h-200 w-200 rounded-full mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(0, 119, 190, 0.08) 40%, transparent 70%)",
        willChange: "transform",
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
    />
  );
}
