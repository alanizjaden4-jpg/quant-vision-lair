import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

type PlanId = "free" | "premium" | "elite";

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>): { plan: PlanId } => {
    const p = search.plan;
    const plan: PlanId = p === "premium" || p === "elite" ? p : "free";
    return { plan };
  },
  head: () => ({
    meta: [
      { title: "Create your account — Quantdev" },
      { name: "description", content: "Sign up for Quantdev and step into the live trading floor." },
    ],
  }),
  component: SignupPage,
});

const planMeta: Record<PlanId, { name: string; tag: string }> = {
  free: { name: "Free Trial", tag: "30 Days Free Access" },
  premium: { name: "Premium", tag: "Most Popular" },
  elite: { name: "Elite", tag: "Inner Circle" },
};

function SignupPage() {
  const { plan } = Route.useSearch();
  const navigate = useNavigate();
  const meta = planMeta[plan as PlanId];
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords don't match");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: { display_name: username },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome to Quantdev!");
    navigate({ to: "/app" });
  };

  const onGoogle = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/app` });
    if (r.error) toast.error(r.error.message ?? "Google sign-in failed");
    if (!r.redirected && !r.error) navigate({ to: "/app" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden grid lg:grid-cols-2">
      <aside className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[140px] animate-float" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-neon-blue/25 blur-[140px] animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute inset-0 grid-bg opacity-50" />
        </div>

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-primary blur-md opacity-60" />
            <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center">
              <Activity className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Quantdev</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary">
            <span className="live-dot mr-2" /> LIVE TRADING FLOOR
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-gradient">
            Step inside the floor.
          </h2>
          <p className="text-muted-foreground max-w-md">
            Real-time streams, real traders, and a community built around clean execution.
          </p>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground">
          Premium fintech. Built for serious traders.
        </p>
      </aside>

      <section className="relative flex items-center justify-center p-6 md:p-12 min-h-screen">
        <div className="absolute inset-0 -z-10 lg:hidden">
          <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="w-full max-w-md">
          <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition mb-6 inline-flex items-center gap-1">
            ← Back to pricing
          </Link>

          <div className="glass-strong rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-primary mb-4">
              <Sparkles className="h-3 w-3" /> {meta.tag}
            </div>
            <h1 className="font-display text-3xl font-bold text-gradient">Create your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Joining <span className="text-foreground font-medium">{meta.name}</span> — welcome to the floor.
            </p>

            <button onClick={onGoogle} className="mt-6 w-full glass-strong hover:bg-white/10 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <Field icon={User} placeholder="Username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
              <Field icon={Mail} placeholder="Email address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field icon={Lock} placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <Field icon={Lock} placeholder="Confirm password" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium bg-gradient-to-r from-primary to-neon-blue text-primary-foreground glow-hover animate-pulse-glow disabled:opacity-70"
              >
                {loading ? "Entering the floor..." : "Create account & enter live"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-5 text-xs text-center text-muted-foreground">
              Already have an account? <Link to="/login" className="text-foreground hover:text-primary transition">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ icon: Icon, ...props }: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        {...props}
        className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm bg-background/40 border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground"
      />
    </div>
  );
}
