import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa:     "#c1968e",
        azul:     "#345263",
        cafe:     "#2b1b12",
        beige:    "#e5d9c6",
        cafecito: "#a36529",
        dorado:   "#aa9531",
        "cafe-dark": "#1a1009",
      },
      fontFamily: {
        serif:  ["Cormorant", "serif"],
        sans:   ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":   "linear-gradient(135deg, #aa9531 0%, #c8b04a 50%, #aa9531 100%)",
        "dark-gradient":   "linear-gradient(180deg, #1a1009 0%, #2b1b12 50%, #1a1009 100%)",
        "hero-gradient":   "linear-gradient(180deg, rgba(26,16,9,0) 0%, rgba(26,16,9,0.7) 60%, rgba(26,16,9,1) 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.8s ease forwards",
        "fade-in":    "fadeIn 1s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
