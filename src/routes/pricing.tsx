import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Quantdev | 30 Days Free Access" },
      { name: "description", content: "Start with 30 days free. Choose Free Trial, Premium, or Elite to join the Quantdev live trading community." },
      { property: "og:title", content: "Quantdev Pricing — 30 Days Free" },
      { property: "og:description", content: "Cinematic trading community. Free Trial, Premium, and Elite plans." },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  id: "free" | "premium" | "elite";
  name: string;
  badge: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  icon: typeof Sparkles;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free Trial",
    badge: "30 Days Free Access",
    price: "0",
    period: "for 30 days",
    desc: "Step inside the floor — no card required.",
    features: [
      "Access to live chat room",
      "Watch live streams",
      "Basic community access",
      "Daily market recap",
      "Cancel anytime",
    ],
    cta: "Start 30 Days Free",
    icon: Sparkles,
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Most Popular",
    price: "49",
    period: "/month",
    desc: "For serious active traders.",
    features: [
      "Private streams",
      "Premium rooms",
      "Real-time alerts",
      "Educational content",
      "Stream archive (HD)",
    ],
    cta: "Go Premium",
    icon: Zap,
  },
  {
    id: "elite",
    name: "Elite",
    badge: "Inner Circle",
    price: "199",
    period: "/month",
    desc: "VIP access. Limited seats.",
    features: [
      "Exclusive live sessions",
      "Advanced alerts",
      "VIP channels",
      "Priority access",
      "1:1 mentor sessions",
    ],
    cta: "Apply for Elite",
    icon: Crown,
  },
];

function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] right-[5%] h-[600px] w-[600px] rounded-full bg-neon-blue/20 blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] right-[30%] h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <section className="relative pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-5">
            <span className="live-dot mr-2" /> MEMBERSHIPS OPEN
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient leading-[1.05]">
            Choose your edge.
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free. Stay for the signal. Cancel anytime, no contracts, no friction.
          </p>
        </div>
      </section>

      <section className="relative pb-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isFree = plan.id === "free";
            return (
              <div
                key={plan.id}
                className={`group relative rounded-3xl p-7 flex flex-col transition-all duration-500 animate-fade-in ${
                  plan.highlight
                    ? "glass-strong md:scale-105 md:-translate-y-2 border-primary/40"
                    : "glass hover:-translate-y-1"
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Glow ring for featured */}
                {plan.highlight && (
                  <>
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary via-neon-blue to-primary opacity-60 blur-xl -z-10 animate-pulse-glow" />
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/50 to-neon-blue/50 -z-10" />
                  </>
                )}

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary to-neon-blue text-primary-foreground whitespace-nowrap">
                  {plan.badge}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className={`h-11 w-11 rounded-xl grid place-items-center ${
                    plan.highlight ? "bg-gradient-to-br from-primary to-neon-blue glow-primary" : "glass-strong"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-gradient">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                {isFree && (
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary font-medium">
                    <Sparkles className="h-3.5 w-3.5" /> No credit card required
                  </div>
                )}

                <Link
                  to="/signup"
                  search={{ plan: plan.id }}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition group/btn ${
                    plan.highlight
                      ? "bg-gradient-to-r from-primary to-neon-blue text-primary-foreground glow-hover animate-pulse-glow"
                      : "glass-strong hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition" />
                </Link>

                <ul className="mt-7 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className={`mt-0.5 h-5 w-5 rounded-md grid place-items-center shrink-0 ${
                        plan.highlight ? "bg-primary/20" : "bg-white/5"
                      }`}>
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-4 gap-4 text-center">
          {[
            { k: "12,400+", v: "Active members" },
            { k: "98%", v: "Retention rate" },
            { k: "24/7", v: "Live coverage" },
            { k: "0", v: "Long contracts" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-5">
              <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
