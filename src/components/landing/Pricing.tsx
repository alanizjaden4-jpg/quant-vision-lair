import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "0",
    desc: "Get a feel for the community.",
    features: ["General chat access", "Daily market recap", "Limited stream replays"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "49",
    desc: "For serious active traders.",
    features: ["All chat rooms", "Live streams (HD)", "Real-time alerts", "Watchlist tools", "Stream archive"],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "Elite",
    price: "199",
    desc: "Inner circle access.",
    features: ["Private elite streams", "1:1 mentor sessions", "Institutional research", "Priority support", "Early features"],
    cta: "Apply for Elite",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-4">MEMBERSHIP</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient">
            Choose your edge
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Cancel anytime. No contracts.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-7 ${
                t.highlight
                  ? "glass-strong border-primary/40 glow-primary"
                  : "glass"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-neon-blue text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-gradient">${t.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <button
                className={`mt-6 w-full py-3 rounded-xl font-medium transition ${
                  t.highlight
                    ? "bg-gradient-to-r from-primary to-neon-blue text-primary-foreground glow-hover"
                    : "glass-strong hover:bg-white/10"
                }`}
              >
                {t.cta}
              </button>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
