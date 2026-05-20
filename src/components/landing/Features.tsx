import { Radio, MessageSquare, BarChart3, Shield, Bell, Crown } from "lucide-react";

const features = [
  { icon: Radio, title: "Live Trading Streams", desc: "Watch elite traders execute in real-time. RTMP-powered, OBS-ready, ultra-low latency." },
  { icon: MessageSquare, title: "Real-Time Chat", desc: "Discord-style rooms for crypto, futures, forex, and stocks. Instant signals, zero noise." },
  { icon: BarChart3, title: "Market Intelligence", desc: "Integrated TradingView charts, sentiment analysis, and curated watchlists." },
  { icon: Bell, title: "Instant Alerts", desc: "Push notifications for entries, exits, and breaking news the moment it moves." },
  { icon: Crown, title: "Elite Tier Access", desc: "Private streams, 1:1 mentor sessions, and institutional research." },
  { icon: Shield, title: "Verified Community", desc: "KYC-gated, moderated rooms. No bots, no shills — just serious traders." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-4">FEATURES</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient">
            Everything you need to trade smarter
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Built by traders, for traders. The tools you wish your prop firm had.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative glass rounded-2xl p-7 glow-hover overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-neon-blue/20 grid place-items-center mb-5 border border-primary/30">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
