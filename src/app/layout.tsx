import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./theme-provider";

export const metadata: Metadata = {
  title: "DolarCriptoVE | Radar Cripto Venezuela",
  description: "Cotización USDT/VES en tiempo real y mercado cripto global",
  manifest: "/manifest.json",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-[#f4f7fb] text-[#0f172a]
          dark:bg-[#0b0e11] dark:text-[#e5e7eb]
          antialiased
        "
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
