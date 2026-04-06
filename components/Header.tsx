"use client";

import { useState, useEffect } from "react";
import DawlaLogo from "./DawlaLogo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio",   href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Menú",     href: "#menu" },
  { label: "Galería",  href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
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
          ? "bg-[#1a1009]/95 backdrop-blur-md border-b border-dorado/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <DawlaLogo className="h-9 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm font-medium tracking-widest uppercase text-beige/70 hover:text-dorado transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-dorado group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-4 px-5 py-2 border border-dorado text-dorado font-sans text-xs font-semibold tracking-widest uppercase hover:bg-dorado hover:text-cafe transition-all duration-300"
          >
            Reservar
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-beige hover:text-dorado transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#1a1009]/98 backdrop-blur-xl border-b border-dorado/20`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-sans text-sm font-medium tracking-widest uppercase text-beige/70 hover:text-dorado transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={close}
            className="mt-2 px-5 py-3 border border-dorado text-dorado font-sans text-xs font-semibold tracking-widest uppercase text-center hover:bg-dorado hover:text-cafe transition-all duration-300"
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  );
}
