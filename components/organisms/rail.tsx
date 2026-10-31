"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Iso from "@/components/atoms/iso";

const items = [
  { n: "01", label: "Digital Engineering" },
  { n: "02", label: "Enterprise Platforms" },
  { n: "03", label: "Application Services" },
  { n: "04", label: "Data & AI Services" },
];

interface Props {
  scrollEl: HTMLElement | null;
  logoRef: React.RefObject<HTMLDivElement>;
}

const SPRING = { stiffness: 80, damping: 20, mass: 0.8 };

function List({
  barWidth,
  listRef,
}: {
  barWidth: ReturnType<typeof useTransform>;
  listRef: React.RefObject<HTMLDivElement>;
}) {
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
            <motion.div
              className="absolute bottom-0 left-0 h-[1.5px] bg-fg-primary"
              style={{ width: barWidth }}
            />
          )}
        </div>
      ))}
      <div className="py-3" />
    </div>
  );
}

export default function Rail({ scrollEl, logoRef }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const raw = useMotionValue(0);
  const progress = useSpring(raw, SPRING);

  useEffect(() => {
    if (!scrollEl) return;
    const onScroll = () => {
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      raw.set(max > 0 ? Math.min(Math.max(scrollEl.scrollTop / max, 0), 1) : 0);
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollEl, raw]);

  // ISO: shrinks to 0, exits upward from its initial offset position
  const isoScale = useTransform(progress, [0, 1], [1, 0]);
  const isoY = useTransform(progress, () => {
    const p = progress.get();
    const isoEl = isoRef.current;
    const areaEl = areaRef.current;
    if (!isoEl || !areaEl) return 0;
    const isoRect = isoEl.getBoundingClientRect();
    const areaRect = areaEl.getBoundingClientRect();
    const distanceToTop = isoRect.top - areaRect.top;
    return -p * (distanceToTop + isoRect.height);
  });

  // List: starts at rail bottom (y=0), travels up to sit below logo
  const listY = useTransform(progress, () => {
    const areaEl = areaRef.current;
    const listEl = listRef.current;
    if (!areaEl || !listEl) return 0;
    const travel = areaEl.offsetHeight - listEl.offsetHeight - 24;
    return -progress.get() * travel;
  });

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <aside className="w-[28vw] flex-shrink-0 flex flex-col h-screen sticky top-0 border-r border-black/10 bg-bg-surface overflow-hidden">

      {/* Logo */}
      <div className="px-8 py-6 flex-shrink-0 relative z-10">
        <div ref={logoRef} className="flex items-center gap-3">
          <img src="/logo.svg" alt="Elltech" className="h-8 w-auto" />
          <span className="text-2xl font-bold uppercase text-fg-primary" style={{ fontFamily: "var(--font-syne)" }}>Elltech</span>
        </div>
      </div>

      {/* Animated area */}
      <div ref={areaRef} className="relative flex-1 overflow-hidden">

        {/* ISO — starts slightly above center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center -translate-y-16"
          style={{ y: isoY, scale: isoScale, originY: 0.5 }}
        >
          <div ref={isoRef} className="w-[75%]">
            <Iso />
          </div>
        </motion.div>

        {/* List — starts at rail bottom, slides up to rest below logo */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-bg-surface"
          style={{ y: listY }}
        >
          <List barWidth={barWidth} listRef={listRef as React.RefObject<HTMLDivElement>} />
        </motion.div>

      </div>
    </aside>
  );
}
