import Header  from "@/components/Header";
import Hero     from "@/components/Hero";
import Historia from "@/components/Historia";
import Menu     from "@/components/Menu";
import Galeria  from "@/components/Galeria";
import Contacto from "@/components/Contacto";
import Footer   from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Historia />
        <Menu />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
