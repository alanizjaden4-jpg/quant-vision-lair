import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, Mail, Lock, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Quantdev" },
      { name: "description", content: "Sign in to the Quantdev trading floor." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    navigate({ to: "/app" });
  };

  const onGoogle = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/app` });
    if (r.error) toast.error(r.error.message ?? "Google sign-in failed");
    if (!r.redirected && !r.error) navigate({ to: "/app" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground grid place-items-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/25 blur-[140px] animate-float" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-neon-blue/20 blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-primary blur-md opacity-60" />
            <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center">
              <Activity className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display text-xl font-semibold">Quantdev</span>
        </Link>

        <div className="glass-strong rounded-2xl p-7">
          <h1 className="font-display text-2xl font-bold text-gradient">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to enter the live floor.</p>

          <button onClick={onGoogle} className="mt-6 w-full glass-strong hover:bg-white/10 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm bg-background/40 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm bg-background/40 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <button type="submit" disabled={loading} className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium bg-gradient-to-r from-primary to-neon-blue text-primary-foreground glow-hover disabled:opacity-70">
              {loading ? "Signing in..." : "Sign in"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-xs text-center text-muted-foreground">
            New to Quantdev? <Link to="/pricing" className="text-foreground hover:text-primary transition">Choose a plan</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
