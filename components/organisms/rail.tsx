"use client";

import { useEffect, useRef, useState } from "react";
import Iso from "@/components/atoms/iso";

const items = [
  { n: "01", label: "Digital Infrastructure" },
  { n: "02", label: "Scalable Systems" },
  { n: "03", label: "Distributed Architecture" },
];

interface Props {
  scrollEl: HTMLElement | null;
}

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function List({ barWidth, listRef }: { barWidth: number; listRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={listRef} className="mx-6 border-t border-black/10">
      <div className="flex items-center gap-3 py-3 border-b border-black/10">
        <span className="text-[10px] text-fg-muted">—</span>
        <span className="text-[10px] uppercase tracking-widest text-fg-muted">Services</span>
      </div>
      {items.map(({ n, label }, i) => (
        <div key={n} className="relative">
          <div className="flex items-center gap-4 py-3 border-b border-black/10 hover:bg-black/5 cursor-pointer transition-colors">
            <span className="text-[10px] text-fg-muted w-5">{n}</span>
            <span className="text-[10px] uppercase tracking-widest text-fg-primary">{label}</span>
          </div>
          {i === 0 && (
            <div
              className="absolute bottom-0 left-0 h-[1.5px] bg-fg-primary"
              style={{ width: `${barWidth}%` }}
            />
          )}
        </div>
      ))}
      <div className="py-3" />
    </div>
  );
}

export default function Rail({ scrollEl }: Props) {
  const [progress, setProgress] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);   // flex-1 container
  const listRef = useRef<HTMLDivElement>(null);   // list inner div

  useEffect(() => {
    if (!scrollEl) return;
    const onScroll = () => {
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      setProgress(max > 0 ? clamp(scrollEl.scrollTop / max, 0, 1) : 0);
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollEl]);

  // ISO moves slower — starts at 0.2, finishes at 1.0
  const tIso = easeOut(clamp((progress - 0.2) / 0.8, 0, 1));
  // List: phase 1 (0→0.4) mid, phase 2 (0.6→1) final
  const t1 = easeOut(clamp(progress / 0.4, 0, 1));
  const t2 = easeOut(clamp((progress - 0.6) / 0.4, 0, 1));
  const t = t1 * 0.45 + t2 * 0.55;

  // ISO: slight scale down + exit through top
  const isoScale = 1 - tIso * 0.3;
  const isoTranslateY = tIso * -110; // % of its own height

  // List: measure area height and list height to compute exact upward travel
  // Target: list top sits ~80px below the logo bottom (logo area ~60px)
  // area height - list height - 80px gap = how far up from bottom the list should be
  const areaH = areaRef.current?.offsetHeight ?? 0;
  const listH = listRef.current?.offsetHeight ?? 0;
  const listTranslateY = areaH > 0 && listH > 0 ? -(t * (areaH - listH - 24)) : 0;

  const barWidth = progress * 100;

  return (
    <aside className="w-[28vw] flex-shrink-0 flex flex-col h-screen sticky top-0 border-r border-black/10 bg-bg-surface overflow-hidden">

      {/* Logo */}
      <div className="px-8 py-6 flex-shrink-0 relative z-10">
        <span className="text-base font-bold uppercase text-fg-primary">Elltech</span>
      </div>

      {/* Animated area */}
      <div ref={areaRef} className="relative flex-1 overflow-hidden">

        {/* ISO */}
        <div
          className="absolute inset-0 flex items-center justify-center -translate-y-12"
          style={{
            transform: `translateY(calc(-3rem + ${isoTranslateY}%)) scale(${isoScale})`,
            willChange: "transform",
          }}
        >
          <div className="w-[75%]">
            <Iso />
          </div>
        </div>

        {/* List — anchored to bottom, slides up */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-bg-surface"
          style={{
            transform: `translateY(${listTranslateY}px)`,
            willChange: "transform",
          }}
        >
          <List barWidth={barWidth} listRef={listRef as React.RefObject<HTMLDivElement>} />
        </div>

      </div>
    </aside>
  );
}
