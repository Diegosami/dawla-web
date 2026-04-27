"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.2) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Historia() {
  const { ref, inView } = useInView();

  return (
    <section id="historia" className="relative section-pad overflow-hidden" style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Fondo patrón sutil */}
      <div className="absolute inset-0 arabic-pattern-sm opacity-[0.04]" aria-hidden />

      {/* Glow lateral */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "#345263" }}
        aria-hidden
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header de sección */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-dorado/70 mb-4">
            Nuestra Esencia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-beige mb-6">
            Historia & <em className="gold-shimmer">Filosofía</em>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-dorado text-sm">◈</span>
          </div>
        </div>

        {/* Contenido en dos columnas */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna visual — arco árabe decorativo */}
          <div
            className={`relative transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Marco con arco de herradura */}
            <div className="relative mx-auto max-w-sm">
              {/* Arco exterior */}
              <div
                className="absolute -inset-4 border border-dorado/20"
                style={{ borderRadius: "50% 50% 4px 4px / 35% 35% 4px 4px" }}
              />
              {/* Arco interior */}
              <div
                className="absolute -inset-2 border border-dorado/10"
                style={{ borderRadius: "50% 50% 4px 4px / 35% 35% 4px 4px" }}
              />

              {/* Placeholder imagen */}
              <div
                className="relative w-full aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: "var(--bg-mid)", borderRadius: "50% 50% 4px 4px / 30% 30% 4px 4px" }}
              >
                {/* Patrón dentro del arco */}
                <div className="absolute inset-0 arabic-pattern opacity-10" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 50%, var(--bg-mid) 100%)" }}
                />
                {/* Texto placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-sans text-xs text-dorado/40 tracking-widest uppercase">
                    Imagen próximamente
                  </p>
                </div>
              </div>

              {/* Badge dorado */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-dorado/40 rotate-45 flex items-center justify-center">
                <span className="font-serif text-dorado text-xs -rotate-45 text-center leading-tight">
                  Hecho<br />a mano
                </span>
              </div>
            </div>
          </div>

          {/* Columna texto */}
          <div
            className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <blockquote className="font-serif text-2xl md:text-3xl italic font-light text-rosa/90 mb-8 leading-relaxed">
              &ldquo;Cada pieza de chocolate es una puerta a un mundo de aromas, texturas y emociones.&rdquo;
            </blockquote>

            <div className="w-12 h-px bg-dorado/60 mb-8" />

            <p className="font-sans text-sm font-light text-beige/70 leading-relaxed mb-6">
              <strong className="text-dorado font-medium">Dawla</strong> nació en Bogotá con una visión única: fusionar
              la riqueza del cacao colombiano de origen con la sofisticación de la
              repostería árabe. Cada creación es un diálogo entre culturas, un
              susurro de tradición envuelto en modernidad.
            </p>
            <p className="font-sans text-sm font-light text-beige/70 leading-relaxed mb-10">
              Trabajamos de manera artesanal, seleccionando cada ingrediente con
              la misma meticulosidad que los maestros del azulejo árabe componen
              sus patrones geométricos: con precisión, pasión y propósito.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-dorado/20 pt-8">
              {[
                { n: "100%", label: "Artesanal" },
                { n: "Cacao", label: "Colombiano" },
                { n: "✦",    label: "Premium" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-2xl text-dorado mb-1">{s.n}</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-beige/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
