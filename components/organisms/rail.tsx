"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";
import Iso from "@/components/atoms/iso";

const items = [
  { n: "01", label: "Digital Engineering", id: "digital-engineering" },
  { n: "02", label: "Enterprise Platforms", id: "enterprise-platforms" },
  { n: "03", label: "Data & AI Services", id: "data-ai-services" },
];

interface Props {
  scrollEl: HTMLElement | null;
  logoRef: React.RefObject<HTMLDivElement>;
  ready: boolean;
}

const SCROLL_SPRING = { stiffness: 80, damping: 20, mass: 0.8 };
const E = [0.16, 1, 0.3, 1] as const;
const T = { ease: E, duration: 1.4 };

function List({
  barWidth,
  listRef,
  ready,
  activeIndex,
  onItemClick,
}: {
  barWidth: MotionValue<string>;
  listRef: React.RefObject<HTMLDivElement>;
  ready: boolean;
  activeIndex: number;
  onItemClick: (id: string) => void;
}) {
  return (
    <div ref={listRef} className="mx-6">
      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-3 py-2 border-t border-b border-black/10"
          initial={{ y: "105%" }}
          animate={ready ? { y: "0%" } : {}}
          transition={{ ...T, delay: 0 }}
        >
          <span className="text-[10px] text-fg-muted">—</span>
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">Services</span>
        </motion.div>
      </div>
      {items.map(({ n, label, id }, i) => (
        <div key={n} className="overflow-hidden">
          <motion.div
            className="relative flex items-center gap-4 py-2 border-b border-black/10 hover:bg-black/5 cursor-pointer transition-colors"
            initial={{ y: "105%" }}
            animate={ready ? { y: "0%" } : {}}
            transition={{ ...T, delay: i * 0.07 }}
            onClick={() => onItemClick(id)}
          >
            <span className={`text-[10px] w-5 transition-colors ${activeIndex === i ? "text-fg-primary" : "text-fg-muted"}`}>{n}</span>
            <span className={`text-[10px] uppercase tracking-widest transition-colors ${activeIndex === i ? "text-fg-primary font-medium" : "text-fg-primary"}`}>{label}</span>
            <motion.div
              className="absolute bottom-0 left-0 h-[1.5px] bg-fg-primary"
              style={{ width: activeIndex === i ? barWidth : "0%" }}
            />
          </motion.div>
        </div>
      ))}
      <div className="py-3" />
    </div>
  );
}

export default function Rail({ scrollEl, logoRef, ready }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const raw = useMotionValue(0);
  const progress = useSpring(raw, SCROLL_SPRING);

  useEffect(() => {
    if (!scrollEl) return;
    const onScroll = () => {
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      raw.set(max > 0 ? Math.min(Math.max(scrollEl.scrollTop / max, 0), 1) : 0);

      // Determine active section
      const sectionIds = items.map((item) => item.id);
      let current = 0;
      sectionIds.forEach((id, i) => {
        const el = scrollEl.querySelector(`#${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerRect = scrollEl.getBoundingClientRect();
          if (rect.bottom - containerRect.top <= containerRect.height) {
            current = i;
          }
        }
      });
      setActiveIndex(current);
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollEl, raw]);

  const scrollToSection = (id: string) => {
    if (!scrollEl) return;
    const el = scrollEl.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isoScale = useTransform(progress, [0, 1], [1, 0]);
  const isoY = useTransform(progress, () => {
    const p = progress.get();
    const isoEl = isoRef.current;
    const areaEl = areaRef.current;
    if (!isoEl || !areaEl) return 0;
    const isoRect = isoEl.getBoundingClientRect();
    const areaRect = areaEl.getBoundingClientRect();
    return -p * (isoRect.top - areaRect.top + isoRect.height);
  });

  const listY = useTransform(progress, () => {
    const areaEl = areaRef.current;
    const listEl = listRef.current;
    if (!areaEl || !listEl) return 0;
    return -progress.get() * (areaEl.offsetHeight - listEl.offsetHeight - 24);
  });

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <aside className="w-[32vw] flex-shrink-0 flex flex-col h-screen sticky top-0 bg-bg-surface overflow-hidden relative">

      {/* Logo */}
      <div className="px-8 py-6 flex-shrink-0 relative z-10">
        <div ref={logoRef} className="flex items-center gap-3">
          <img src="/logo.svg" alt="Elltech" className="h-8 w-auto" />
          <span className="text-2xl font-bold uppercase text-fg-primary" style={{ fontFamily: "var(--font-syne)" }}>Elltech</span>
        </div>
      </div>

      {/* Animated area */}
      <div ref={areaRef} className="relative flex-1 overflow-hidden">

        {/* ISO — clip container, inner handles scroll-driven motion */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={ready ? { y: "-4rem" } : {}}
            transition={{ ...T, delay: 0 }}
          >
            <motion.div
              style={{ y: isoY, scale: isoScale, originY: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div ref={isoRef} className="w-[75%]">
                <Iso />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* List */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-bg-surface"
          style={{ y: listY }}
        >
          <List
            barWidth={barWidth}
            listRef={listRef as React.RefObject<HTMLDivElement>}
            ready={ready}
            activeIndex={activeIndex}
            onItemClick={scrollToSection}
          />
        </motion.div>

      </div>

      {/* Border line — draws from bottom to top, last */}
      <motion.div
        className="absolute top-0 right-0 w-px bg-black/10"
        initial={{ scaleY: 0 }}
        animate={ready ? { scaleY: 1 } : {}}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 4.5, delay: 0.8 }}
        style={{ height: "100%", transformOrigin: "bottom" }}
      />
    </aside>
  );
}
