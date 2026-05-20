import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center">
            <Activity className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold">Quantdev</span>
          <span className="text-xs text-muted-foreground ml-2">© 2026 — All rights reserved</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Disclaimer</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
      <p className="max-w-6xl mx-auto mt-6 text-[11px] text-muted-foreground/60 leading-relaxed">
        Trading involves substantial risk and is not suitable for every investor. Quantdev provides
        education and community discussion, not financial advice.
      </p>
    </footer>
  );
}
