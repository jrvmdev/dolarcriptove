import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DolarCriptoVE | Radar Cripto Venezuela",
  description: "Cotización USDT/VES en tiempo real y mercado cripto global",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DolarCriptoVE",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "DolarCriptoVE",
    description: "Cotización USDT/VES en tiempo real y mercado cripto global",
    url: "https://dolarcriptove-xxxx.vercel.app",
    siteName: "DolarCriptoVE",
    images: [
      {
        url: "https://dolarcriptove-xxxx.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DolarCriptoVE",
    description: "Cotización USDT/VES en tiempo real y mercado cripto global",
    images: ["https://dolarcriptove-xxxx.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-900 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
