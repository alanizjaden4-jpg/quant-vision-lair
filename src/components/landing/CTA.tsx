import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="relative glass-strong rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 animate-gradient" style={{
            background: "radial-gradient(ellipse at 30% 30%, oklch(0.5 0.28 295 / 0.4), transparent 60%), radial-gradient(ellipse at 70% 70%, oklch(0.55 0.22 250 / 0.3), transparent 60%)"
          }} />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient leading-tight">
              The market won't wait.
              <br />
              Neither should you.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              Join Quantdev today and trade alongside the sharpest minds in the game.
            </p>
            <button className="mt-10 group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-primary to-neon-blue text-primary-foreground font-medium glow-primary animate-pulse-glow">
              Get instant access
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
