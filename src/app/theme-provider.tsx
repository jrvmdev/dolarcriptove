"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const t = saved === "light" || saved === "dark" ? saved : "dark";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    setTheme(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    setTheme(next);
  };

  return (
    <>
      {/* HEADER GLOBAL */}
      <header
        className="
          sticky top-0 z-50
          border-b border-border-light dark:border-border-dark
          bg-surface-light dark:bg-surface-dark
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Branding liviano (NO título principal) */}
          <span className="text-xs uppercase tracking-widest text-text-muted">
            DolarCriptoVE
          </span>

          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 rounded-lg text-sm
              border border-border-light dark:border-border-dark
              bg-background-light dark:bg-background-dark
            "
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>
      </header>

      {children}
    </>
  );
}
