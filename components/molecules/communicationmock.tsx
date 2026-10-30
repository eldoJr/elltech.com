"use client";

import { useEffect, useState } from "react";

const thread = [
  {
    from: "Alex", role: "Client", side: "left" as const, time: "9:41 AM",
    text: "Hero motion feels a touch fast on mobile — can we ease it in?",
  },
  {
    from: "Manu", role: "elltech", side: "right" as const, time: "9:43 AM",
    text: "On it. Softening the spring and adding a 40ms enter delay.",
    tag: { label: "hero-spring-v3", status: "Deploying" },
  },
  {
    from: "Manu", role: "elltech", side: "right" as const, time: "9:47 AM",
    text: "Preview is live — check the link above.",
    tag: { label: "hero-spring-v3", status: "Live ✓" },
  },
  {
    from: "Alex", role: "Client", side: "left" as const, time: "9:49 AM",
    text: "Perfect. Ship it.",
  },
];

function Avatar({ name, right }: { name: string; right: boolean }) {
  return (
    <div className="shrink-0 rounded-full flex items-center justify-center" style={{ width: 22, height: 22, background: right ? "var(--accent)" : "var(--bg-default)", border: "1px solid var(--border-default)" }}>
      <span style={{ fontSize: 8, fontWeight: 600, fontFamily: "var(--font-monument)", color: right ? "#fff" : "var(--fg-primary)" }}>{name[0]}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const live = status.includes("✓");
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5" style={{ fontSize: 7, fontFamily: "var(--font-monument)", fontWeight: 500, background: live ? "rgba(34,197,94,0.12)" : "rgba(249,132,97,0.12)", color: live ? "#16a34a" : "var(--accent)", border: `1px solid ${live ? "rgba(34,197,94,0.3)" : "rgba(249,132,97,0.3)"}` }}>
      {!live && <span className="inline-flex rounded-full animate-pulse" style={{ width: 3, height: 3, background: "var(--accent)" }} />}
      {status}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl rounded-bl-md w-fit" style={{ background: "var(--bg-default)", border: "1px solid var(--border-default)" }}>
      {[0, 1, 2].map(i => (
        <div key={i} className="rounded-full" style={{ width: 4, height: 4, background: "var(--fg-muted)", animation: `tmsg 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes tmsg{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-3px)}}`}</style>
    </div>
  );
}

export default function CommunicationMock() {
  const [visible, setVisible] = useState(2);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const replay = () => {
      setVisible(2); setTyping(false);
      setTimeout(() => setTyping(true), 1200);
      setTimeout(() => { setTyping(false); setVisible(3); }, 2800);
      setTimeout(() => setTyping(true), 4000);
      setTimeout(() => { setTyping(false); setVisible(4); }, 5400);
    };
    replay();
    const id = setInterval(replay, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full h-full flex-col overflow-hidden" style={{ background: "var(--bg-surface)", fontFamily: "var(--font-monument)" }}>

      {/* header */}
      <div className="flex shrink-0 items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: "var(--bg-default)", border: "1px solid var(--border-default)" }}>
            <div className="rounded-sm" style={{ width: 5, height: 5, background: "var(--accent)" }} />
            <span style={{ fontSize: 8, fontWeight: 500, color: "var(--fg-primary)" }}>ELL-47</span>
          </div>
          <span className="truncate" style={{ fontSize: 10, fontWeight: 600, color: "var(--fg-primary)" }}>Hero animation</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="relative flex" style={{ width: 6, height: 6 }}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: "rgba(34,197,94,0.4)" }} />
            <span className="relative inline-flex rounded-full bg-green-500" style={{ width: 6, height: 6 }} />
          </span>
          <span style={{ fontSize: 8, color: "var(--fg-muted)" }}>2 online</span>
        </div>
      </div>

      {/* messages */}
      <div className="relative flex-1 overflow-hidden flex flex-col">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4" style={{ background: "linear-gradient(to bottom, var(--bg-surface), transparent)" }} />
        <div className="flex flex-col gap-2 px-3 py-3 overflow-hidden flex-1">

          <div className="flex justify-center">
            <span className="rounded-full px-2 py-0.5" style={{ fontSize: 7, fontWeight: 500, background: "var(--bg-default)", color: "var(--fg-muted)", border: "1px solid var(--border-default)" }}>Today</span>
          </div>

          {thread.slice(0, visible).map((m, i) => (
            <div key={i} className={`flex gap-1.5 ${m.side === "right" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar name={m.from} right={m.side === "right"} />
              <div className={`flex flex-col gap-0.5 max-w-[80%] ${m.side === "right" ? "items-end" : "items-start"}`}>
                <div className={`flex items-baseline gap-1 ${m.side === "right" ? "flex-row-reverse" : ""}`}>
                  <span style={{ fontSize: 8, fontWeight: 600, color: "var(--fg-primary)" }}>{m.from}</span>
                  <span style={{ fontSize: 7, color: "var(--fg-muted)" }}>{m.role} · {m.time}</span>
                </div>
                <div
                  className={`px-2.5 py-1.5 ${m.side === "right" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"}`}
                  style={m.side === "right"
                    ? { background: "var(--accent)", color: "#fff" }
                    : { background: "var(--bg-default)", color: "var(--fg-primary)", border: "1px solid var(--border-default)" }
                  }
                >
                  <p style={{ fontSize: 10, lineHeight: 1.55 }}>{m.text}</p>
                  {m.tag && (
                    <div className="flex items-center gap-1.5 mt-1.5 pt-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }}>
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.85)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.tag.label}</span>
                      <StatusBadge status={m.tag.status} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-1.5 items-end">
              <Avatar name="Manu" right={false} />
              <TypingIndicator />
            </div>
          )}
        </div>
      </div>

      {/* input */}
      <div className="shrink-0 px-3 py-2" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: "var(--bg-default)", border: "1px solid var(--border-default)" }}>
          <input placeholder="Reply to thread…" className="min-w-0 flex-1 bg-transparent outline-none" style={{ fontSize: 10, color: "var(--fg-primary)" }} readOnly />
          <div className="flex items-center gap-1 shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--fg-muted)" }}>
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <div className="rounded flex items-center justify-center" style={{ width: 20, height: 20, background: "var(--accent)" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
