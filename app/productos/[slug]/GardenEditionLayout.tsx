"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, HeadphonesIcon, MessageCircle, Leaf, Sparkles, Heart, Package, Star, Clock } from "lucide-react";
import type { Product, Flavor } from "@/lib/products";

const flavorAccents = ["#e8c34d", "#d4728a", "#c9956b", "#8b6550", "#d4bf8a"];

interface GardenEditionProps {
  product: Product;
  waLink: string;
  zipCode: string;
  setZipCode: (zip: string) => void;
  shippingCost: number | null;
  loadingShipping: boolean;
  shippingError: string;
  calculateShipping: () => void;
}

export default function GardenEditionLayout({ 
  product, 
  waLink,
  zipCode,
  setZipCode,
  shippingCost,
  loadingShipping,
  shippingError,
  calculateShipping
}: GardenEditionProps) {
  
  const scrollToFlavors = () => {
    document.getElementById('sabores')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#fdfbf7] text-[#332b26] min-h-screen relative selection:bg-[#c5a882] selection:text-white pb-20 md:pb-0">

      {/* ── 1. HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
        {/* Decorative corner top-left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] z-10 pointer-events-none hidden md:block opacity-90">
          <Image 
            src="/image.png" 
            alt="Botanical decoration" 
            fill 
            className="object-cover" 
            style={{ objectPosition: "top left", clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full pt-32 pb-20 relative z-20">
          <Link href="/#menu" className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-[#8c7355] hover:text-[#332b26] transition-colors mb-12">
            <ArrowLeft size={14} /> Volver
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto Hero */}
            <div className="max-w-xl">
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-6 text-[#2a1b18]">
                Un jardín<br />que se saborea
              </h1>
              <p className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-[#8c7355] mb-4">
                Chocolatería Premium Colombiana
              </p>
              <p className="font-sans text-sm md:text-base text-[#5c534e] leading-relaxed mb-10 max-w-md">
                Garden Edition es una edición limitada que celebra la belleza de nuestra tierra y el arte del chocolate.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#c5a882] text-white px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b0926d] transition-colors shadow-lg shadow-[#c5a882]/20"
                >
                  Regálasela →
                </a>
                <button 
                  onClick={scrollToFlavors}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-[#8c7355] hover:text-[#2a1b18] transition-colors"
                >
                  Descubrir sabores ›
                </button>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/garden-edition-pc.png" 
                alt="Garden Edition" 
                fill 
                className="object-cover"
                style={{ objectPosition: "center right" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CARACTERÍSTICAS (3 COLUMNAS) ──────────────────── */}
      <section className="py-20 bg-[#f5f0e6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            {/* Item 1 */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image src="/garden-edition-pc.png" alt="Arte que florece" fill className="object-cover" style={{ objectPosition: "left center" }} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Leaf size={16} className="text-[#c5a882]" />
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#2a1b18]">Arte que florece</h3>
              </div>
              <p className="font-sans text-sm text-[#5c534e] max-w-xs mx-auto">Ilustraciones inspiradas en los jardines colombianos.</p>
            </div>
            {/* Item 2 */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image src="/garden-edition-pc.png" alt="Sabores que enamoran" fill className="object-cover" style={{ objectPosition: "center center" }} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart size={16} className="text-[#c5a882]" />
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#2a1b18]">Sabores que enamoran</h3>
              </div>
              <p className="font-sans text-sm text-[#5c534e] max-w-xs mx-auto">Bombones artesanales con rellenos suaves e inolvidables.</p>
            </div>
            {/* Item 3 */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image src="/garden-edition-pc.png" alt="Edición Limitada" fill className="object-cover" style={{ objectPosition: "right center" }} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star size={16} className="text-[#c5a882]" />
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#2a1b18]">Edición Limitada</h3>
              </div>
              <p className="font-sans text-sm text-[#5c534e] max-w-xs mx-auto">Una colección exclusiva para momentos que merecen ser únicos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DETALLE DE COLECCIÓN Y COTIZADOR ──────────────────────────── */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 lg:pr-8">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8c7355] mb-2 text-center lg:text-left">Colección Especial</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#2a1b18] mb-12 text-center lg:text-left">Garden Edition</h2>
            
            <div className="space-y-8 mb-12">
              {[
                { icon: <Leaf size={20} strokeWidth={1.5} />, title: "Cacao Colombiano", desc: "De origen único y sostenible." },
                { icon: <Package size={20} strokeWidth={1.5} />, title: "Elaboración Artesanal", desc: "Hecho a mano por maestros chocolateros." },
                { icon: <Sparkles size={20} strokeWidth={1.5} />, title: "Ingredientes Naturales", desc: "Sin conservantes ni colorantes artificiales." }
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#e6dcd0] flex items-center justify-center flex-shrink-0 text-[#a68a64] bg-white shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs tracking-[0.1em] uppercase font-semibold text-[#2a1b18] mb-1">{item.title}</h4>
                    <p className="font-sans text-sm text-[#5c534e]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* COTIZADOR ENVÍO */}
            <div className="p-6 border rounded-xl" style={{ borderColor: "rgba(45, 36, 30, 0.08)", backgroundColor: "rgba(45, 36, 30, 0.02)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Truck size={16} className="text-[#a68a64]" />
                <p className="font-sans text-xs tracking-widest uppercase text-[#8c7355]">Cotizar envío</p>
              </div>
              <p className="font-sans text-xs mb-4 leading-relaxed text-[#5c534e]">
                Ingresa tu código postal de 6 dígitos para calcular el costo de entrega a tu ciudad.
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Ej: 110111"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="flex-1 bg-white border border-[#e0d8c8] text-[#2a1b18] placeholder-[#a0958a] px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-[#a68a64] rounded-md"
                />
                <button 
                  onClick={calculateShipping}
                  disabled={loadingShipping}
                  className="px-6 border border-[#a68a64]/30 bg-[#a68a64]/10 text-[#a68a64] font-sans text-xs font-semibold tracking-widest uppercase transition-colors rounded-md hover:bg-[#a68a64]/20"
                >
                  {loadingShipping ? "..." : "Calcular"}
                </button>
              </div>
              {shippingError && <p className="font-sans text-xs text-red-500 mt-3">{shippingError}</p>}
              {shippingCost !== null && (
                <div className="mt-4 pt-4 border-t border-[#332b26]/10 flex justify-between items-center">
                  <p className="font-sans text-xs text-[#5c534e]">Costo estimado:</p>
                  <p className="font-sans text-lg font-semibold text-[#a68a64]">${shippingCost.toLocaleString("es-CO")}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="relative h-[500px] md:h-[700px] w-full rounded-[2rem] overflow-hidden shadow-xl">
              <Image src="/garden-edition-pc.png" alt="Garden Edition Box" fill className="object-cover" style={{ objectPosition: "60% center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. JARDÍN DE SABORES ─────────────────────────────────── */}
      <section id="sabores" className="py-24 bg-white border-y border-[#f0e8dc]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2a1b18] mb-4">
            Jardín de Sabores
          </h2>
          <div className="flex justify-center items-center gap-4 mb-8 text-[#c5a882]">
            <span className="w-12 h-px bg-[#c5a882]"></span>
            <Leaf size={16} />
            <span className="w-12 h-px bg-[#c5a882]"></span>
          </div>
          <p className="font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-[#5c534e]">
            Cada bombón fue pensado de forma independiente. Cada uno tiene su propio relleno, su propio carácter, su propia razón de estar ahí. Juntos, forman la caja perfecta.
          </p>
        </div>

        {product.flavors?.map((flavor, i) => {
          const isEven = i % 2 === 0;
          const flavorColor = flavorAccents[i] || "#c5a882";
          
          return (
            <div key={flavor.name} className="relative py-20 border-t border-[#f0e8dc] overflow-hidden">
              {/* Gran número de fondo */}
              <div 
                className="absolute select-none pointer-events-none hidden md:block"
                style={{ 
                  left: isEven ? 'auto' : '10%',
                  right: isEven ? '10%' : 'auto',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20rem', 
                  lineHeight: 0.8, 
                  color: flavorColor, 
                  opacity: 0.05,
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '-0.05em'
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="relative max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
                <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase font-medium mb-4" style={{ color: flavorColor }}>
                    Rosa N° {i + 1}
                  </p>
                  <h3 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-[#2a1b18]">
                    {flavor.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {flavor.sensorNotes.map(note => (
                      <span key={note} className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 border border-[#e6dcd0] rounded-full text-[#8c7355]">
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-[#5c534e] leading-relaxed mb-6">
                    {flavor.story}
                  </p>
                  <p className="font-sans text-xs text-[#8c8078] italic">
                    {flavor.desc}
                  </p>
                </div>

                <div className={`relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg ${isEven ? "md:order-2" : "md:order-1"}`}>
                  <Image src="/garden-edition-mobile.png" alt={flavor.name} fill className="object-cover" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── 5. FINAL CTA CON BORDES BOTÁNICOS ────────────────── */}
      <section className="relative py-32 bg-[#fdfbf7] overflow-hidden border-b border-[#f0e8dc]">
        {/* Botanical borders left and right using full mockup image cropped */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] opacity-80 pointer-events-none hidden md:block">
          <Image src="/image.png" alt="Botanical left" fill className="object-cover" style={{ objectPosition: "bottom left" }} />
        </div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] opacity-80 pointer-events-none hidden md:block">
          <Image src="/image.png" alt="Botanical right" fill className="object-cover" style={{ objectPosition: "bottom right" }} />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2a1b18] mb-6 leading-tight">
            Haz de cada momento<br />un recuerdo inolvidable
          </h2>
          <p className="font-sans text-sm text-[#5c534e] mb-10">
            Garden Edition, una experiencia que florece en cada bocado.
          </p>
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex bg-[#c5a882] text-white px-10 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b0926d] transition-colors shadow-xl shadow-[#c5a882]/20"
          >
            Regálasela →
          </a>
        </div>
      </section>

      {/* ── 6. TRUST BADGES FOOTER ───────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {[
            { icon: <ShieldCheck size={20} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Pago Seguro", desc: "Transacciones protegidas" },
            { icon: <CheckCircle2 size={20} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Compra 100% Segura", desc: "Tus datos siempre protegidos" },
            { icon: <Truck size={20} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Envíos a Colombia", desc: "Con seguimiento en línea" },
            { icon: <HeadphonesIcon size={20} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Atención Personalizada", desc: "Estamos para ayudarte" }
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              {item.icon}
              <div>
                <p className="font-sans text-[10px] tracking-[0.1em] uppercase font-bold text-[#2a1b18]">{item.title}</p>
                <p className="font-sans text-[10px] text-[#8c8078]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ── STICKY CTA MOBILE ────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f0e8dc] p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3">
          <p className="font-serif text-[#2a1b18] text-lg">{product.name}</p>
          <p className="font-sans font-bold text-[#c5a882]">{product.price}</p>
        </div>
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#c5a882] text-white px-6 py-3 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase font-semibold"
        >
          <MessageCircle size={14} /> Regálasela
        </a>
      </div>
    </div>
  );
}
