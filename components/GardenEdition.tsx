"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Flower2, Citrus, Nut, Wine, Coffee, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { Citrus, Nut, Wine, Coffee, Flower2 };
function FlavorIcon({ name, size, style, className }: { name: string; size: number; style?: React.CSSProperties; className?: string }) {
  const C = ICON_MAP[name];
  return C ? <C size={size} style={style} className={className} /> : null;
}
import Link from "next/link";
import { products } from "@/lib/products";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const gardenProduct = products.find((p) => p.slug === "garden-edition");
const flavors = gardenProduct?.flavors ?? [];

export default function GardenEdition() {
  const { ref, inView } = useInView();

  return (
    <section
      id="garden-edition"
      className="relative overflow-hidden section-pad"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Fondo floral sutil */}
      <div
        className="absolute inset-0 opacity-[0.03] arabic-pattern"
        aria-hidden
      />

      {/* Degradado rosa suave arriba */}
      <div
        className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(193,150,142,0.12) 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Línea superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c1968e]/40 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* Badge colección especial */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#c1968e]/50" />
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#c1968e]/80">
              Edición Especial · Día de las Madres
            </span>
            <span className="h-px w-10 bg-[#c1968e]/50" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-beige mb-3">
            Garden <em style={{ color: "#c1968e" }}>Edition</em>
          </h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-dorado/50">
            Dawla · Chocolatería Premium · 2026
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <Flower2 size={14} style={{ color: "#c1968e" }} />
          </div>
        </div>

        {/* Cuerpo: imagen + sabores */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div
            className={`relative transition-all duration-900 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Marco decorativo */}
            <div
              className="absolute -inset-4 border border-[#c1968e]/10 pointer-events-none"
              style={{ borderRadius: "2px" }}
              aria-hidden
            />
            <div
              className="absolute -inset-8 border border-[#c1968e]/05 pointer-events-none"
              style={{ borderRadius: "2px" }}
              aria-hidden
            />

            <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
              <Image
                src="/garden-edition.jpg"
                alt="Dawla Garden Edition · Caja Día de las Madres"
                width={900}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay muy sutil */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(21,5,8,0.2) 0%, transparent 40%)" }}
                aria-hidden
              />
            </div>

            {/* Chip flotante */}
            <div
              className="absolute bottom-6 left-6 px-4 py-2 backdrop-blur-md border border-[#c1968e]/30"
              style={{ backgroundColor: "rgba(21,5,8,0.75)" }}
            >
              <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#c1968e]/70">
                Edición Limitada
              </p>
              <p className="font-serif text-base text-beige font-light mt-0.5">
                5 sabores · 5 rosas
              </p>
            </div>
          </div>

          {/* Sabores */}
          <div
            className={`transition-all duration-900 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <p className="font-sans text-sm text-beige/55 leading-relaxed mb-10 max-w-md">
              Una caja diseñada para ella. Cada bombón moldeado en forma de rosa, con rellenos únicos
              que celebran la dulzura de quienes más amamos. Presentación botánica premium,
              envuelta en flores y nostalgia.
            </p>

            <div className="space-y-4 mb-10">
              {flavors.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.name}
                    href="/productos/garden-edition"
                    className={`group flex items-start gap-4 p-4 border border-[#c1968e]/10 hover:border-[#c1968e]/35 transition-all duration-300 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${400 + i * 80}ms`,
                      backgroundColor: "rgba(193,150,142,0.04)",
                      display: "flex",
                    }}
                  >
                    <FlavorIcon name={f.icon} size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#c1968e", opacity: 0.7 }} />
                    <div>
                      <p className="font-serif text-beige font-light text-base group-hover:text-[#c1968e] transition-colors duration-300">
                        {f.name}
                      </p>
                      <p className="font-sans text-[11px] text-beige/40 mt-0.5 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                    <div className="ml-auto flex-shrink-0 flex items-center">
                      <Flower2 size={12} className="transition-colors duration-300" style={{ color: "rgba(193,150,142,0.2)" }} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/productos/garden-edition"
                className="inline-flex items-center justify-center px-8 py-4 border font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  borderColor: "#c1968e",
                  color: "#c1968e",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#c1968e";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#150508";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#c1968e";
                }}
              >
                Pedir Garden Edition
              </Link>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 border border-dorado/30 text-dorado/70 font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:border-dorado hover:text-dorado transition-all duration-300"
              >
                Caja Personalizada
              </a>
            </div>

            <p className="font-sans text-[10px] text-beige/25 mt-5 tracking-wider">
              Disponible solo por tiempo limitado · Bogotá · Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c1968e]/30 to-transparent" />
    </section>
  );
}
