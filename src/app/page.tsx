"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

type Coin = {
  id: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
};

type VesBand = {
  band: string;
  buy: number;
  sell: number;
};

type VesData = {
  rate: number;
  mid: number;
  bands: VesBand[];
};

export default function Page() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [ves, setVes] = useState<VesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/market").then((r) => r.json()),
      fetch("/api/usdt-ves").then((r) => r.json()),
    ])
      .then(([market, vesData]) => {
        setCoins(Array.isArray(market) ? market : []);
        if (vesData && Array.isArray(vesData.bands)) {
          setVes(vesData);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-accent text-lg animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* HEADER */}
        <header className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              DolarCriptoVE
            </h1>
            <p className="text-text-muted text-lg">
              Radar cripto Venezuela
            </p>
          </div>

          {/* USDT / VES */}
          {ves && (
            <section
              className="
                relative overflow-hidden rounded-3xl p-8
                border border-border-light dark:border-border-dark
                bg-surface-light dark:bg-surface-dark
              "
            >
              <div className="relative z-10">
                <div className="text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">
                  🇻🇪 USDT / VES
                </div>

                <div className="flex items-baseline gap-3 mb-8">
                  <div className="text-5xl font-bold">
                    {ves.mid.toFixed(2)}
                  </div>
                  <div className="text-lg text-text-muted">
                    Bs · Precio medio
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ves.bands.map((b) => (
                    <div
                      key={b.band}
                      className="
                        rounded-2xl p-5
                        border border-border-light dark:border-border-dark
                        bg-background-light/60 dark:bg-background-dark/60
                        backdrop-blur
                      "
                    >
                      <div className="text-xs text-text-muted font-medium mb-4 text-center">
                        {b.band} USDT
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-xl px-3 py-2 border border-success/30 bg-success/10">
                          <div className="text-xs text-success mb-1">
                            Vender USDT
                          </div>
                          <div className="text-lg font-bold">
                            {b.buy.toFixed(2)} Bs
                          </div>
                        </div>

                        <div className="rounded-xl px-3 py-2 border border-danger/30 bg-danger/10">
                          <div className="text-xs text-danger mb-1">
                            Comprar USDT
                          </div>
                          <div className="text-lg font-bold">
                            {b.sell.toFixed(2)} Bs
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-5" />
            </section>
          )}
        </header>

        {/* MARKET */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-text-muted">
            Top 10 Mercado Global
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {coins.slice(0, 10).map((c) => {
              const up = c.price_change_percentage_24h >= 0;

              return (
                <div
                  key={c.id}
                  className="
                    group relative overflow-hidden rounded-2xl p-4
                    border border-border-light dark:border-border-dark
                    bg-surface-light dark:bg-surface-dark
                    transition
                  "
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-base font-bold">
                      {c.symbol.toUpperCase()}
                    </div>
                    <div
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        up
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      {up ? "+" : ""}
                      {c.price_change_percentage_24h.toFixed(1)}%
                    </div>
                  </div>

                  <div className="h-16 mb-3 -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={c.sparkline_in_7d.price.map((v) => ({ v }))}
                      >
                        <defs>
                          <linearGradient
                            id={`grad-${c.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={up ? "#22c55e" : "#ef4444"}
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="100%"
                              stopColor={up ? "#22c55e" : "#ef4444"}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="v"
                          stroke={up ? "#22c55e" : "#ef4444"}
                          fill={`url(#grad-${c.id})`}
                          strokeWidth={2}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-xl font-bold mb-1">
                    ${c.current_price.toLocaleString()}
                  </div>

                  <div className="text-xs text-text-muted">
                    MCap ${(c.market_cap / 1e9).toFixed(1)}B
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="pt-8 text-center text-xs text-text-muted">
          Datos en tiempo real · CoinGecko API
        </footer>
      </div>
    </main>
  );
}
