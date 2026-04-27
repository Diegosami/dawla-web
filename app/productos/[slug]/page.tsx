import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} · Dawla Chocolatería`,
    description: product.desc,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const isGarden = slug === "garden-edition";

  return (
    <div className={isGarden ? "bg-[#fdfbf7] min-h-screen" : ""}>
      <Header isGarden={isGarden} />
      <main style={!isGarden ? { paddingTop: "5rem" } : {}}>
        <ProductClient product={product} />
      </main>
      <Footer isGarden={isGarden} />
    </div>
  );
}
