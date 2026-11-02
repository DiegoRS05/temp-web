"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Envuelve contenido y lo revela al entrar en viewport (IntersectionObserver).
 * Sin librerías: solo transform/opacity → fluido también en móvil.
 */
export function Reveal({
  children,
  delay = 0,
  dir,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right" | "zoom";
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-dir={dir ?? "up"}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
