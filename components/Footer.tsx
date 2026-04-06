import DawlaLogo from "./DawlaLogo";

const navLinks = [
  { label: "Inicio",   href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Menú",     href: "#menu" },
  { label: "Galería",  href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1009] border-t border-dorado/15 overflow-hidden">
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
            <DawlaLogo className="h-9 w-auto" />
            <p className="font-serif text-base italic text-beige/50 leading-relaxed max-w-[200px]">
              El arte del chocolate, elevado a ritual.
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-dorado/40">
              Bogotá · Colombia
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-dorado/60 mb-5">Navegación</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-sans text-sm text-beige/50 hover:text-dorado transition-colors duration-300 w-fit"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacto rápido */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-dorado/60 mb-5">Síguenos</p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-beige/50 hover:text-dorado transition-colors group mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span className="font-sans text-sm">@dawla.chocolate</span>
            </a>

            <div className="mt-4">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-dorado/60 mb-3">Pedidos</p>
              <p className="font-sans text-sm text-beige/50">hola@dawla.co</p>
              <p className="font-sans text-sm text-beige/50">WhatsApp disponible</p>
            </div>
          </div>
        </div>

        {/* Divisor ornamental */}
        <div className="ornament-divider">
          <span className="text-dorado/40 text-xs">✦</span>
        </div>

        {/* Bottom footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-beige/30">
            © {new Date().getFullYear()} Dawla. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-beige/20">
            Elaborado con amor en Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
