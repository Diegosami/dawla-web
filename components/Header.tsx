"use client";

import { useState, useEffect } from "react";
import DawlaLogo from "./DawlaLogo";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio",         href: "/" },
  { label: "Historia",       href: "/#historia" },
  { label: "Garden Edition", href: "/productos/garden-edition" },
  { label: "Menú",           href: "/#menu" },
  { label: "Galería",        href: "/#galeria" },
];

export default function Header({ isGarden = false }: { isGarden?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isGarden ? "bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#332b26]/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" : "backdrop-blur-md border-b border-dorado/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
      style={scrolled && !isGarden ? { backgroundColor: "color-mix(in srgb, var(--bg-deep) 95%, transparent)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <DawlaLogo className="h-9 w-auto" fill="var(--dorado)" />
        </Link>

        {/* Desktop nav — centrado absolutamente */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-sans text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group ${isGarden ? 'text-[#5c534e] hover:text-[#332b26]' : 'text-beige/70 hover:text-dorado'}`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isGarden ? 'bg-[#332b26]' : 'bg-dorado'}`} />
            </Link>
          ))}
        </nav>

        {/* Botón Contacto — derecha */}
        <div className="hidden md:flex">
          <a
            href="#contacto"
            className={`px-5 py-2 border font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${isGarden ? 'border-[#8c7355] text-[#8c7355] hover:bg-[#8c7355] hover:text-[#fdfbf7]' : 'border-dorado text-dorado hover:bg-dorado hover:text-cafe'}`}
          >
            Contacto
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className={`transition-colors ${isGarden ? 'text-[#332b26]' : 'text-beige hover:text-dorado'}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${isGarden ? 'bg-[#fdfbf7] border-b border-[#332b26]/10' : 'backdrop-blur-xl border-b border-dorado/20'}`}
        style={!isGarden ? { backgroundColor: "var(--bg-deep)" } : {}}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={`font-sans text-sm font-medium tracking-widest uppercase transition-colors ${isGarden ? 'text-[#5c534e] hover:text-[#332b26]' : 'text-beige/70 hover:text-dorado'}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contacto"
            onClick={close}
            className={`mt-2 px-5 py-3 border font-sans text-xs font-semibold tracking-widest uppercase text-center transition-all duration-300 ${isGarden ? 'border-[#8c7355] text-[#8c7355] hover:bg-[#8c7355] hover:text-[#fdfbf7]' : 'border-dorado text-dorado hover:bg-dorado hover:text-cafe'}`}
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
