import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity, Hash, Volume2, Maximize2, Send, Paperclip, X, Shield,
  Bell, Settings, Search, ChevronDown, LineChart, Bitcoin, BarChart3, Flame, LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Live Floor — Quantdev" },
      { name: "description", content: "The Quantdev live trading floor — streams and chat." },
    ],
  }),
  component: AppPage,
});

type ChannelId = "general" | "crypto" | "stocks-options" | "futures" | "commodities";

const channels: { id: ChannelId; label: string; icon: typeof Hash }[] = [
  { id: "general", label: "general", icon: Hash },
  { id: "crypto", label: "crypto & coins", icon: Bitcoin },
  { id: "stocks-options", label: "stocks & options", icon: BarChart3 },
  { id: "futures", label: "futures", icon: LineChart },
  { id: "commodities", label: "commodities", icon: Flame },
];

type Message = {
  id: string;
  channel: string;
  user_id: string;
  content: string | null;
  attachment_url: string | null;
  attachment_type: string | null;
  attachment_name: string | null;
  created_at: string;
};

type Profile = { id: string; display_name: string | null; email: string | null };

function AppPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const [active, setActive] = useState<ChannelId>("general");
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [draft, setDraft] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auth gate
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user.id ?? null);
      setUserEmail(session?.user.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setUserEmail(data.session?.user.email ?? null);
      setAuthChecked(true);
      if (!data.session) navigate({ to: "/login" });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Host check
  useEffect(() => {
    if (!userId) return setIsHost(false);
    supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "host").maybeSingle()
      .then(({ data }) => setIsHost(!!data));
  }, [userId]);

  // Load messages + subscribe
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("channel", active)
        .order("created_at", { ascending: true })
        .limit(200);
      if (error) return toast.error(error.message);
      if (cancelled) return;
      setMessages((data ?? []) as Message[]);
      void hydrateProfiles((data ?? []).map((m) => m.user_id));
    })();

    const channel = supabase
      .channel(`messages:${active}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `channel=eq.${active}` },
        (payload) => {
          const m = payload.new as Message;
          setMessages((p) => (p.find((x) => x.id === m.id) ? p : [...p, m]));
          void hydrateProfiles([m.user_id]);
        })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages", filter: `channel=eq.${active}` },
        (payload) => {
          const old = payload.old as { id: string };
          setMessages((p) => p.filter((x) => x.id !== old.id));
        })
      .subscribe();

    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [active, userId]);

  // Profile hydration
  const hydrateProfiles = async (ids: string[]) => {
    const missing = Array.from(new Set(ids)).filter((id) => id && !profiles[id]);
    if (missing.length === 0) return;
    const { data } = await supabase.from("profiles").select("id, display_name, email").in("id", missing);
    if (data) {
      setProfiles((p) => {
        const next = { ...p };
        for (const row of data) next[row.id] = row as Profile;
        return next;
      });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !draft.trim()) return;
    const content = draft.trim();
    setDraft("");
    const { error } = await supabase.from("messages").insert({ channel: active, user_id: userId, content });
    if (error) toast.error(error.message);
  };

  const onPickFile = () => fileInputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !userId) return;
    if (file.size > 10 * 1024 * 1024) return toast.error("Max file size is 10MB");
    setUploading(true);
    const ext = file.name.split(".").pop() || "bin";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("chat-attachments").upload(path, file, { contentType: file.type });
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { data: pub } = supabase.storage.from("chat-attachments").getPublicUrl(path);
    const isImage = file.type.startsWith("image/");
    const { error } = await supabase.from("messages").insert({
      channel: active, user_id: userId,
      content: draft.trim() || null,
      attachment_url: pub.publicUrl,
      attachment_type: isImage ? "image" : "file",
      attachment_name: file.name,
    });
    setDraft("");
    setUploading(false);
    if (error) toast.error(error.message);
  };

  const deleteMessage = async (m: Message) => {
    const { error } = await supabase.from("messages").delete().eq("id", m.id);
    if (error) toast.error(error.message);
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/" }); };

  if (!authChecked) {
    return <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">Loading…</div>;
  }

  const activeMeta = channels.find((c) => c.id === active)!;
  const displayName = (id: string) =>
    profiles[id]?.display_name || profiles[id]?.email?.split("@")[0] || "trader";

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden flex">
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

        <div className="flex-1 overflow-y-auto px-2 py-3">
          <div className="px-2 mb-1.5 flex items-center justify-between text-[10px] font-semibold text-muted-foreground tracking-wider">
            TRADING ROOMS <ChevronDown className="h-3 w-3" />
          </div>
          <div className="space-y-0.5">
            {channels.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition relative ${
                    isActive ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gradient-to-b from-primary to-neon-blue" />}
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left truncate">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border p-3 flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-neon-blue grid place-items-center font-semibold text-sm uppercase">
              {(userEmail ?? "?").slice(0, 1)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{userEmail ?? "You"}</div>
            <div className="text-[10px] text-success flex items-center gap-1">
              {isHost ? <><Shield className="h-2.5 w-2.5" /> HOST</> : "Online"}
            </div>
          </div>
          <button onClick={signOut} title="Sign out" className="text-muted-foreground hover:text-foreground transition">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* CENTER */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-border flex items-center justify-between px-5 bg-background/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{activeMeta.label}</span>
            <span className="glass-strong rounded-md px-2 py-0.5 text-[10px] flex items-center gap-1.5"><span className="live-dot" /> LIVE</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <Settings className="h-4 w-4" />
          </div>
        </div>

        {/* Stream visual */}
        <div className="px-5 pt-5">
          <div className="relative aspect-video max-h-[38vh] rounded-2xl overflow-hidden glass-strong">
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
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="glass-strong rounded-md px-2.5 py-1 flex items-center gap-1.5 text-xs"><span className="live-dot" /> LIVE</div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass-strong rounded-xl px-4 py-2.5">
              <div>
                <div className="text-sm font-medium">Live Stream</div>
                <div className="text-xs text-muted-foreground">Host broadcast</div>
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                No messages yet in <span className="text-foreground">#{activeMeta.label}</span>. Be the first to say something.
              </div>
            )}
            {messages.map((m) => {
              const name = displayName(m.user_id);
              const canDelete = isHost || m.user_id === userId;
              const time = new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              const isMe = m.user_id === userId;
              return (
                <div key={m.id} className="group flex gap-3 animate-fade-in relative">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary/40 to-neon-blue/40 grid place-items-center text-xs font-semibold uppercase">
                    {name.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm font-semibold ${isMe ? "text-success" : "text-foreground"}`}>{name}</span>
                      <span className="text-[10px] text-muted-foreground">{time}</span>
                    </div>
                    {m.content && (
                      <p className="text-sm text-muted-foreground leading-snug break-words">{m.content}</p>
                    )}
                    {m.attachment_url && m.attachment_type === "image" && (
                      <a href={m.attachment_url} target="_blank" rel="noreferrer" className="block mt-2 max-w-sm">
                        <img src={m.attachment_url} alt={m.attachment_name ?? "attachment"} className="rounded-lg border border-border max-h-80 object-cover" />
                      </a>
                    )}
                    {m.attachment_url && m.attachment_type !== "image" && (
                      <a href={m.attachment_url} target="_blank" rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 glass rounded-lg px-3 py-2 text-xs hover:bg-white/10 transition">
                        <Paperclip className="h-3.5 w-3.5" /> {m.attachment_name ?? "attachment"}
                      </a>
                    )}
                  </div>
                  {canDelete && (
                    <button
                      onClick={() => deleteMessage(m)}
                      title={isHost && !isMe ? "Delete (host)" : "Delete"}
                      className="opacity-0 group-hover:opacity-100 transition absolute top-1 right-1 h-7 w-7 rounded-md grid place-items-center bg-background/80 border border-border hover:bg-destructive/20 hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <form onSubmit={send} className="mt-3 glass-strong rounded-xl flex items-center gap-2 px-3 py-2">
            <input ref={fileInputRef} type="file" hidden onChange={onFile} accept="image/*,application/pdf,.csv,.txt,.xlsx,.docx" />
            <button type="button" onClick={onPickFile} disabled={uploading} title="Attach file or image"
              className="h-8 w-8 rounded-lg grid place-items-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition disabled:opacity-50">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={uploading ? "Uploading…" : `Message #${activeMeta.label}`}
              disabled={uploading}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground py-1.5"
            />
            <button type="submit" disabled={uploading || !draft.trim()} className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-neon-blue grid place-items-center glow-hover disabled:opacity-50">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
