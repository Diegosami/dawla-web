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

const categories = ["Todo", "Bombones", "Tabletas", "Trufas", "Temporada"];

const products = [
  {
    id: 1,
    name: "Bombón Rosas del Levante",
    category: "Bombones",
    desc: "Ganache de agua de rosas y cardamomo, cubierta en chocolate negro 72%.",
    price: "$18.000",
    tag: "Signature",
    color: "#c1968e",
  },
  {
    id: 2,
    name: "Trufa Café de Origen",
    category: "Trufas",
    desc: "Cacao Tumaco 85% con notas de cereza y especias orientales.",
    price: "$15.000",
    tag: "Premium",
    color: "#aa9531",
  },
  {
    id: 3,
    name: "Tableta Azul del Nilo",
    category: "Tabletas",
    desc: "Chocolate leche con tahini, almendras tostadas y sal marina del Pacífico.",
    price: "$32.000",
    tag: "Artesanal",
    color: "#345263",
  },
  {
    id: 4,
    name: "Bombón Pistacho Dorado",
    category: "Bombones",
    desc: "Praliné de pistacho iraní con hoja de oro comestible, 70% dark.",
    price: "$22.000",
    tag: "Lujo",
    color: "#aa9531",
  },
  {
    id: 5,
    name: "Trufa Baharat",
    category: "Trufas",
    desc: "Mezcla de especias árabes con chocolate blanco y naranja confitada.",
    price: "$16.000",
    tag: "Especial",
    color: "#a36529",
  },
  {
    id: 6,
    name: "Tableta Gran Reserva",
    category: "Tabletas",
    desc: "Cacao Nacional 90% de Huila. Fermentado 7 días. Sin aditivos.",
    price: "$45.000",
    tag: "Origen único",
    color: "#2b1b12",
  },
];

export default function Menu() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState("Todo");

  const filtered = active === "Todo" ? products : products.filter((p) => p.category === active);

  return (
    <section id="menu" className="relative section-pad overflow-hidden" style={{ background: "var(--bg-mid)" }}>
      {/* Patrón fondo */}
      <div className="absolute inset-0 arabic-pattern opacity-[0.05]" aria-hidden />

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-dorado/70 mb-4">
            Colección
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-beige mb-6">
            Nuestro <em className="gold-shimmer">Menú</em>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-dorado text-sm">◈</span>
          </div>
          <p className="font-sans text-sm text-beige/50 mt-6 max-w-lg mx-auto">
            Cada pieza elaborada a mano con ingredientes seleccionados.
            Disponible para pedidos personalizados y eventos especiales.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                active === cat
                  ? "border-dorado bg-dorado text-cafe"
                  : "border-dorado/30 text-beige/60 hover:border-dorado/60 hover:text-dorado"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`group relative overflow-hidden transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 80 + 300}ms` }}
            >
              {/* Placeholder imagen */}
              <div
                className="relative w-full h-56 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)` }}
              >
                <div className="absolute inset-0 arabic-pattern-sm opacity-20" />
                {/* Arco decorativo encima de la imagen */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 border-x border-t border-dorado/10 mx-8"
                  style={{ borderRadius: "50% 50% 0 0 / 40% 40% 0 0" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-dorado/30"
                      style={{ borderRadius: "50%" }}
                    >
                      <span className="text-dorado/60 text-2xl">✦</span>
                    </div>
                    <p className="font-sans text-[10px] text-dorado/40 tracking-widest uppercase">
                      Imagen próximamente
                    </p>
                  </div>
                </div>
                {/* Tag */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-cafe/80 border border-dorado/30 backdrop-blur-sm">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-dorado">
                    {p.tag}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dorado/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="border border-dorado/10 p-5 group-hover:border-dorado/30 transition-colors duration-300" style={{ backgroundColor: "var(--bg-card)" }}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg text-beige font-light leading-snug flex-1 pr-3">
                    {p.name}
                  </h3>
                  <span className="font-sans text-dorado font-semibold text-sm whitespace-nowrap">
                    {p.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-beige/50 leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-dorado/50">
                    {p.category}
                  </span>
                  <button className="font-sans text-[10px] tracking-widest uppercase text-dorado hover:text-[#c8b04a] transition-colors border-b border-dorado/30 hover:border-dorado pb-px">
                    Pedir →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${inView ? "opacity-100" : "opacity-0"}`}>
          <p className="font-sans text-sm text-beige/50 mb-6">
            ¿Buscas algo especial? Creamos cajas personalizadas para eventos, regalos corporativos y celebraciones.
          </p>
          <a
            href="#contacto"
            className="inline-block px-10 py-4 border border-dorado text-dorado font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-dorado hover:text-cafe transition-all duration-300"
          >
            Pedido Personalizado
          </a>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />
    </section>
  );
}
