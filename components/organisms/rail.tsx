"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue, animate } from "motion/react";
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
  bgTinted: boolean;
}

const SCROLL_SPRING = { stiffness: 80, damping: 20, mass: 0.8 };
const E = [0.16, 1, 0.3, 1] as const;
const T = { ease: E, duration: 1.4 };

// globalProgress is a continuous 0→N value where N = items.length
// integer part = active index, fractional part = within-section progress
// e.g. 1.4 means item[1] is active, 40% through it
function RailItem({
  n, label, id, index, ready, globalProgress, onItemClick,
}: {
  n: string; label: string; id: string; index: number; ready: boolean;
  globalProgress: MotionValue<number>;
  onItemClick: (id: string) => void;
}) {
  const bottomWidth = useTransform(globalProgress, (g) => {
    const frac = g - index;
    if (frac <= 0) return "0%";
    if (frac >= 1) return "0%";
    return `${frac * 100}%`;
  });
  // number fades from muted to primary as item becomes active
  const numOpacity = useTransform(globalProgress, (g) => {
    const t = Math.min(Math.max(g - (index - 0.3), 0), 0.3) / 0.3;
    return 0.35 + t * 0.65;
  });
  // label weight: interpolate letter-spacing tighter when active
  const labelOpacity = useTransform(globalProgress, (g) => {
    const t = Math.min(Math.max(g - (index - 0.3), 0), 0.3) / 0.3;
    return 0.45 + t * 0.55;
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        className="relative flex items-center gap-4 py-2 hover:bg-black/5 cursor-pointer transition-colors"
        initial={{ y: "105%" }}
        animate={ready ? { y: "0%" } : {}}
        transition={{ ...T, delay: index * 0.07 }}
        onClick={() => onItemClick(id)}
      >
        <motion.span
          className="text-[10px] w-5 text-fg-primary"
          style={{ opacity: numOpacity }}
        >{n}</motion.span>
        <motion.span
          className="text-[10px] uppercase tracking-widest text-fg-primary"
          style={{ opacity: labelOpacity }}
        >{label}</motion.span>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
        <motion.div className="absolute bottom-0 left-0 h-px bg-black" style={{ width: bottomWidth }} />
      </motion.div>
    </div>
  );
}

function List({
  listRef, ready, globalProgress, onItemClick,
}: {
  listRef: React.RefObject<HTMLDivElement>;
  ready: boolean;
  globalProgress: MotionValue<number>;
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
        <RailItem
          key={n}
          n={n} label={label} id={id} index={i}
          ready={ready}
          globalProgress={globalProgress}
          onItemClick={onItemClick}
        />
      ))}
      <div className="py-3" />
    </div>
  );
}

export default function Rail({ scrollEl, logoRef, ready, bgTinted }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const raw = useMotionValue(0);
  const progress = useSpring(raw, SCROLL_SPRING);
  const rawGlobal = useMotionValue(0);
  const globalProgress = useSpring(rawGlobal, { stiffness: 120, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!asideRef.current) return;
    const bg = bgTinted ? "#E9EDEF" : "#ffffff";
    animate(asideRef.current, { backgroundColor: bg }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    if (listContainerRef.current)
      animate(listContainerRef.current, { backgroundColor: bg }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
  }, [bgTinted]);

  useEffect(() => {
    if (!scrollEl) return;
    const onScroll = () => {
      const ctaEl = scrollEl.querySelector("#cta");
      const ctaBottom = ctaEl
        ? (ctaEl as HTMLElement).offsetTop + (ctaEl as HTMLElement).offsetHeight
        : scrollEl.scrollHeight;
      const max = ctaBottom - scrollEl.clientHeight;
      raw.set(max > 0 ? Math.min(Math.max(scrollEl.scrollTop / max, 0), 1) : 0);

      // Compute continuous globalProgress: index + fraction within section
      const sectionIds = items.map((item) => item.id);
      let globalVal = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = scrollEl.querySelector(`#${sectionIds[i]}`) as HTMLElement | null;
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const scrolled = scrollEl.scrollTop - top;
        if (scrolled < 0) break;
        const frac = Math.min(scrolled / height, 1);
        globalVal = i + frac;
        if (frac < 1) break;
      }
      rawGlobal.set(globalVal);

      let current = Math.floor(globalVal);
      setActiveIndex(Math.min(current, sectionIds.length - 1));
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



  return (
    <aside
      ref={asideRef}
      className="w-[32vw] flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden relative"
      style={{ backgroundColor: "#ffffff" }}
    >

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
          ref={listContainerRef}
          className="absolute bottom-0 left-0 right-0"
          style={{ y: listY, backgroundColor: "#ffffff" }}
        >
          <List
            listRef={listRef as React.RefObject<HTMLDivElement>}
            ready={ready}
            globalProgress={globalProgress}
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
