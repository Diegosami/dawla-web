"use client";

import { useRef, useEffect, useState } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Contacto() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="relative section-pad overflow-hidden" style={{ background: "var(--bg-mid)" }}>
      {/* Patrón fondo */}
      <div className="absolute inset-0 arabic-pattern-sm opacity-[0.05]" aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />

      {/* Glow centro */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[120px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #aa9531 0%, transparent 70%)" }}
        aria-hidden
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-dorado/70 mb-4">
            Bogotá, Colombia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-beige mb-6">
            Visítanos &amp; <em className="gold-shimmer">Contáctanos</em>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-dorado text-sm">◈</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Información */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h3 className="font-serif text-2xl text-beige mb-8 font-light">Información</h3>

            <div className="space-y-6">
              {[
                {
                  Icon: MapPin,
                  title: "Ubicación",
                  lines: ["Bogotá, Colombia", "Elaborado en casa con amor"],
                },
                {
                  Icon: Clock,
                  title: "Horario de pedidos",
                  lines: ["Lunes a Sábado", "9:00 am — 6:00 pm"],
                },
                {
                  Icon: Phone,
                  title: "WhatsApp",
                  lines: ["+57 305 4216343"],
                },
                {
                  Icon: Mail,
                  title: "Email",
                  lines: ["hola@dawla.co"],
                },
              ].map(({ Icon, title, lines }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 border border-dorado/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-dorado" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-dorado/70 mb-1">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="font-sans text-sm text-beige/70">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 pt-8 border-t border-dorado/15">
              <p className="font-sans text-xs tracking-widest uppercase text-dorado/60 mb-4">Síguenos</p>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-beige/60 hover:text-dorado transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="font-sans text-sm">@dawla.chocolate</span>
                <span className="text-dorado/0 group-hover:text-dorado transition-colors">→</span>
              </a>
            </div>

            {/* Ornamento árabe lateral */}
            <div className="mt-10 relative h-24 overflow-hidden opacity-20">
              <div className="absolute inset-0 arabic-pattern" />
            </div>
          </div>

          {/* Formulario */}
          <div
            className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <h3 className="font-serif text-2xl text-beige mb-8 font-light">Enviar Mensaje</h3>

            {sent ? (
              <div className="border border-dorado/30 p-10 text-center">
                <span className="text-dorado text-4xl mb-4 block">✦</span>
                <h4 className="font-serif text-xl text-beige mb-2">¡Mensaje recibido!</h4>
                <p className="font-sans text-sm text-beige/60">
                  Te responderemos en menos de 24 horas. ¡Gracias por contactar a Dawla!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "nombre", label: "Nombre completo", type: "text", placeholder: "Tu nombre" },
                  { name: "email",  label: "Correo electrónico", type: "email", placeholder: "tu@correo.com" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block font-sans text-xs tracking-widest uppercase text-dorado/60 mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      placeholder={f.placeholder}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-dorado/20 px-4 py-3 font-sans text-sm text-beige placeholder-beige/30 focus:border-dorado/60 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-dorado/60 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Cuéntanos sobre tu pedido o consulta..."
                    value={form.mensaje}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-dorado/20 px-4 py-3 font-sans text-sm text-beige placeholder-beige/30 focus:border-dorado/60 focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-dorado text-cafe font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#c8b04a] transition-all duration-300 shadow-[0_0_20px_rgba(170,149,49,0.2)] hover:shadow-[0_0_30px_rgba(170,149,49,0.4)]"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
