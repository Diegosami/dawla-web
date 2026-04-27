import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: "Dawla · Chocolatería Premium Bogotá",
  description:
    "Dawla es una chocolatería artesanal premium en Bogotá, Colombia. Creaciones únicas con cacao colombiano de origen, inspiradas en la riqueza cultural de Oriente Medio.",
  keywords: ["chocolatería premium Bogotá", "chocolate artesanal Colombia", "bombones gourmet", "regalo chocolate Bogotá", "Dawla chocolate"],
  openGraph: {
    title: "Dawla · Chocolatería Premium Bogotá",
    description: "El arte del chocolate, elevado a ritual. Cacao colombiano de origen.",
    siteName: "Dawla Chocolatería",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: "var(--bg-deep)" }}>{children}</body>
    </html>
  );
}
