"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";

interface Props {
  onDone: () => void;
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function Intro({ onDone, targetRef }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const word = wordRef.current;
    const group = groupRef.current;
    if (!root || !logo || !word || !group) return;

    const seq = async () => {
      // 1. logo + wordmark fade in together
      await animate(
        [logo, word],
        { opacity: [0, 1] },
        { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
      );

      // 2. hold
      await new Promise((r) => setTimeout(r, 1000));

      // 3. fly group to exact rail logo position + bg transitions to white simultaneously
      const target = targetRef.current;
      if (target) {
        const from = group.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const dx = to.left - from.left;
        const dy = to.top - from.top;
        animate(
          root,
          { backgroundColor: "#ffffff" },
          { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
        );
        await animate(
          group,
          { x: dx, y: dy },
          { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
        );
      }

      // 4. overlay fades out — logo stays visible throughout
      await animate(root, { opacity: [1, 0] }, { duration: 0.7, ease: "easeIn" });

      onDone();
    };

    seq();
  }, [onDone, targetRef]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "#E9EDEF" }}>
      <div ref={groupRef} className="flex items-center gap-3">
        <img ref={logoRef} src="/logo.svg" alt="" className="h-8 w-auto" style={{ opacity: 0 }} />
        <span
          ref={wordRef}
          className="text-2xl font-bold uppercase text-fg-primary"
          style={{ fontFamily: "var(--font-syne)", opacity: 0 }}
        >
          Elltech
        </span>
      </div>
    </div>
  );
}
