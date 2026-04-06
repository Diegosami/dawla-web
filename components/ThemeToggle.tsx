"use client";

import { useEffect, useState } from "react";

type Theme = "cafe" | "azul";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("cafe");

  useEffect(() => {
    const saved = (localStorage.getItem("dawla-theme") as Theme) || "cafe";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "cafe" ? "azul" : "cafe";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("dawla-theme", next);
  };

  return { theme, toggle };
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={theme === "cafe" ? "Cambiar a Azul" : "Cambiar a Café"}
      className="flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-beige/40 hover:text-dorado/80 transition-colors duration-300"
    >
      {/* Pill toggle */}
      <span className="relative inline-flex w-10 h-5 rounded-full border border-dorado/30 transition-colors duration-500"
            style={{ background: theme === "azul" ? "rgba(123,32,56,0.4)" : "rgba(43,27,18,0.6)" }}>
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-500"
          style={{
            left: theme === "azul" ? "calc(100% - 18px)" : "2px",
            background: theme === "azul" ? "#7B2038" : "#a36529",
            boxShadow: `0 0 6px ${theme === "azul" ? "#7B2038" : "#a36529"}`,
          }}
        />
      </span>
      <span className="hidden sm:inline">
        {theme === "cafe" ? "Café" : "Azul"}
      </span>
    </button>
  );
}
