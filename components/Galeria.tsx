"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.1) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Alturas variables para dar sensación de masonry
const items = [
  { id: 1, label: "Bombones de temporada",    h: "h-72",  color: "#c1968e" },
  { id: 2, label: "Tabletas artesanales",     h: "h-48",  color: "#345263" },
  { id: 3, label: "Box regalo premium",       h: "h-96",  color: "#2b1b12" },
  { id: 4, label: "Detalle trabajo a mano",   h: "h-56",  color: "#a36529" },
  { id: 5, label: "Ingredientes de origen",   h: "h-40",  color: "#aa9531" },
  { id: 6, label: "Trufas Baharat",           h: "h-72",  color: "#c1968e" },
  { id: 7, label: "Taller Dawla",             h: "h-52",  color: "#345263" },
  { id: 8, label: "Cacao colombiano",         h: "h-64",  color: "#2b1b12" },
];

export default function Galeria() {
  const { ref, inView } = useInView();

  return (
    <section id="galeria" className="relative section-pad bg-[#1a1009] overflow-hidden">
      {/* Patrón fondo */}
      <div className="absolute inset-0 arabic-pattern opacity-[0.04]" aria-hidden />

      {/* Glow derecha */}
      <div
        className="absolute -right-32 top-1/3 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "#aa9531" }}
        aria-hidden
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-dorado/70 mb-4">
            Inspiración visual
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-beige mb-6">
            <em className="gold-shimmer">Galería</em>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-dorado text-sm">◈</span>
          </div>
        </div>

        {/* Grid masonry en 2 columnas (mobile) → 4 (desktop) */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`break-inside-avoid group relative overflow-hidden cursor-pointer transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 60 + 200}ms` }}
            >
              {/* Imagen placeholder */}
              <div
                className={`${item.h} relative w-full`}
                style={{ background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)` }}
              >
                <div className="absolute inset-0 arabic-pattern-sm opacity-15" />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(180deg, transparent 50%, rgba(26,16,9,0.85) 100%)` }}
                />
                {/* Icono central */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <span className="text-dorado text-3xl">✦</span>
                </div>

                {/* Label en hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-beige/80">
                    {item.label}
                  </p>
                </div>

                {/* Borde dorado en hover */}
                <div className="absolute inset-0 border border-dorado/0 group-hover:border-dorado/30 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${inView ? "opacity-100" : "opacity-0"}`}>
          <p className="font-sans text-xs text-beige/40 tracking-wider">
            Las fotografías reales serán añadidas próximamente.
          </p>
        </div>
      </div>
    </section>
  );
}
