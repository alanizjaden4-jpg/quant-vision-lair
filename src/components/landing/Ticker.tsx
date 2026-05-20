const tickers = [
  { sym: "BTC", price: "67,432.10", chg: "+2.41%", up: true },
  { sym: "ETH", price: "3,521.88", chg: "+1.82%", up: true },
  { sym: "SOL", price: "184.32", chg: "-0.92%", up: false },
  { sym: "NVDA", price: "892.14", chg: "+3.18%", up: true },
  { sym: "TSLA", price: "248.50", chg: "-1.24%", up: false },
  { sym: "AAPL", price: "215.30", chg: "+0.62%", up: true },
  { sym: "SPY", price: "548.21", chg: "+0.41%", up: true },
  { sym: "EUR/USD", price: "1.0842", chg: "+0.12%", up: true },
  { sym: "XAU/USD", price: "2,431.50", chg: "+0.88%", up: true },
  { sym: "ES", price: "5,482.25", chg: "-0.34%", up: false },
];

export function Ticker() {
  const row = [...tickers, ...tickers];
  return (
    <div className="relative border-y border-border/50 bg-card/30 backdrop-blur-md overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-3 gap-8">
        {row.map((t, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-sm">
            <span className="font-mono font-semibold text-foreground">{t.sym}</span>
            <span className="font-mono text-muted-foreground">${t.price}</span>
            <span className={`font-mono text-xs ${t.up ? "text-success" : "text-destructive"}`}>
              {t.chg}
            </span>
            <span className="text-border">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
