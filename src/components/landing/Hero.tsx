import { ArrowRight, Play, TrendingUp, Users, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* animated gradient bg */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none animate-gradient"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* floating orbs */}
      <div className="absolute top-32 left-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-neon-blue/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8">
          <span className="live-dot" />
          <span>1,284 traders online · 3 live streams now</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
          <span className="text-gradient">Trade Live With</span>
          <br />
          <span className="text-gradient-primary">Real-Time Insight</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          Join a private live trading community with real-time streams, market discussions,
          and institutional-grade analysis from elite traders.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-neon-blue text-primary-foreground font-medium glow-primary animate-pulse-glow">
            Join Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-strong text-foreground font-medium hover:bg-white/10 transition">
            <Play className="h-4 w-4" /> Enter Community
          </button>
        </div>

        {/* live metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Users, label: "Active Traders", value: "12,480+" },
            { icon: TrendingUp, label: "Trades Today", value: "2,341" },
            { icon: Zap, label: "Live Streams", value: "24/7" },
            { icon: Activity, label: "Avg Win Rate", value: "78%" },
          ].map((m) => (
            <div key={m.label} className="glass rounded-2xl p-5 glow-hover">
              <m.icon className="h-5 w-5 text-primary mb-3 mx-auto" />
              <div className="text-2xl font-display font-bold text-gradient">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// fix: import Activity icon used above
import { Activity } from "lucide-react";
