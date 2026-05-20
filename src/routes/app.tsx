import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity, Hash, Volume2, Maximize2, Send, Smile, Image as ImageIcon, Gift,
  Bell, Settings, Search, TrendingUp, TrendingDown, Flame, Zap,
  Users, BarChart3, Calendar, Shield, ChevronDown, Megaphone, Brain,
  Bitcoin, LineChart, DollarSign, CircleDot,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Live Floor — Quantdev" },
      { name: "description", content: "The Quantdev live trading floor — streams, chat, alerts." },
    ],
  }),
  component: AppPage,
});

const channels = [
  { name: "general", icon: Hash, live: false, unread: 3 },
  { name: "market-open", icon: Megaphone, live: true, unread: 12 },
  { name: "futures", icon: LineChart, live: true, unread: 47 },
  { name: "stocks", icon: BarChart3, live: false, unread: 8 },
  { name: "crypto", icon: Bitcoin, live: true, unread: 21 },
  { name: "forex", icon: DollarSign, live: false, unread: 0 },
  { name: "announcements", icon: Bell, live: false, unread: 1 },
  { name: "trading-psychology", icon: Brain, live: false, unread: 0 },
];

const initialMessages = [
  { u: "AlphaWolf", role: "MOD", color: "text-primary", msg: "ES breaking 5480 — watch the retest 👀", t: "09:31" },
  { u: "QuantKing", role: "ELITE", color: "text-neon-blue", msg: "long entry filled @ 5478.25 🚀", t: "09:31" },
  { u: "MarketMaven", role: "", color: "text-foreground", msg: "great call, riding it 📈", t: "09:32" },
  { u: "BTC_Hodler", role: "PRO", color: "text-success", msg: "BTC bouncing off 67k support cleanly", t: "09:32" },
  { u: "ScalpGod", role: "", color: "text-foreground", msg: "stop moved to breakeven, free trade now", t: "09:33" },
  { u: "AlphaWolf", role: "MOD", color: "text-primary", msg: "VWAP holding — bulls in full control", t: "09:33" },
  { u: "NewTrader22", role: "", color: "text-foreground", msg: "thanks team, learning so much here 🙏", t: "09:34" },
];

const liveActivities = [
  "FuturesQueen joined #futures",
  "AlphaWolf pinned a message",
  "NQ alert triggered @ 19,420",
  "QuantKing reacted 🔥 to a message",
  "New stream scheduled at 10:00",
  "BTC_Hodler posted a chart",
];

const onlineUsers = [
  { name: "AlphaWolf", role: "MOD", status: "live", color: "bg-primary" },
  { name: "QuantKing", role: "ELITE", status: "online", color: "bg-neon-blue" },
  { name: "BTC_Hodler", role: "PRO", status: "online", color: "bg-success" },
  { name: "MarketMaven", role: "", status: "online", color: "bg-muted-foreground" },
  { name: "ScalpGod", role: "", status: "online", color: "bg-muted-foreground" },
  { name: "FuturesQueen", role: "PRO", status: "online", color: "bg-success" },
  { name: "NewTrader22", role: "", status: "idle", color: "bg-yellow-500" },
  { name: "OptionsNinja", role: "ELITE", status: "online", color: "bg-neon-blue" },
];

function AppPage() {
  const [active, setActive] = useState("futures");
  const [messages, setMessages] = useState(initialMessages);
  const [activityTick, setActivityTick] = useState(0);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const i = setInterval(() => setActivityTick((t) => t + 1), 2400);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setMessages((prev) => {
        const next = [...prev, {
          u: ["ScalpGod", "MarketMaven", "FuturesQueen", "OptionsNinja"][Math.floor(Math.random() * 4)],
          role: "",
          color: "text-foreground",
          msg: ["nice move", "watching closely", "scaling in 📊", "+2R locked in 💰", "next leg incoming", "chart looks clean"][Math.floor(Math.random() * 6)],
          t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }];
        return next.slice(-30);
      });
    }, 3500);
    return () => clearInterval(i);
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((p) => [...p, { u: "You", role: "PRO", color: "text-success", msg: draft, t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setDraft("");
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden flex">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-neon-blue/15 blur-[140px]" />
      </div>

      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/40 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 px-4 h-14 border-b border-border">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-primary blur-md opacity-60" />
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center">
              <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display font-semibold">Quantdev</span>
        </Link>

        <div className="px-3 py-3 border-b border-border">
          <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" /> Search channels...
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
          <Section title="TRADING ROOMS">
            {channels.slice(0, 6).map((c) => (
              <ChannelRow key={c.name} c={c} active={active === c.name} onClick={() => setActive(c.name)} />
            ))}
          </Section>
          <Section title="COMMUNITY">
            {channels.slice(6).map((c) => (
              <ChannelRow key={c.name} c={c} active={active === c.name} onClick={() => setActive(c.name)} />
            ))}
          </Section>
        </div>

        {/* user profile */}
        <div className="border-t border-border p-3 flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-neon-blue grid place-items-center font-semibold text-sm">Y</div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">You</div>
            <div className="text-[10px] text-success">Online · PRO</div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition"><Settings className="h-4 w-4" /></button>
        </div>
      </aside>

      {/* CENTER */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-5 bg-background/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{active}</span>
            <span className="hidden md:inline text-xs text-muted-foreground border-l border-border pl-3">Morning Power Hour — S&P Futures</span>
            <span className="glass-strong rounded-md px-2 py-0.5 text-[10px] flex items-center gap-1.5"><span className="live-dot" /> LIVE</span>
            <span className="hidden md:inline text-xs text-muted-foreground">3,421 watching</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Bell className="h-4 w-4 hover:text-foreground transition cursor-pointer" />
            <Users className="h-4 w-4 hover:text-foreground transition cursor-pointer" />
            <Settings className="h-4 w-4 hover:text-foreground transition cursor-pointer" />
          </div>
        </div>

        {/* Stream */}
        <div className="px-5 pt-5">
          <div className="relative aspect-video max-h-[42vh] rounded-2xl overflow-hidden glass-strong">
            <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 800 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gs" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.65 0.28 295)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,320 L40,300 L80,310 L120,260 L160,275 L200,230 L240,250 L280,200 L320,220 L360,170 L400,190 L440,150 L480,170 L520,120 L560,140 L600,100 L640,120 L680,80 L720,100 L760,60 L800,80 L800,450 L0,450 Z" fill="url(#gs)" />
              <path d="M0,320 L40,300 L80,310 L120,260 L160,275 L200,230 L240,250 L280,200 L320,220 L360,170 L400,190 L440,150 L480,170 L520,120 L560,140 L600,100 L640,120 L680,80 L720,100 L760,60 L800,80" stroke="oklch(0.78 0.22 295)" strokeWidth="2" fill="none" />
            </svg>

            <div className="absolute bottom-8 left-6 right-6 flex items-end gap-1 h-20 opacity-70">
              {Array.from({ length: 60 }).map((_, i) => {
                const h = 20 + ((i * 43 + activityTick * 7) % 70);
                const up = (i + activityTick) % 3 !== 0;
                return <div key={i} className={`flex-1 rounded-sm ${up ? "bg-success/70" : "bg-destructive/70"}`} style={{ height: `${h}%` }} />;
              })}
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="glass-strong rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs"><span className="live-dot" /> LIVE</div>
              <div className="glass-strong rounded-md px-2.5 py-1 text-xs text-muted-foreground">3,421 watching</div>
              <div className="glass-strong rounded-md px-2.5 py-1 text-xs text-muted-foreground hidden md:block">Low latency · RTMP</div>
            </div>
            <div className="absolute top-4 right-4 glass-strong rounded-md px-2.5 py-1 text-xs">ES · 1m · NASDAQ</div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass-strong rounded-xl px-4 py-2.5">
              <div>
                <div className="text-sm font-medium">Morning Power Hour — S&P Futures</div>
                <div className="text-xs text-muted-foreground">AlphaWolf · Elite Mentor</div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col min-h-0 px-5 py-4">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3 animate-fade-in">
                <div className={`h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary/40 to-neon-blue/40 grid place-items-center text-xs font-semibold`}>
                  {m.u.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-semibold ${m.color}`}>{m.u}</span>
                    {m.role && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono flex items-center gap-1">
                        {m.role === "MOD" && <Shield className="h-2.5 w-2.5" />}
                        {m.role}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground">{m.t}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug break-words">{m.msg}</p>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted-foreground italic flex items-center gap-2">
              <span className="flex gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
              </span>
              AlphaWolf is typing...
            </div>
          </div>

          <form onSubmit={send} className="mt-3 glass-strong rounded-xl flex items-center gap-2 px-3 py-2">
            <Smile className="h-4 w-4 text-muted-foreground" />
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <Gift className="h-4 w-4 text-muted-foreground" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message #${active}`}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground py-1.5"
            />
            <button type="submit" className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center glow-hover">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-border bg-card/40 backdrop-blur-xl overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Fear & Greed */}
          <Widget title="Fear & Greed Index" icon={Flame}>
            <div className="relative h-28 grid place-items-center">
              <svg viewBox="0 0 120 70" className="w-full h-full">
                <defs>
                  <linearGradient id="fg" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.24 25)" />
                    <stop offset="50%" stopColor="oklch(0.75 0.2 90)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 155)" />
                  </linearGradient>
                </defs>
                <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke="url(#fg)" strokeWidth="8" strokeLinecap="round" />
                <circle cx="85" cy="28" r="4" fill="oklch(0.98 0 0)" />
              </svg>
              <div className="absolute bottom-0 text-center">
                <div className="font-display text-2xl font-bold text-success">72</div>
                <div className="text-[10px] text-muted-foreground">GREED</div>
              </div>
            </div>
          </Widget>

          {/* Market Sentiment */}
          <Widget title="Market Sentiment" icon={TrendingUp}>
            <div className="space-y-2">
              {[
                { s: "Bullish", v: 64, c: "bg-success" },
                { s: "Neutral", v: 22, c: "bg-muted-foreground" },
                { s: "Bearish", v: 14, c: "bg-destructive" },
              ].map((r) => (
                <div key={r.s}>
                  <div className="flex justify-between text-xs mb-1"><span>{r.s}</span><span className="text-muted-foreground">{r.v}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden"><div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} /></div>
                </div>
              ))}
            </div>
          </Widget>

          {/* Active alerts */}
          <Widget title="Active Alerts" icon={Zap}>
            <div className="space-y-2 text-xs">
              {[
                { s: "ES", p: "5480", d: "Breakout", up: true },
                { s: "BTC", p: "67,200", d: "Support", up: true },
                { s: "EUR/USD", p: "1.0845", d: "Resistance", up: false },
              ].map((a) => (
                <div key={a.s} className="glass rounded-lg p-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.s} <span className="text-muted-foreground">@ {a.p}</span></div>
                    <div className="text-[10px] text-muted-foreground">{a.d}</div>
                  </div>
                  {a.up ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                </div>
              ))}
            </div>
          </Widget>

          {/* Online users */}
          <Widget title={`Online — ${onlineUsers.length}`} icon={CircleDot}>
            <div className="space-y-1.5">
              {onlineUsers.map((u) => (
                <div key={u.name} className="flex items-center gap-2.5 text-sm py-1">
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/40 to-neon-blue/40 grid place-items-center text-[10px] font-semibold">{u.name[0]}</div>
                    <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ${u.color} border border-card`} />
                  </div>
                  <span className="flex-1 truncate text-xs">{u.name}</span>
                  {u.role && <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-mono">{u.role}</span>}
                </div>
              ))}
            </div>
          </Widget>

          {/* Stream schedule */}
          <Widget title="Stream Schedule" icon={Calendar}>
            <div className="space-y-2 text-xs">
              {[
                { t: "10:00", n: "Power Hour Recap", h: "AlphaWolf" },
                { t: "13:30", n: "Crypto Outlook", h: "BTC_Hodler" },
                { t: "16:00", n: "Closing Bell Live", h: "QuantKing" },
              ].map((s) => (
                <div key={s.n} className="glass rounded-lg p-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.n}</div>
                    <div className="text-[10px] text-muted-foreground">{s.h}</div>
                  </div>
                  <div className="text-primary font-mono">{s.t}</div>
                </div>
              ))}
            </div>
          </Widget>

          {/* Trending */}
          <Widget title="Trending Now" icon={Flame}>
            <div className="space-y-1.5 text-xs">
              {["$NVDA earnings beat", "Fed pause speculation", "BTC reclaims 67k", "Yen intervention", "Oil supply shock"].map((t, i) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-primary font-mono text-[10px] w-4">#{i + 1}</span>
                  <span className="text-muted-foreground truncate">{t}</span>
                </div>
              ))}
            </div>
          </Widget>

          {/* Live activity ticker */}
          <Widget title="Live Activity" icon={Activity}>
            <div className="space-y-1.5 text-xs">
              {liveActivities.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground truncate">{a}</span>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-2 mb-1.5 flex items-center justify-between text-[10px] font-semibold text-muted-foreground tracking-wider">
        {title} <ChevronDown className="h-3 w-3" />
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function ChannelRow({ c, active, onClick }: { c: typeof channels[number]; active: boolean; onClick: () => void }) {
  const Icon = c.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition group relative ${
        active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gradient-to-b from-primary to-neon-blue glow-primary" />}
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left truncate">{c.name}</span>
      {c.live && <span className="live-dot" />}
      {c.unread > 0 && !c.live && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/30 text-primary font-mono">{c.unread}</span>
      )}
    </button>
  );
}

function Widget({ title, icon: Icon, children }: { title: string; icon: typeof Activity; children: React.ReactNode }) {
  return (
    <div className="glass-strong rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold tracking-wide">{title}</span>
      </div>
      {children}
    </div>
  );
}
