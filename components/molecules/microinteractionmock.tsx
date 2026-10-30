"use client";

import { useEffect, useState } from "react";

/* ── Button states ── */
function ButtonDemo() {
  const [state, setState] = useState<"idle" | "hover" | "press" | "success">("idle");

  useEffect(() => {
    const steps: [typeof state, number][] = [
      ["idle", 900], ["hover", 700], ["press", 400], ["success", 1200], ["idle", 600],
    ];
    let t = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach(([s, delay]) => { t += delay; timers.push(setTimeout(() => setState(s), t)); });
    const id = setInterval(() => {
      let t2 = 0;
      steps.forEach(([s, delay]) => { t2 += delay; timers.push(setTimeout(() => setState(s), t2)); });
    }, t + 800);
    return () => { timers.forEach(clearTimeout); clearInterval(id); };
  }, []);

  const isSuccess = state === "success";
  const isPress = state === "press";
  const isHover = state === "hover" || isPress || isSuccess;

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 7, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Button</span>
      <div className="flex gap-2 items-center">
        <div className="flex items-center justify-center rounded-md" style={{ height: 26, paddingLeft: 12, paddingRight: 12, background: isSuccess ? "rgba(34,197,94,0.12)" : isHover ? "var(--accent)" : "var(--bg-default)", border: `1px solid ${isSuccess ? "rgba(34,197,94,0.5)" : isHover ? "var(--accent)" : "var(--border-default)"}`, transform: isPress ? "scale(0.95)" : "scale(1)", transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)" }}>
          <span style={{ fontSize: 9, fontFamily: "var(--font-monument)", fontWeight: 500, color: isSuccess ? "#16a34a" : isHover ? "#fff" : "var(--fg-muted)", transition: "color 200ms ease" }}>
            {isSuccess ? "✓ Saved" : "Save changes"}
          </span>
        </div>
        <div className="flex items-center justify-center rounded-md" style={{ height: 26, paddingLeft: 10, paddingRight: 10, border: "1px solid var(--border-default)", opacity: isPress ? 0.4 : 1, transition: "opacity 200ms ease" }}>
          <span style={{ fontSize: 9, fontFamily: "var(--font-monument)", color: "var(--fg-muted)" }}>Cancel</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {(["idle", "hover", "press", "success"] as const).map(s => (
            <div key={s} style={{ width: state === s ? 12 : 4, height: 4, borderRadius: 9999, background: state === s ? "var(--accent)" : "var(--border-default)", transition: "width 300ms cubic-bezier(0.25,1,0.5,1)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Toggle ── */
function ToggleDemo() {
  const [on, setOn] = useState(false);
  useEffect(() => { const id = setInterval(() => setOn(v => !v), 2200); return () => clearInterval(id); }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 7, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Toggle</span>
      <div className="flex flex-col gap-1">
        {[{ label: "Dark mode", active: on }, { label: "Notifications", active: !on }, { label: "Auto-deploy", active: true }].map(({ label, active }) => (
          <div key={label} className="flex items-center justify-between px-2.5 py-1.5 rounded-md" style={{ background: "var(--bg-default)" }}>
            <span style={{ fontSize: 9, fontFamily: "var(--font-monument)", color: "var(--fg-primary)" }}>{label}</span>
            <div className="relative rounded-full shrink-0" style={{ width: 24, height: 13, background: active ? "var(--accent)" : "var(--border-default)", transition: "background 350ms ease" }}>
              <div className="absolute rounded-full" style={{ width: 9, height: 9, top: 2, left: active ? 13 : 2, background: "var(--bg-surface)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 350ms cubic-bezier(0.34,1.56,0.64,1)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Progress ── */
function ProgressDemo() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const steps = [18, 35, 52, 68, 79, 91, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) { setPct(steps[i++]); setTimeout(tick, 380 + i * 60); }
      else setTimeout(() => { i = 0; setPct(0); setTimeout(tick, 300); }, 1800);
    };
    const id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, []);

  const color = pct === 100 ? "#22c55e" : "var(--accent)";

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 7, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Progress</span>
      <div className="flex flex-col gap-1.5 px-2.5 py-2 rounded-md" style={{ background: "var(--bg-default)" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 9, fontFamily: "var(--font-monument)", color: "var(--fg-primary)" }}>{pct === 100 ? "Build complete" : "Building…"}</span>
          <span style={{ fontSize: 9, fontFamily: "var(--font-monument)", color, transition: "color 400ms ease" }}>{pct}%</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "var(--border-default)" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 9999, transition: "width 500ms cubic-bezier(0.16,1,0.3,1), background 400ms ease" }} />
        </div>
        <div className="flex gap-3">
          {["Lint", "Test", "Bundle", "Deploy"].map((step, i) => {
            const done = pct >= [20, 45, 70, 100][i];
            return (
              <div key={step} className="flex items-center gap-1">
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: done ? color : "var(--border-default)", transition: "background 400ms ease", flexShrink: 0 }} />
                <span style={{ fontSize: 7, fontFamily: "var(--font-monument)", color: done ? "var(--fg-primary)" : "var(--fg-muted)", transition: "color 400ms ease" }}>{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Card hover ── */
function CardHoverDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    const seq = [0, null, 1, null, 2, null];
    let i = 0;
    const id = setInterval(() => { setHovered(seq[i % seq.length] as number | null); i++; }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 7, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Card hover</span>
      <div className="flex gap-2">
        {[{ label: "Components", count: "24", icon: "⬡" }, { label: "Animations", count: "12", icon: "◈" }, { label: "Tokens", count: "86", icon: "◉" }].map((c, i) => (
          <div key={c.label} className="flex-1 flex flex-col gap-0.5 rounded-md px-2 py-2" style={{ background: hovered === i ? "var(--accent)" : "var(--bg-default)", border: `1px solid ${hovered === i ? "var(--accent)" : "var(--border-default)"}`, transform: hovered === i ? "translateY(-2px)" : "translateY(0)", transition: "all 280ms cubic-bezier(0.34,1.56,0.64,1)" }}>
            <span style={{ fontSize: 11, lineHeight: 1, color: hovered === i ? "rgba(255,255,255,0.8)" : "var(--fg-muted)", transition: "color 200ms ease" }}>{c.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-monument)", color: hovered === i ? "#fff" : "var(--fg-primary)", transition: "color 200ms ease" }}>{c.count}</span>
            <span style={{ fontSize: 7, fontFamily: "var(--font-monument)", color: hovered === i ? "rgba(255,255,255,0.7)" : "var(--fg-muted)", transition: "color 200ms ease" }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MicrointeractionMock() {
  return (
    <div className="flex w-full h-full flex-col justify-center gap-3 px-5 py-5" style={{ background: "var(--bg-surface)" }}>
      <ButtonDemo />
      <div style={{ height: 1, background: "var(--border-default)" }} />
      <ToggleDemo />
      <div style={{ height: 1, background: "var(--border-default)" }} />
      <ProgressDemo />
      <div style={{ height: 1, background: "var(--border-default)" }} />
      <CardHoverDemo />
    </div>
  );
}
