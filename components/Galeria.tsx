"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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

type GalleryItem = {
  id: number;
  label: string;
  h: string;
  image?: string;
  color?: string;
};

// Alturas variables para dar sensación de masonry
const items: GalleryItem[] = [
  { id: 1, label: "Detalles que enamoran",    h: "h-72",  image: "/dawla.chocolateria_DMwHFYzMs-6.jpg" },
  { id: 2, label: "Caja Premium",             h: "h-48",  image: "/dawla.chocolateria_DP4A7JQkZIr.jpg" },
  { id: 3, label: "Nuestros Bombones",        h: "h-96",  image: "/dawla.chocolateria_DQw18QsEbHu.jpg" },
  { id: 4, label: "Arte en chocolate",        h: "h-56",  image: "/dawla.chocolateria_DRFqbi6EQeu.jpg" },
  { id: 5, label: "Sabores únicos",           h: "h-40",  image: "/dawla.chocolateria_DRI6lltDKjR.jpg" },
  { id: 6, label: "Presentación Premium",     h: "h-72",  image: "/dawla.chocolateria_DSd0KfLlVCL.jpg" },
  { id: 7, label: "Experiencia Sensorial",    h: "h-52",  image: "/dawla.chocolateria_DUwQQUskfW0.jpg" },
  { id: 8, label: "Garden Edition",           h: "h-64",  image: "/garden-edition.jpg" },
];

export default function Galeria() {
  const { ref, inView } = useInView();

  return (
    <section id="galeria" className="relative section-pad overflow-hidden" style={{ backgroundColor: "var(--bg-deep)" }}>
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
              {/* Imagen o placeholder */}
              <div
                className={`${item.h} relative w-full overflow-hidden`}
                style={item.color ? { background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)` } : {}}
              >
                {item.image ? (
                  <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <>
                    <div className="absolute inset-0 arabic-pattern-sm opacity-15" />
                    {/* Icono central */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                      <span className="text-dorado text-3xl">✦</span>
                    </div>
                  </>
                )}
                
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(180deg, transparent 50%, rgba(26,16,9,0.85) 100%)` }}
                />

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
            Síguenos en nuestras redes para más inspiración.
          </p>
        </div>
      </div>
    </section>
  );
}
