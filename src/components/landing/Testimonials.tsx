const quotes = [
  { name: "Marcus T.", role: "Futures Trader", text: "The live rooms saved me from three bad setups in a week. ROI paid for itself day one." },
  { name: "Priya S.", role: "Options Swing", text: "Finally a community that treats trading like a profession. The moderation is unmatched." },
  { name: "Diego R.", role: "Crypto Scalper", text: "AlphaWolf's morning stream is a religion at this point. Up 38% this quarter." },
  { name: "Lena K.", role: "FX Day Trader", text: "Better signal-to-noise than any Discord I've paid for. The Elite tier is worth every cent." },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-4">TRUSTED</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient">
            Loved by traders worldwide
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quotes.map((q) => (
            <div key={q.name} className="glass rounded-2xl p-6 glow-hover">
              <div className="text-primary mb-3">★★★★★</div>
              <p className="text-sm text-foreground/90 leading-relaxed">"{q.text}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-sm font-semibold">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
