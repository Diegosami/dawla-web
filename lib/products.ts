
export type Flavor = {
  name: string;
  icon: string;
  sensorNotes: string[];
  story: string;
  desc: string;
  ingredients: string[];
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  collection?: string;
  desc: string;
  longDesc: string;
  price: string;
  tag: string;
  color: string;
  image?: string;
  icon?: string;
  story?: string;
  ingredients: string[];
  details: { label: string; value: string }[];
  flavors?: Flavor[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "bombon-rosas-del-levante",
    name: "Bombón Rosas del Levante",
    category: "Bombones",
    desc: "Ganache de agua de rosas y cardamomo, cubierta en chocolate negro 72%.",
    longDesc: "Inspirado en los bazares de Oriente Medio, este bombón lleva en su interior una ganache delicada de agua de rosas destilada y cardamomo verde molido al momento. Cubierto en chocolate negro 72% de Tumaco con acabado satinado.",
    price: "$18.000",
    tag: "Signature",
    color: "#c1968e",
    icon: "Star",
    ingredients: ["Chocolate negro 72% Tumaco", "Agua de rosas destilada", "Cardamomo verde", "Crema de leche", "Manteca de cacao"],
    details: [
      { label: "Peso", value: "18 g" },
      { label: "Cacao", value: "72% origen Tumaco" },
      { label: "Conservación", value: "Temperatura ambiente, lugar fresco" },
      { label: "Vida útil", value: "21 días" },
    ],
  },
  {
    id: 2,
    slug: "trufa-cafe-de-origen",
    name: "Trufa Café de Origen",
    category: "Trufas",
    desc: "Cacao Tumaco 85% con notas de cereza y especias orientales.",
    longDesc: "Una trufa que celebra el cacao colombiano. La base es un ganache de cacao Tumaco 85%, con notas naturales de cereza, tabaco suave y especias de la ruta de la seda. Acabado en polvo de cacao crudo.",
    price: "$15.000",
    tag: "Premium",
    color: "#aa9531",
    icon: "Leaf",
    ingredients: ["Cacao Tumaco 85%", "Crema de leche", "Mezcla de especias orientales", "Polvo de cacao crudo"],
    details: [
      { label: "Peso", value: "16 g" },
      { label: "Cacao", value: "85% origen Tumaco" },
      { label: "Conservación", value: "Refrigeración" },
      { label: "Vida útil", value: "14 días" },
    ],
  },
  {
    id: 3,
    slug: "tableta-azul-del-nilo",
    name: "Tableta Azul del Nilo",
    category: "Tabletas",
    desc: "Chocolate leche con tahini, almendras tostadas y sal marina del Pacífico.",
    longDesc: "Una tableta que fusiona el Mediterráneo con Colombia. Chocolate de leche con tahini de sésamo negro, almendras enteras tostadas y una pizca de sal marina del Pacífico colombiano. Acabado artesanal con textura rústica.",
    price: "$32.000",
    tag: "Artesanal",
    color: "#345263",
    icon: "Layers",
    ingredients: ["Chocolate de leche 45%", "Tahini de sésamo negro", "Almendras enteras tostadas", "Sal marina del Pacífico"],
    details: [
      { label: "Peso", value: "80 g" },
      { label: "Cacao", value: "45% leche" },
      { label: "Conservación", value: "Lugar fresco y seco" },
      { label: "Vida útil", value: "60 días" },
    ],
  },
  {
    id: 4,
    slug: "bombon-pistacho-dorado",
    name: "Bombón Pistacho Dorado",
    category: "Bombones",
    desc: "Praliné de pistacho iraní con hoja de oro comestible, 70% dark.",
    longDesc: "El bombón más lujoso de la colección. Praliné elaborado con pistacho iraní de primera selección, encapsulado en chocolate negro 70% y decorado a mano con hoja de oro comestible 23 quilates.",
    price: "$22.000",
    tag: "Lujo",
    color: "#aa9531",
    icon: "Star",
    ingredients: ["Chocolate negro 70%", "Pistacho iraní", "Hoja de oro 23k comestible", "Azúcar de caña", "Manteca de cacao"],
    details: [
      { label: "Peso", value: "20 g" },
      { label: "Cacao", value: "70% dark" },
      { label: "Conservación", value: "Temperatura ambiente" },
      { label: "Vida útil", value: "21 días" },
    ],
  },
  {
    id: 5,
    slug: "trufa-baharat",
    name: "Trufa Baharat",
    category: "Trufas",
    desc: "Mezcla de especias árabes con chocolate blanco y naranja confitada.",
    longDesc: "Baharat es la mezcla de especias más icónica de la cocina árabe. En esta trufa, esas especias —pimienta negra, canela, clavo, nuez moscada— se funden con un ganache de chocolate blanco y naranja confitada artesanalmente.",
    price: "$16.000",
    tag: "Especial",
    color: "#a36529",
    icon: "Leaf",
    ingredients: ["Chocolate blanco 32%", "Naranja confitada artesanal", "Baharat (mezcla 8 especias)", "Crema de leche"],
    details: [
      { label: "Peso", value: "16 g" },
      { label: "Cacao", value: "Blanco 32%" },
      { label: "Conservación", value: "Refrigeración" },
      { label: "Vida útil", value: "14 días" },
    ],
  },
  {
    id: 6,
    slug: "tableta-gran-reserva",
    name: "Tableta Gran Reserva",
    category: "Tabletas",
    desc: "Cacao Nacional 90% de Huila. Fermentado 7 días. Sin aditivos.",
    longDesc: "La expresión más pura del cacao colombiano. Elaborada con granos de cacao Nacional del Huila, fermentados durante 7 días y secados al sol. Sin lecitina, sin vainilla artificial, sin aditivos. Solo cacao y azúcar de panela.",
    price: "$45.000",
    tag: "Origen único",
    color: "#2b1b12",
    icon: "Layers",
    ingredients: ["Cacao Nacional Huila 90%", "Azúcar de panela colombiana"],
    details: [
      { label: "Peso", value: "70 g" },
      { label: "Cacao", value: "90% origen Huila" },
      { label: "Fermentación", value: "7 días" },
      { label: "Vida útil", value: "90 días" },
    ],
  },
  // Garden Edition — UNA caja, 5 sabores adentro
  {
    id: 7,
    slug: "garden-edition",
    name: "Garden Edition",
    category: "Garden Edition",
    collection: "Edición Especial · Día de las Madres",
    desc: "Caja de 5 bombones en forma de rosa · Piña Colada, Avellanas, Baileys, Café y Vainilla.",
    longDesc: "Cinco rosas. Cinco historias. Una caja diseñada para la mujer que lo merece todo. Cada bombón está moldeado a mano en forma de rosa y guarda adentro un relleno distinto — cinco sabores que cuentan algo diferente sobre ella. La caja llega lista para regalar, con presentación botánica premium y acabado artesanal. No hay dos cajas iguales.",
    story: "Porque no hay un solo recuerdo con ella. Hay cinco, por lo menos.",
    price: "$58.000",
    tag: "Edición Limitada",
    color: "#c1968e",
    image: "/garden-edition",
    icon: "Flower2",
    ingredients: [
      "Chocolate fino de origen (blanco, ruby, leche y negro 72%)",
      "Pulpa de piña natural colombiana",
      "Coco tostado artesanal",
      "Avellanas italianas · praliné artesanal",
      "Baileys Original Irish Cream",
      "Espresso Nariño de altura",
      "Vainilla natural en vaina Madagascar",
      "Crema de leche · manteca de cacao pura",
      "Lustre nacarado y polvo de oro comestible 23k",
    ],
    details: [
      { label: "Contenido", value: "5 bombones · 1 por sabor" },
      { label: "Peso total", value: "75 g aprox." },
      { label: "Presentación", value: "Caja botánica premium" },
      { label: "Vida útil", value: "10 días" },
    ],
    flavors: [
      {
        name: "Piña Colada",
        icon: "Citrus",
        sensorNotes: ["Tropical", "Cremoso", "Refrescante", "Dulce natural"],
        story: "Hay tardes en la costa colombiana que huelen exactamente a esto. A brisa tibia, a coco recién tostado, a piña madura que casi no necesita azúcar. Esta rosa nació de ese recuerdo — el de los veranos en familia, los que ella organizaba, los que nunca olvidamos.",
        desc: "Ganache de pulpa de piña natural y coco tostado en chocolate blanco artesanal nacarado.",
        ingredients: ["Chocolate blanco 32%", "Pulpa de piña natural", "Coco tostado artesanal", "Lustre nacarado"],
      },
      {
        name: "Avellanas",
        icon: "Nut",
        sensorNotes: ["Tostado", "Crujiente", "Profundo", "Mantecoso"],
        story: "Ese chocolate que ella guardaba para las visitas especiales — el de la cajita dorada — fue nuestra primera referencia de lujo. Esta rosa es un homenaje a ese recuerdo, pero elevado. Porque ella siempre mereció más.",
        desc: "Praliné de avellana italiana con crujiente de wafer artesanal en chocolate ruby, terminado con polvo de oro 23k.",
        ingredients: ["Chocolate ruby", "Avellanas italianas tostadas", "Praliné artesanal", "Wafer crujiente", "Polvo de oro 23k"],
      },
      {
        name: "Baileys",
        icon: "Wine",
        sensorNotes: ["Aterciopelado", "Cálido", "Sofisticado", "Con carácter"],
        story: "Para las noches de conversación larga, de risa y copa en mano. Esta rosa captura ese momento — el del brindis con ella — con una ganache de Baileys auténtico y chocolate de leche colombiano.",
        desc: "Ganache de Baileys Original Irish Cream con chocolate de leche colombiano 38%.",
        ingredients: ["Chocolate de leche colombiano 38%", "Baileys Original Irish Cream", "Crema de leche"],
      },
      {
        name: "Café de Origen",
        icon: "Coffee",
        sensorNotes: ["Intenso", "Floral", "Amargo elegante", "Persistente"],
        story: "Nariño, a 2.000 metros sobre el nivel del mar. Ahí crecen los granos que ella siempre supo preparar mejor que nadie. La rosa más honesta de la colección: directa, profunda, sin adornos. Como su amor.",
        desc: "Ganache de espresso Nariño de altura en cobertura de chocolate negro 72%.",
        ingredients: ["Chocolate negro 72%", "Espresso Nariño de altura", "Crema de leche"],
      },
      {
        name: "Vainilla",
        icon: "Flower2",
        sensorNotes: ["Floral", "Puro", "Cremoso", "Delicado"],
        story: "La vainilla pura — no el extracto sintético que encontramos en todo — tiene una calidez que es casi imposible de ignorar. La nuestra viene de Madagascar. Para la mamá con el gusto más refinado.",
        desc: "Ganache de vainilla natural en vaina Madagascar en chocolate blanco artesanal con lustre nacarado.",
        ingredients: ["Chocolate blanco 32%", "Vainilla en vaina Madagascar", "Crema de leche", "Lustre nacarado"],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
