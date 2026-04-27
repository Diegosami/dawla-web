"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, HeadphonesIcon, MessageCircle, Leaf, Sparkles, Heart, Package, Star, ArrowRight, Flower2 } from "lucide-react";
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
    <div className="bg-[#fcfaf7] text-[#332b26] min-h-screen relative selection:bg-[#c5a882] selection:text-white pb-20 md:pb-0">

      {/* ── 1. HERO SECTION (FULL BLEED) ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
        
        {/* Imagen de fondo inmersiva */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/garden-edition-pc.png" 
            alt="Garden Edition Premium Box" 
            fill 
            className="object-cover"
            style={{ objectPosition: "center right" }}
            priority
          />
          {/* Gradiente para asegurar lectura de texto */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(253,251,247,0.9) 0%, rgba(253,251,247,0.7) 40%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(253,251,247,0.4) 0%, transparent 40%)" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full pt-32 pb-24 relative flex flex-col justify-center min-h-[85vh] z-10">
          <Link href="/#menu" className="inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-[#a68a64] hover:text-[#2a1b18] transition-colors mb-16 w-fit bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-[#c5a882]/20">
            <ArrowLeft size={16} /> Volver a la colección
          </Link>

          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-[#c5a882]"></span>
              <p className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-[#c5a882]">
                {product.collection || "Edición Limitada"}
              </p>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] mb-4 text-[#2a1b18] tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8">
              <p className="font-sans text-3xl md:text-4xl text-[#a68a64] font-medium tracking-tight">
                {product.price}
              </p>
            </div>
            
            <p className="font-sans text-sm md:text-base text-[#5c534e] leading-relaxed mb-12 max-w-lg">
              Cinco rosas moldeadas a mano. Cinco historias distintas. Una colección diseñada para sorprender a quien merece lo más excepcional.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#c5a882] text-white px-10 py-4 font-sans text-xs tracking-widest uppercase font-semibold hover:bg-[#b0926d] transition-colors shadow-xl shadow-[#c5a882]/20 rounded-full"
              >
                Comprar Colección
              </a>
              
              <button 
                onClick={scrollToFlavors}
                className="font-sans text-xs tracking-widest uppercase text-[#8c7355] hover:text-[#2a1b18] transition-colors flex items-center gap-2 py-4 bg-white/30 backdrop-blur-sm px-6 rounded-full border border-[#c5a882]/20"
              >
                <Flower2 size={16} />
                Descubrir sabores
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CARACTERÍSTICAS ──────────────────── */}
      <section className="py-24 relative z-10 bg-white border-y border-[#f0e8dc]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdfbf7] flex items-center justify-center mb-6">
                <Leaf size={24} strokeWidth={1.5} className="text-[#c5a882]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2a1b18] mb-4">Arte botánico</h3>
              <p className="font-sans text-sm leading-relaxed text-[#5c534e] max-w-[280px]">
                El diseño de cada rosa es un tributo a la riqueza floral colombiana.
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdfbf7] flex items-center justify-center mb-6">
                <Heart size={24} strokeWidth={1.5} className="text-[#c5a882]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2a1b18] mb-4">Sabores vivos</h3>
              <p className="font-sans text-sm leading-relaxed text-[#5c534e] max-w-[280px]">
                Cinco rellenos distintos que estallan en el paladar con ingredientes de origen.
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#fdfbf7] flex items-center justify-center mb-6">
                <Package size={24} strokeWidth={1.5} className="text-[#c5a882]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2a1b18] mb-4">Listo para regalo</h3>
              <p className="font-sans text-sm leading-relaxed text-[#5c534e] max-w-[280px]">
                Caja rígida con acabados de lujo, cinta de seda y tarjeta personalizada incluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DETALLE DE COLECCIÓN Y COTIZADOR ──────────────────────────── */}
      <section className="py-24 relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square w-full bg-[#f5f0e6] rounded-3xl overflow-hidden shadow-lg relative">
               <Image src="/garden-edition-mobile.png" alt="Interior Garden Edition" fill className="object-cover opacity-95" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-8">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a68a64] mb-4">La Colección</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#2a1b18] mb-8 leading-tight">
              Una declaración <br/><em className="italic text-[#8c7355]">de lujo.</em>
            </h2>
            <p className="font-sans text-sm md:text-base text-[#5c534e] leading-relaxed mb-12 max-w-lg">
              Esta caja es más que chocolate; es una experiencia curada. Incluye 5 rosas de chocolate, cada una pintada a mano con polvo de oro de 23 quilates y lustres nacarados.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <CheckCircle2 size={18} className="text-[#a68a64]" />
                <p className="font-sans text-sm text-[#332b26]">Contenido: 5 bombones · 1 por sabor</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 size={18} className="text-[#a68a64]" />
                <p className="font-sans text-sm text-[#332b26]">Peso total: 75 g aprox.</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 size={18} className="text-[#a68a64]" />
                <p className="font-sans text-sm text-[#332b26]">Vida útil: 10 días (sin conservantes)</p>
              </div>
            </div>

            {/* COTIZADOR SENCILLO */}
            <div className="bg-[#fdfbf7] p-8 rounded-2xl border border-[#f0e8dc]">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={18} className="text-[#a68a64]" />
                <h4 className="font-sans text-sm font-bold tracking-widest uppercase text-[#2a1b18]">Cotizar envío</h4>
              </div>
              <p className="font-sans text-xs text-[#5c534e] mb-6">
                Ingresa tu código postal de 6 dígitos para calcular el costo de entrega a tu ciudad.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Código postal (Ej: 110111)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="flex-1 bg-white border border-[#e0d8c8] text-[#2a1b18] placeholder-[#b0a59a] px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-[#a68a64] rounded-lg"
                />
                <button 
                  onClick={calculateShipping}
                  disabled={loadingShipping}
                  className="bg-[#2a1b18] text-white px-8 py-3 font-sans text-xs tracking-widest uppercase transition-colors hover:bg-[#3a2824] rounded-lg"
                >
                  {loadingShipping ? "Calculando..." : "Calcular"}
                </button>
              </div>
              
              {shippingError && <p className="font-sans text-xs text-red-500 mt-4">{shippingError}</p>}
              
              {shippingCost !== null && (
                <div className="mt-6 pt-6 border-t border-[#f0e8dc] flex justify-between items-center">
                  <p className="font-sans text-xs uppercase tracking-widest text-[#5c534e]">Costo estimado:</p>
                  <p className="font-serif text-2xl text-[#a68a64]">${shippingCost.toLocaleString("es-CO")}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. JARDÍN DE SABORES (GRID LIMPIO) ─────────────────────────────────── */}
      <section id="sabores" className="py-24 bg-white border-y border-[#f0e8dc] relative z-10">
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-24">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#a68a64] mb-4">Degustación</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#2a1b18] mb-8">
            Jardín de Sabores
          </h2>
          <div className="w-px h-16 bg-[#c5a882]/40 mx-auto mb-8"></div>
          <p className="font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-[#5c534e]">
            Un viaje sensorial a través de cinco composiciones magistrales. Cada bombón esconde un universo de texturas y notas aromáticas diseñadas para detener el tiempo.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-24">
          {product.flavors?.map((flavor, i) => {
            const isEven = i % 2 === 0;
            const flavorColor = flavorAccents[i] || "#c5a882";
            
            return (
              <div key={flavor.name} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* IMAGEN */}
                <div className={`relative ${isEven ? "md:order-1" : "md:order-2"}`}>
                  <div className="aspect-square relative rounded-3xl overflow-hidden bg-[#f5f0e6] shadow-md">
                    <Image src="/garden-edition-mobile.png" alt={flavor.name} fill className="object-cover opacity-90" />
                  </div>
                </div>

                {/* TEXTO */}
                <div className={`relative ${isEven ? "md:order-2" : "md:order-1"}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-serif text-2xl italic" style={{ color: flavorColor }}>0{i + 1}</span>
                    <span className="w-8 h-[1px] bg-[#e6dcd0]"></span>
                    <span className="font-sans text-[10px] tracking-widest uppercase text-[#8c8078]">Rosa</span>
                  </div>
                  
                  <h3 className="font-serif text-4xl text-[#2a1b18] mb-6">
                    {flavor.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {flavor.sensorNotes.map(note => (
                      <span key={note} className="font-sans text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#f0e8dc] text-[#8c7355] bg-[#fcfaf7]">
                        {note}
                      </span>
                    ))}
                  </div>
                  
                  <p className="font-sans text-sm text-[#5c534e] leading-loose mb-8">
                    {flavor.story}
                  </p>
                  
                  <div className="p-6 bg-[#fcfaf7] rounded-xl border border-[#f0e8dc]">
                    <p className="font-sans text-xs text-[#5c534e] leading-relaxed">
                      <strong className="text-[#2a1b18] font-semibold">Detalle:</strong> {flavor.desc}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. FINAL CTA ────────────────── */}
      <section className="py-32 bg-[#fcfaf7] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Flower2 size={32} strokeWidth={1.5} className="mx-auto text-[#c5a882] mb-8" />
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2a1b18] mb-8 leading-tight">
            El detalle perfecto<br /><em className="italic text-[#8c7355]">para ella</em>
          </h2>
          <p className="font-sans text-sm text-[#5c534e] mb-12">
            La caja de Garden Edition se agota rápidamente. Asegura la tuya hoy mismo.
          </p>
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex bg-[#2a1b18] text-white px-10 py-4 font-sans text-xs tracking-widest uppercase font-semibold hover:bg-[#3a2824] transition-colors rounded-lg shadow-lg"
          >
            Hacer mi pedido
          </a>
        </div>
      </section>

      {/* ── 6. TRUST BADGES FOOTER ───────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#f0e8dc]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-x-16 gap-y-10">
          {[
            { icon: <ShieldCheck size={24} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Pago Seguro", desc: "Transacciones encriptadas" },
            { icon: <Package size={24} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Empaque de Lujo", desc: "Listo para regalar" },
            { icon: <Truck size={24} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Envíos", desc: "Nacionales y Locales" },
            { icon: <MessageCircle size={24} strokeWidth={1.5} className="text-[#a68a64]"/>, title: "Asesoría", desc: "Compra vía WhatsApp" }
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 max-w-[200px]">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-sans text-xs font-bold text-[#2a1b18] mb-1">{item.title}</p>
                <p className="font-sans text-[10px] text-[#8c8078] leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ── STICKY CTA MOBILE ────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f0e8dc] p-4 shadow-[0_-10px_20px_rgba(42,27,24,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <p className="font-serif text-[#2a1b18] text-lg">{product.name}</p>
          <p className="font-sans text-sm font-bold text-[#c5a882]">{product.price}</p>
        </div>
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#2a1b18] text-white px-6 py-3 font-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded-lg"
        >
           Asegurar regalo <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
