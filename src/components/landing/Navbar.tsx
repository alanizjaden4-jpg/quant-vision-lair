import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="glass-strong mx-auto max-w-6xl rounded-2xl px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-primary blur-md opacity-60 group-hover:opacity-100 transition" />
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center">
              <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Quantdev</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#streams" className="hover:text-foreground transition">Live</a>
          <a href="#community" className="hover:text-foreground transition">Community</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/signup" className="hidden sm:inline-flex text-sm px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition">
            Sign in
          </Link>
          <Link to="/pricing" className="relative inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-neon-blue text-primary-foreground font-medium glow-hover">
            Join Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
