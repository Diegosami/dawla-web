"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Package, Clock, ChevronDown, Citrus, Nut, Wine, Coffee, Flower2, Star, Layers, Leaf, Truck, type LucideIcon } from "lucide-react";
import type { Product } from "@/lib/products";
import GardenEditionLayout from "./GardenEditionLayout";

const ICON_MAP: Record<string, LucideIcon> = { Citrus, Nut, Wine, Coffee, Flower2, Star, Layers, Leaf };
function Icon({ name, size, style, className }: { name?: string; size: number; style?: React.CSSProperties; className?: string }) {
  if (!name) return null;
  const C = ICON_MAP[name];
  return C ? <C size={size} style={style} className={className} /> : null;
}

export default function ProductClient({ product }: { product: Product }) {
  const isGarden = product.category === "Garden Edition";
  const accent = isGarden ? "#c1968e" : "#aa9531";
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const [zipCode, setZipCode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");

  const calculateShipping = async () => {
    if (!zipCode || zipCode.length < 4) {
      setShippingError("Ingresa un código postal válido.");
      return;
    }
    setLoadingShipping(true);
    setShippingError("");
    setShippingCost(null);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipTo: zipCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cotizar.");
      
      // La API devuelve { rates: [...], quotation_id, is_completed }
      const rates = data.rates || [];
      if (rates.length > 0) {
        const totals = rates.map((r: any) => parseFloat(r.total || "0")).filter((v: number) => v > 0);
        if (totals.length > 0) {
          setShippingCost(Math.min(...totals));
        } else {
          throw new Error("Sin cobertura en esta zona. Escríbenos por WhatsApp para coordinar tu envío.");
        }
      } else {
        throw new Error("Sin cobertura en esta zona. Escríbenos por WhatsApp para coordinar tu envío.");
      }
    } catch (err: any) {
      setShippingError(err.message || "Error al conectar con la transportadora.");
    } finally {
      setLoadingShipping(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current?.offsetHeight ?? 500;
      setShowSticky(window.scrollY > h * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let waLink = `https://wa.me/573054216343?text=Hola%2C%20quiero%20pedir%20${encodeURIComponent(product.name)}%20de%20Dawla`;
  if (shippingCost) {
    waLink += encodeURIComponent(`.\nEl envío al código postal ${zipCode} sale en aprox. $${shippingCost.toLocaleString("es-CO")}.`);
  }

  if (isGarden) {
    return (
      <GardenEditionLayout 
        product={product} 
        waLink={waLink} 
        zipCode={zipCode}
        setZipCode={setZipCode}
        shippingCost={shippingCost}
        loadingShipping={loadingShipping}
        shippingError={shippingError}
        calculateShipping={calculateShipping}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-deep)", color: "inherit" }}>

      {/* ── HERO FULL-BLEED ──────────────────────────────────── */}
      <div ref={heroRef} className="relative w-full" style={{ height: "92vh", minHeight: 560 }}>
        {product.image ? (
          <>
            {/* Desktop */}
            <Image
              src={product.image + "-pc.png"}
              alt={product.name}
              fill
              className="object-cover hidden md:block"
              priority
              sizes="100vw"
            />
            {/* Mobile */}
            <Image
              src={product.image + "-mobile.png"}
              alt={product.name}
              fill
              className="object-cover block md:hidden"
              priority
              sizes="100vw"
            />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${product.color}20, ${product.color}40)` }} />
        )}

        {/* Gradientes sobre la imagen */}
        {isGarden ? (
          <>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #f8f5f0 0%, rgba(248,245,240,0.4) 40%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(248,245,240,0.7) 0%, transparent 60%)" }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,5,8,0.97) 0%, rgba(21,5,8,0.55) 45%, rgba(21,5,8,0.15) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(21,5,8,0.4) 0%, transparent 60%)" }} />
          </>
        )}

        {/* Back */}
        <div className="absolute top-28 left-0 right-0 max-w-7xl mx-auto px-6 md:px-12">
          <Link
            href="/#menu"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase transition-opacity duration-300 hover:opacity-100"
            style={{ color: isGarden ? "#8c7355" : `${accent}70` }}
          >
            <ArrowLeft size={12} />
            Volver
          </Link>
        </div>

        {/* Texto sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-12 pb-16">
          {product.collection && (
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: isGarden ? "#8c7355" : `${accent}80` }}>
              {product.collection}
            </p>
          )}
          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-6 max-w-3xl ${isGarden ? 'text-[#2a1b18]' : 'text-beige'}`}>
            {product.name}
          </h1>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              {product.story && (
                <p className={`font-serif text-lg md:text-xl font-light italic max-w-xl leading-relaxed ${isGarden ? 'text-[#5c534e]' : 'text-beige/60'}`}>
                  "{product.story}"
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-sans text-[10px] tracking-widest uppercase mb-1" style={{ color: isGarden ? "#8c7355" : `${accent}55` }}>
                Precio
              </p>
              <p className="font-sans text-4xl font-semibold" style={{ color: isGarden ? "#a68a64" : accent }}>
                {product.price}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={16} style={{ color: `${accent}50` }} />
        </div>
      </div>

      {/* ── GARDEN EDITION: GALERÍA DE FOTOS ─────────────────── */}
      {isGarden && (
        <section className="py-4 px-4" style={{ backgroundColor: "#f8f5f0" }}>
          <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src="/garden-edition-pc.png" alt="Caja Garden Edition" fill className="object-cover" style={{ objectPosition: "left center" }} sizes="33vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src="/garden-edition-pc.png" alt="Rosas de chocolate" fill className="object-cover" style={{ objectPosition: "center center" }} sizes="33vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src="/garden-edition-pc.png" alt="Detalle de la caja" fill className="object-cover" style={{ objectPosition: "right center" }} sizes="33vw" />
            </div>
          </div>
        </section>
      )}

      {/* ── GARDEN EDITION: ROSE GARDEN COLLECTION ──────────── */}
      {isGarden && (
        <section className="relative overflow-hidden" style={{ backgroundColor: "#f5f0e8" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 items-center">
            {/* Texto + Features */}
            <div className="px-8 md:px-16 py-20">
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide uppercase leading-tight mb-12" style={{ color: "#2a1b18", letterSpacing: "0.08em" }}>
                Rose Garden<br />Collection
              </h2>
              <div className="space-y-8">
                {[
                  { icon: "🌱", label: "Cacao colombiano fino" },
                  { icon: "✋", label: "Hecho a mano artesanalmente" },
                  { icon: "🌿", label: "Ingredientes 100% naturales" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full border flex items-center justify-center text-xl flex-shrink-0" style={{ borderColor: "#c5a882", backgroundColor: "rgba(197, 168, 130, 0.08)" }}>
                      {f.icon}
                    </div>
                    <span className="font-sans text-xs tracking-[0.25em] uppercase" style={{ color: "#5c534e" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Foto del producto */}
            <div className="relative h-[500px] md:h-full min-h-[400px]">
              <Image src="/garden-edition-pc.png" alt="Rose Garden Collection" fill className="object-cover" style={{ objectPosition: "60% center" }} sizes="50vw" />
            </div>
          </div>
        </section>
      )}

      {/* ── GARDEN EDITION: MOMENTOS SIGNIFICATIVOS ──────────── */}
      {isGarden && (
        <section className="py-20 md:py-28" style={{ backgroundColor: "#f8f5f0" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8 md:px-16">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide uppercase leading-tight mb-10" style={{ color: "#2a1b18", letterSpacing: "0.08em" }}>
                Hecha para<br />momentos especiales
              </h2>
              <div className="flex gap-8 mb-10">
                {[
                  { icon: "🎁", label: "Regalo\ncon sentido" },
                  { icon: "🥂", label: "Celebra\ncon estilo" },
                  { icon: "💝", label: "Comparte\nel amor" },
                ].map((f) => (
                  <div key={f.label} className="text-center">
                    <div className="w-14 h-14 rounded-full border flex items-center justify-center text-xl mx-auto mb-3" style={{ borderColor: "#c5a882" }}>
                      {f.icon}
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase whitespace-pre-line leading-relaxed" style={{ color: "#5c534e" }}>{f.label}</span>
                  </div>
                ))}
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border rounded-full font-sans text-[10px] tracking-[0.25em] uppercase transition-colors hover:bg-[#2a1b18] hover:text-[#f8f5f0]"
                style={{ borderColor: "#2a1b18", color: "#2a1b18" }}
              >
                Regalar ahora →
              </a>
            </div>
            {/* Foto con regalo */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image src="/garden-edition-mobile.png" alt="Garden Edition regalo" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </section>
      )}

      {/* ── INFO PRINCIPAL ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-start">

        {/* Descripción */}
        <div>
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: isGarden ? "#8c7355" : `${accent}50` }}>
            Sobre esta {isGarden ? "caja" : "creación"}
          </p>
          <p className={`font-sans text-base leading-[2] mb-10 ${isGarden ? 'text-[#5c534e]' : 'text-beige/65'}`}>
            {product.longDesc}
          </p>

          {/* Ingredientes */}
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: isGarden ? "#8c7355" : `${accent}50` }}>
            Ingredientes Principales
          </p>
          <ul className="space-y-2.5">
            {product.ingredients.map((ing) => (
              <li key={ing} className={`flex items-start gap-3 font-sans text-sm ${isGarden ? 'text-[#5c534e]' : 'text-beige/45'}`}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: isGarden ? "#a68a64" : `${accent}55` }} />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Ficha + CTA */}
        <div className="flex flex-col gap-8">
          {/* Ficha técnica */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: isGarden ? "#8c7355" : `${accent}50` }}>
              Ficha del producto
            </p>
            <div className="grid grid-cols-2 gap-3">
              {product.details.map((d) => (
                <div
                  key={d.label}
                  className="p-5 border"
                  style={{ 
                    borderColor: isGarden ? "rgba(45, 36, 30, 0.08)" : `${accent}15`, 
                    backgroundColor: isGarden ? "rgba(45, 36, 30, 0.02)" : `${accent}05` 
                  }}
                >
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: isGarden ? "#8c7355" : `${accent}45` }}>
                    {d.label}
                  </p>
                  <p className={`font-sans text-sm font-medium ${isGarden ? 'text-[#2a1b18]' : 'text-beige/70'}`}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Urgencia */}
          {isGarden && (
            <div className="flex gap-4 p-5 border" style={{ borderColor: "rgba(45, 36, 30, 0.1)", backgroundColor: "rgba(45, 36, 30, 0.03)" }}>
              <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#a68a64", opacity: 0.9 }} />
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: "#8c7355" }}>
                  Edición limitada
                </p>
                <p className="font-sans text-xs leading-relaxed" style={{ color: "#5c534e" }}>
                  Solo disponible para el Día de las Madres. Cuando se agota la producción, no regresa hasta el próximo año.
                </p>
              </div>
            </div>
          )}

          {/* CTAs y Cotizador */}
          <div className="flex flex-col gap-6">
            
            {/* Cotizador Skydropx */}
            <div className="p-6 border" style={{ borderColor: isGarden ? "rgba(45, 36, 30, 0.08)" : `${accent}20`, backgroundColor: isGarden ? "rgba(45, 36, 30, 0.02)" : `${accent}05` }}>
              <div className="flex items-center gap-2 mb-4">
                <Truck size={16} style={{ color: isGarden ? "#a68a64" : accent }} />
                <p className="font-sans text-xs tracking-widest uppercase" style={{ color: isGarden ? "#8c7355" : `${accent}80` }}>Cotizar envío</p>
              </div>
              <p className={`font-sans text-xs mb-4 leading-relaxed ${isGarden ? 'text-[#5c534e]' : 'text-beige/50'}`}>
                Ingresa tu código postal de 6 dígitos para calcular el costo de entrega a tu ciudad.
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Ej: 110111"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className={`flex-1 bg-transparent border px-4 py-3 font-sans text-sm outline-none transition-colors ${isGarden ? 'border-[#e0d8c8] text-[#2a1b18] placeholder-[#a0958a] focus:border-[#a68a64]' : `border-[#c1968e40] text-beige placeholder-beige/20 focus:border-[${accent}]`}`}
                />
                <button 
                  onClick={calculateShipping}
                  disabled={loadingShipping}
                  className="px-6 border font-sans text-xs font-semibold tracking-widest uppercase transition-colors"
                  style={{ 
                    backgroundColor: isGarden ? "rgba(166, 138, 100, 0.1)" : `${accent}15`, 
                    borderColor: isGarden ? "rgba(166, 138, 100, 0.3)" : `${accent}30`, 
                    color: isGarden ? "#a68a64" : accent 
                  }}
                >
                  {loadingShipping ? "..." : "Calcular"}
                </button>
              </div>
              {shippingError && <p className="font-sans text-xs text-red-400 mt-3">{shippingError}</p>}
              {shippingCost !== null && (
                <div className="mt-4 pt-4 border-t flex justify-between items-center" style={{ borderColor: isGarden ? "rgba(45, 36, 30, 0.08)" : `${accent}15` }}>
                  <p className={`font-sans text-xs ${isGarden ? 'text-[#5c534e]' : 'text-beige/70'}`}>Costo estimado:</p>
                  <p className="font-sans text-lg font-semibold" style={{ color: isGarden ? "#a68a64" : accent }}>${shippingCost.toLocaleString("es-CO")}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-3 px-8 py-5 font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 ${isGarden ? 'hover:scale-101 hover:shadow-md' : 'hover:opacity-85'}`}
              style={{ backgroundColor: isGarden ? "#2a1b18" : accent, color: isGarden ? "#f8f5f0" : "#150508", borderRadius: isGarden ? "9999px" : "0" }}
            >
              <MessageCircle size={16} />
              {isGarden ? "Regálasela · Pedir por WhatsApp" : "Pedir por WhatsApp"}
            </a>
            <a
              href="/#contacto"
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 border font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${isGarden ? 'hover:bg-white' : ''}`}
              style={{ 
                borderColor: isGarden ? "rgba(45, 36, 30, 0.15)" : `${accent}30`, 
                color: isGarden ? "#5c534e" : `${accent}70`,
                borderRadius: isGarden ? "9999px" : "0"
              }}
            >
              <Package size={15} />
              {isGarden ? "Consultar disponibilidad" : "Pedido personalizado"}
            </a>
          </div>
          </div> {/* <- Cierre del contenedor flex flex-col gap-6 */}

          <p className="font-sans text-[10px] text-beige/25 tracking-wider text-center">
            Elaborado a mano en Bogotá · Domicilio disponible
          </p>
        </div>
      </section>

      {/* ── SABORES (solo Garden Edition) ────────────────────── */}
      {isGarden && product.flavors && (() => {
        // Colores sutiles por sabor — solo para el acento lateral
        const flavorAccents = ["#e8c34d", "#d4728a", "#c9956b", "#8b6550", "#d4bf8a"];
        // Emojis florales/botánicos decorativos por sabor
        const flowerEmojis = ["🌺", "🌹", "🥃", "☕", "🌸"];
        
        return (
        <section style={{ backgroundColor: "#faf8f2", color: "#2d241e", overflow: "hidden" }}>

          {/* Header sección — Estilo Botánico */}
          <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
            {/* Elemento decorativo superior */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12" style={{ backgroundColor: `${accent}40` }} />
              <p className="font-sans text-[10px] tracking-[0.6em] uppercase" style={{ color: accent }}>
                Jardín de Sabores
              </p>
              <div className="h-px w-12" style={{ backgroundColor: `${accent}40` }} />
            </div>

            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-8" style={{ color: "#1a1513" }}>
              Cinco rosas.<br />
              <em className="italic" style={{ color: accent }}>Cinco historias.</em>
            </h2>
            
            <p className="font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#5c534e" }}>
              Cada bombón fue pensado de forma independiente. Cada uno tiene su propio relleno, su propio carácter, su propia razón de estar ahí. Juntos, forman la caja perfecta.
            </p>
          </div>

          {/* Un sabor por bloque */}
          {product.flavors.map((flavor, i) => {
            const isEven = i % 2 === 0;
            const flavorColor = flavorAccents[i] || accent;
            
            return (
              <div
                key={flavor.name}
                className="relative py-24 md:py-32 border-t"
                style={{ borderColor: "rgba(45, 36, 30, 0.06)" }}
              >
                {/* Gran número de fondo (Elegante y claro) */}
                <div 
                  className="absolute select-none pointer-events-none hidden md:block transition-transform duration-1000"
                  style={{ 
                    left: isEven ? 'auto' : '10%',
                    right: isEven ? '10%' : 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '28rem', 
                    lineHeight: 0.8, 
                    color: flavorColor, 
                    opacity: 0.05,
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '-0.05em'
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-16 lg:gap-24 items-center">
                  
                  {/* Historia y Descripción (6 columnas) */}
                  <div className={`md:col-span-6 ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500"
                        style={{ backgroundColor: `${flavorColor}15`, color: flavorColor }}
                      >
                        <Icon name={flavor.icon} size={18} strokeWidth={1.5} />
                      </div>
                      <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: `${flavorColor}` }}>
                        Rosa N° {i + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-5xl lg:text-7xl font-light mb-10 leading-[1.1]" style={{ color: "#1a1513" }}>
                      {flavor.name}
                    </h3>
                    
                    <div className="relative p-8 md:p-10 bg-white shadow-sm rounded-2xl mb-8 group hover:shadow-md transition-shadow duration-500" style={{ border: `1px solid rgba(45, 36, 30, 0.04)` }}>
                      {/* Línea decorativa superior izquierda */}
                      <div className="absolute top-0 left-0 w-12 h-[2px] rounded-tl-2xl transition-all duration-500 group-hover:w-full" style={{ backgroundColor: flavorColor }} />
                      
                      <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-6" style={{ color: "#2d241e" }}>
                        &ldquo;{flavor.story}&rdquo;
                      </p>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "#5c534e" }}>
                        {flavor.desc}
                      </p>
                    </div>
                  </div>

                  {/* Ficha técnica del sabor (5 columnas) */}
                  <div className={`md:col-span-5 ${isEven ? "md:col-start-8 md:order-2" : "md:col-start-1 md:order-1"} flex flex-col`}>
                    <div className="w-full bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border" style={{ borderColor: "rgba(45, 36, 30, 0.04)" }}>
                      
                      <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6 font-semibold" style={{ color: "#1a1513" }}>
                        Perfil Sensorial
                      </p>
                      <div className="flex flex-wrap gap-2 mb-12">
                        {flavor.sensorNotes.map((note) => (
                          <span
                            key={note}
                            className="font-sans text-[11px] px-5 py-2.5 rounded-full tracking-wider transition-colors duration-300"
                            style={{ 
                              backgroundColor: `${flavorColor}10`, 
                              color: flavorColor,
                              border: `1px solid ${flavorColor}20` 
                            }}
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <div className="h-px w-full mb-12" style={{ background: `linear-gradient(to right, ${flavorColor}30, transparent)` }} />

                      <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-6 font-semibold" style={{ color: "#1a1513" }}>
                        Composición
                      </p>
                      <ul className="space-y-4">
                        {flavor.ingredients.map((ing) => (
                          <li key={ing} className="flex items-start gap-4 font-sans text-sm" style={{ color: "#5c534e" }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: flavorColor }} />
                            <span className="leading-relaxed">{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA final de sabores */}
          <div className="text-center py-32 px-6 bg-white border-t" style={{ borderColor: "rgba(45, 36, 30, 0.05)" }}>
            <p className="font-serif text-3xl md:text-5xl font-light italic mb-6 leading-relaxed" style={{ color: "#1a1513" }}>
              &ldquo;La caja que dice lo que las<br className="hidden md:block" /> palabras no alcanzan.&rdquo;
            </p>
            <p className="font-sans text-sm mb-12 tracking-[0.2em] uppercase" style={{ color: "#8b807a" }}>
              Lista para entregar · Con mensaje personalizado · Envío a toda Colombia
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 font-sans text-xs font-semibold tracking-[0.3em] uppercase rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#1a1513", color: "#faf8f2", boxShadow: "0 10px 30px -10px rgba(26, 21, 19, 0.3)" }}
            >
              <MessageCircle size={16} />
              Pedir la Garden Edition ahora
            </a>
          </div>
        </section>
        );
      })()}

      {/* ── STICKY CTA ───────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500"
        style={{ transform: showSticky ? "translateY(0)" : "translateY(100%)" }}
      >
        <div
          className="border-t"
          style={{ backgroundColor: "rgba(21,5,8,0.95)", borderColor: `${accent}20`, backdropFilter: "blur(12px)" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-serif text-beige font-light text-lg">{product.name}</p>
              <p className="font-sans text-[10px] tracking-widest uppercase" style={{ color: `${accent}60` }}>
                {product.tag} · {product.price}
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-85 flex-shrink-0"
              style={{ backgroundColor: accent, color: "#150508" }}
            >
              <MessageCircle size={14} />
              {isGarden ? "Regálasela" : "Pedir ahora"}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
