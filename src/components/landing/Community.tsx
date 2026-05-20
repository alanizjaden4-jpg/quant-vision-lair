import { Hash, Volume2, Megaphone } from "lucide-react";

const rooms = [
  { icon: Hash, name: "general", desc: "Community lounge", count: 1284, color: "text-primary" },
  { icon: Hash, name: "crypto", desc: "BTC, ETH, alts", count: 842, color: "text-neon-blue" },
  { icon: Hash, name: "futures", desc: "ES, NQ, CL", count: 521, color: "text-success" },
  { icon: Hash, name: "forex", desc: "Majors & exotics", count: 318, color: "text-primary" },
  { icon: Hash, name: "stocks", desc: "US equities & options", count: 692, color: "text-neon-blue" },
  { icon: Megaphone, name: "announcements", desc: "Team updates", count: 12, color: "text-foreground" },
  { icon: Volume2, name: "voice-lounge", desc: "Live mic rooms", count: 47, color: "text-success" },
  { icon: Hash, name: "education", desc: "Learn the craft", count: 234, color: "text-primary" },
];

export function Community() {
  return (
    <section id="community" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex glass rounded-full px-3 py-1 text-xs text-primary mb-4">COMMUNITY</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight">
              A trading server like no other
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Eight dedicated chat rooms, voice lounges, and live announcements.
              Built on real-time infrastructure for instant signals across every market.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Real-time", "Encrypted", "KYC-gated", "Moderated"].map((t) => (
                <span key={t} className="glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-3 shadow-elegant">
            <div className="space-y-1">
              {rooms.map((r) => (
                <div
                  key={r.name}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition cursor-pointer"
                >
                  <r.icon className={`h-4 w-4 ${r.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.desc}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {r.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
