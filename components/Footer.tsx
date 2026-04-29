"use client";

import DawlaLogo from "./DawlaLogo";

const navLinks = [
  { label: "Inicio",   href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Menú",     href: "#menu" },
  { label: "Galería",  href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer({ isGarden = false }: { isGarden?: boolean }) {
  return (
    <footer className={`relative border-t overflow-hidden ${isGarden ? 'bg-[#fdfbf7] border-[#332b26]/10' : 'border-dorado/15'}`} style={!isGarden ? { backgroundColor: "var(--bg-deep)" } : {}}>
      {/* Patrón top */}
      <div className="absolute inset-0 arabic-pattern opacity-[0.03]" aria-hidden />

      {/* Línea dorada top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />

      {/* Arco decorativo central */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 border border-dorado/8 pointer-events-none"
        style={{ borderRadius: "0 0 50% 50% / 0 0 30% 30%" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top footer */}
        <div className="py-16 grid md:grid-cols-3 gap-12 items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col items-start gap-4">
            <DawlaLogo className="h-9 w-auto" fill="var(--dorado)" />
            <p className={`font-serif text-base italic leading-relaxed max-w-[200px] ${isGarden ? 'text-[#5c534e]' : 'text-beige/50'}`}>
              El arte del chocolate, elevado a ritual.
            </p>
            <p className={`font-sans text-xs tracking-widest uppercase ${isGarden ? 'text-[#8c7355]' : 'text-dorado/40'}`}>
              Bogotá · Colombia
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-5 ${isGarden ? 'text-[#8c7355]' : 'text-dorado/60'}`}>Navegación</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`font-sans text-sm transition-colors duration-300 w-fit ${isGarden ? 'text-[#5c534e] hover:text-[#2a1b18]' : 'text-beige/50 hover:text-dorado'}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacto rápido */}
          <div>
            <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-5 ${isGarden ? 'text-[#8c7355]' : 'text-dorado/60'}`}>Síguenos</p>
            <a
              href="https://www.instagram.com/dawla.chocolateria/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 transition-colors group mb-6 ${isGarden ? 'text-[#5c534e] hover:text-[#2a1b18]' : 'text-beige/50 hover:text-dorado'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span className="font-sans text-sm">@dawla.chocolateria</span>
            </a>

            <div className="mt-4">
              <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-3 ${isGarden ? 'text-[#8c7355]' : 'text-dorado/60'}`}>Pedidos</p>
              <a href="mailto:hola@dawla.co" className={`block font-sans text-sm transition-colors mb-2 ${isGarden ? 'text-[#5c534e] hover:text-[#2a1b18]' : 'text-beige/50 hover:text-dorado'}`}>hola@dawla.co</a>
              <a href="https://wa.me/573054216343" target="_blank" rel="noopener noreferrer" className={`block font-sans text-sm transition-colors ${isGarden ? 'text-[#5c534e] hover:text-[#2a1b18]' : 'text-beige/50 hover:text-dorado'}`}>WhatsApp disponible</a>
            </div>
          </div>
        </div>

        {/* Divisor ornamental */}
        <div className="ornament-divider" style={isGarden ? { opacity: 0.3 } : {}}>
          <span className={`text-xs ${isGarden ? 'text-[#8c7355]' : 'text-dorado/40'}`}>✦</span>
        </div>

        {/* Bottom footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`font-sans text-xs ${isGarden ? 'text-[#8c8078]' : 'text-beige/30'}`}>
            © {new Date().getFullYear()} Dawla. Todos los derechos reservados.
          </p>
          <p className={`font-sans text-xs ${isGarden ? 'text-[#8c8078]' : 'text-beige/20'}`}>
            Elaborado con amor en Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
