import { Maximize2, Volume2, Send } from "lucide-react";

const chatMessages = [
  { user: "AlphaWolf", role: "MOD", msg: "ES breaking 5480 — watch the retest", color: "text-primary" },
  { user: "QuantKing", role: "ELITE", msg: "long entry filled @ 5478.25 🚀", color: "text-neon-blue" },
  { user: "MarketMaven", role: "", msg: "great call, riding it 📈", color: "text-foreground" },
  { user: "BTC_Hodler", role: "PRO", msg: "BTC bouncing off 67k support", color: "text-success" },
  { user: "ScalpGod", role: "", msg: "stop moved to breakeven", color: "text-foreground" },
];

export function LiveStreamPreview() {
  return (
    <section id="streams" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-4">LIVE STREAMING</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient">
            Cinematic trading rooms
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Pro-grade streams with side-by-side chat. Stream from OBS, watch from anywhere.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-3 md:p-4 shadow-elegant">
          <div className="grid md:grid-cols-[1fr_320px] gap-3">
            {/* Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-card via-background to-card border border-border">
              {/* fake chart bg */}
              <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 450" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,300 L50,280 L100,290 L150,250 L200,260 L250,220 L300,200 L350,230 L400,180 L450,170 L500,150 L550,170 L600,120 L650,140 L700,100 L750,110 L800,80 L800,450 L0,450 Z" fill="url(#g1)" />
                <path d="M0,300 L50,280 L100,290 L150,250 L200,260 L250,220 L300,200 L350,230 L400,180 L450,170 L500,150 L550,170 L600,120 L650,140 L700,100 L750,110 L800,80" stroke="oklch(0.75 0.25 295)" strokeWidth="2" fill="none" />
              </svg>

              {/* candlesticks */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-1 h-24 opacity-70">
                {Array.from({ length: 40 }).map((_, i) => {
                  const h = 20 + ((i * 37) % 70);
                  const up = i % 3 !== 0;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${up ? "bg-success/70" : "bg-destructive/70"}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              {/* overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="glass-strong rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs">
                  <span className="live-dot" /> LIVE
                </div>
                <div className="glass-strong rounded-md px-2.5 py-1 text-xs text-muted-foreground">
                  3,421 watching
                </div>
              </div>

              <div className="absolute top-4 right-4 glass-strong rounded-md px-2.5 py-1 text-xs">
                ES • 1m
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass-strong rounded-xl px-4 py-2.5">
                <div>
                  <div className="text-sm font-medium">Morning Power Hour — S&P Futures</div>
                  <div className="text-xs text-muted-foreground">AlphaWolf · Elite</div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Volume2 className="h-4 w-4" />
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="rounded-2xl bg-card/60 border border-border flex flex-col">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">Live Chat</span>
                <span className="text-xs text-muted-foreground">3.4k</span>
              </div>
              <div className="flex-1 p-4 space-y-3 text-sm max-h-[340px] overflow-hidden">
                {chatMessages.map((m, i) => (
                  <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-semibold ${m.color}`}>{m.user}</span>
                      {m.role && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">
                          {m.role}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-snug">{m.msg}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2 rounded-xl bg-background/60 border border-border px-3 py-2">
                  <input
                    disabled
                    placeholder="Join to chat..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <Send className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
