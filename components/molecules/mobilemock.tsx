"use client";

import { useEffect, useRef, useState } from "react";

type Device = "mobile" | "tablet" | "desktop";

const sequence: Device[] = ["mobile", "tablet", "desktop"];
const HOLD = 2800;
const TRANSITION = 600;

const labels: Record<Device, string> = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
};

/* ─── screen content ─── */
function Screen({ device }: { device: Device }) {
  const isMobile = device === "mobile";
  const isDesktop = device === "desktop";
  return (
    <div className="flex flex-col w-full h-full overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      {/* nav */}
      <div className="flex items-center justify-between shrink-0 px-2 py-1.5" style={{ borderBottom: "1px solid var(--border-default)" }}>
        <div className="rounded" style={{ width: isMobile ? 16 : 24, height: 4, background: "var(--accent)", opacity: 0.8 }} />
        {!isMobile && (
          <div className="flex gap-2">
            {[0, 1, 2].map(i => <div key={i} className="rounded-full" style={{ width: 18, height: 3, background: "var(--border-default)" }} />)}
          </div>
        )}
        <div className="rounded-full" style={{ width: isMobile ? 20 : 28, height: isMobile ? 14 : 16, background: "var(--accent)", opacity: 0.9 }} />
      </div>
      {/* hero */}
      <div className="flex flex-col px-2 pt-2 gap-1 shrink-0">
        <div className="rounded-full" style={{ width: 28, height: 3, background: "var(--accent)", opacity: 0.6 }} />
        <div className="rounded" style={{ width: "88%", height: isMobile ? 5 : 6, background: "var(--fg-primary)", opacity: 0.7 }} />
        <div className="rounded" style={{ width: "65%", height: isMobile ? 5 : 6, background: "var(--fg-primary)", opacity: 0.7 }} />
        <div className="rounded" style={{ width: "75%", height: 3, background: "var(--fg-muted)", opacity: 0.4, marginTop: 1 }} />
        <div className="flex gap-1.5 mt-1">
          <div className="rounded-md" style={{ width: isMobile ? 28 : 36, height: isMobile ? 10 : 12, background: "var(--accent)" }} />
          {!isMobile && <div className="rounded-md" style={{ width: 32, height: 12, background: "transparent", border: "1px solid var(--border-default)" }} />}
        </div>
      </div>
      {/* chart */}
      <div className="flex-1 mx-2 mt-2 rounded-lg overflow-hidden flex items-end gap-[2px] px-1.5 pb-1.5" style={{ background: "var(--bg-default)", minHeight: 0 }}>
        {[45, 60, 38, 80, 55, 100, 70, 88, 50, 75, 62, 90]
          .slice(0, isDesktop ? 12 : isMobile ? 6 : 9)
          .map((h, i, arr) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === arr.length - 3 ? "var(--accent)" : "var(--border-default)", opacity: i === arr.length - 3 ? 1 : 0.6 }} />
          ))}
      </div>
      {/* stats */}
      {!isMobile && (
        <div className="flex gap-1 mx-2 mb-2 mt-1 shrink-0">
          {["Uptime", "Latency", "Deploys"].map(l => (
            <div key={l} className="flex-1 rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
              <div className="rounded-full mb-0.5" style={{ width: "50%", height: 3, background: "var(--border-default)" }} />
              <div className="rounded-full" style={{ width: "70%", height: 4, background: "var(--fg-muted)", opacity: 0.5 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── shells ─── */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: 88 }}>
      <div className="absolute flex flex-col gap-1.5" style={{ top: 22, left: -2 }}>
        <div className="rounded-l-sm" style={{ width: 2, height: 10, background: "var(--border-default)" }} />
        <div className="rounded-l-sm" style={{ width: 2, height: 10, background: "var(--border-default)" }} />
      </div>
      <div className="absolute rounded-r-sm" style={{ width: 2, height: 16, top: 26, right: -2, background: "var(--border-default)" }} />
      <div style={{ borderRadius: 18, padding: 3, background: "var(--fg-primary)" }}>
        <div style={{ borderRadius: 16, padding: 2, background: "var(--fg-primary)" }}>
          <div className="relative overflow-hidden" style={{ borderRadius: 14, height: 160 }}>
            {children}
            <div className="absolute top-0 inset-x-0 flex justify-center pt-1.5 z-10">
              <div className="flex items-center gap-1 px-2" style={{ height: 9, borderRadius: 8, background: "rgba(0,0,0,0.8)", minWidth: 32 }}>
                <span className="text-white" style={{ fontSize: 5 }}>elltech.com</span>
                <div className="rounded-full bg-green-500" style={{ width: 3, height: 3 }} />
              </div>
            </div>
            <div className="absolute bottom-1.5 inset-x-0 flex justify-center">
              <div className="rounded-full" style={{ width: 22, height: 3, background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: 160 }}>
      <div className="absolute rounded-r-sm" style={{ width: 2, height: 16, top: 24, right: -2, background: "var(--border-default)" }} />
      <div style={{ borderRadius: 16, padding: 4, background: "var(--fg-primary)", opacity: 0.9 }}>
        <div className="relative overflow-hidden" style={{ borderRadius: 13, height: 200 }}>
          {children}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 5, height: 5, background: "rgba(255,255,255,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

function DesktopShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: 260 }}>
      <div style={{ borderRadius: "10px 10px 0 0", padding: "3px 3px 0", background: "var(--fg-primary)", opacity: 0.9 }}>
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-t-md" style={{ background: "#2a2a2a" }}>
          <div className="flex gap-1">
            {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} className="rounded-full" style={{ width: 5, height: 5, background: c }} />)}
          </div>
          <div className="flex-1 rounded-sm flex items-center px-2" style={{ height: 12, background: "rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 6, color: "rgba(255,255,255,0.4)" }}>elltech.com</span>
          </div>
        </div>
        <div className="overflow-hidden" style={{ height: 160 }}>{children}</div>
      </div>
      <div style={{ height: 2, background: "rgba(0,0,0,0.15)" }} />
      <div className="rounded-b-xl mx-auto" style={{ height: 8, background: "var(--fg-primary)", opacity: 0.7, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <div className="mx-auto rounded-sm" style={{ width: 32, height: 4, marginTop: 2, background: "rgba(255,255,255,0.1)" }} />
      </div>
    </div>
  );
}

const shells = { mobile: PhoneShell, tablet: TabletShell, desktop: DesktopShell };

/* ─── slide track ─── */
function SlideTrack({ current, prev, direction }: { current: Device; prev: Device | null; direction: "left" | "right" }) {
  const [animating, setAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(current);
  const [incoming, setIncoming] = useState<Device | null>(null);
  const prevRef = useRef(current);

  useEffect(() => {
    if (current === prevRef.current) return;
    prevRef.current = current;
    setIncoming(current);
    // trigger reflow then animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimating(true));
    });
    const t = setTimeout(() => {
      setDisplayed(current);
      setIncoming(null);
      setAnimating(false);
    }, TRANSITION);
    return () => clearTimeout(t);
  }, [current]);

  const outX = direction === "left" ? "-100%" : "100%";
  const inX  = direction === "left" ? "100%"  : "-100%";

  const CurrentShell = shells[displayed];
  const IncomingShell = incoming ? shells[incoming] : null;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* outgoing */}
      <div
        className="absolute flex items-center justify-center w-full h-full"
        style={{
          transform: animating ? `translateX(${outX})` : "translateX(0)",
          transition: animating ? `transform ${TRANSITION}ms cubic-bezier(0.76,0,0.24,1)` : "none",
          opacity: animating ? 0.4 : 1,
          willChange: "transform",
        }}
      >
        <CurrentShell><Screen device={displayed} /></CurrentShell>
      </div>

      {/* incoming */}
      {IncomingShell && incoming && (
        <div
          className="absolute flex items-center justify-center w-full h-full"
          style={{
            transform: animating ? "translateX(0)" : `translateX(${inX})`,
            transition: animating ? `transform ${TRANSITION}ms cubic-bezier(0.76,0,0.24,1)` : "none",
            opacity: animating ? 1 : 0.4,
            willChange: "transform",
          }}
        >
          <IncomingShell><Screen device={incoming} /></IncomingShell>
        </div>
      )}
    </div>
  );
}

/* ─── main ─── */
export default function MobileMock() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [prev, setPrev] = useState<Device | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection("left");
      setPrev(sequence[index]);
      setIndex(i => (i + 1) % sequence.length);
    }, HOLD + TRANSITION);
    return () => clearInterval(id);
  }, [index]);

  const current = sequence[index];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "var(--bg-default)" }}>
      <SlideTrack current={current} prev={prev} direction={direction} />

      {/* label + dots overlay */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-2.5 z-20" style={{ background: "linear-gradient(to top, var(--bg-surface) 60%, transparent)" }}>
        <span style={{ fontSize: 11, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", letterSpacing: "0.04em" }}>
          {labels[current]}
        </span>
        <div className="flex gap-1.5 items-center">
          {sequence.map((d, i) => (
            <div
              key={d}
              style={{
                width: index === i ? 18 : 5,
                height: 5,
                borderRadius: 9999,
                background: index === i ? "var(--accent)" : "var(--border-default)",
                transition: `width 400ms cubic-bezier(0.25,1,0.5,1), background 300ms ease`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
