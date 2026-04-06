"use client";

import { useEffect, useRef } from "react";
import DawlaLogo from "./DawlaLogo";

export default function Hero() {
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = patternRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1009]"
    >
      {/* Patrón árabe parallax */}
      <div
        ref={patternRef}
        className="absolute inset-0 arabic-pattern opacity-[0.08]"
        aria-hidden
      />

      {/* Glow ambiental */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #aa9531 0%, #a36529 40%, transparent 70%)" }}
        aria-hidden
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-24">

        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-dorado/80 mb-10 animate-fade-in"
           style={{ animationDelay: "0.1s" }}>
          Bogotá · Colombia
        </p>

        {/* Logo — wrapper para fade, SVG interno para float */}
        <div className="animate-fade-in mb-10 w-full" style={{ maxWidth: "460px", animationDelay: "0.3s" }}>
          <DawlaLogo className="w-full h-auto animate-float" />
        </div>

        {/* Divisor ornamental */}
        <div className="ornament-divider w-64 mb-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <span className="text-dorado text-lg">✦</span>
        </div>

        {/* Tagline */}
        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-beige leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          El arte del chocolate,<br />
          <em className="gold-shimmer font-normal">elevado a ritual</em>
        </h1>

        <p
          className="font-sans text-sm md:text-base font-light text-beige/60 tracking-wide max-w-xl mb-14 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          Creaciones de chocolate premium inspiradas en la riqueza cultural de
          Oriente Medio, elaboradas con cacao colombiano de origen único.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <a
            href="#menu"
            className="px-8 py-4 bg-dorado text-cafe font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#c8b04a] transition-all duration-300 shadow-[0_0_30px_rgba(170,149,49,0.3)]"
          >
            Explorar Menú
          </a>
          <a
            href="#historia"
            className="px-8 py-4 border border-dorado/40 text-beige/80 font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:border-dorado hover:text-dorado transition-all duration-300"
          >
            Nuestra Historia
          </a>
        </div>
      </div>

      {/* Fade a siguiente sección */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1a1009)" }}
        aria-hidden
      />
    </section>
  );
}
