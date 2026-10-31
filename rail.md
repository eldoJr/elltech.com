# Rail Animation — Intent & Better Approach

## What you're trying to do (the idea)

The left rail is a sticky sidebar that reacts to the scroll position of the main
content. As the visitor scrolls down through the hero + the three service
sections, the rail should tell a small story:

1. **At rest (top of page):** the ISO wireframe graphic sits centered in the
   rail, large and calm. The services list is parked off-screen at the bottom.
2. **While scrolling:** the services list slides up from the bottom into view.
   As it rises toward the center, the ISO graphic gracefully gets out of the
   way — shrinking and drifting up and out through the top.
3. **A progress underline** grows under the "active" service item to reflect how
   far through the content you've scrolled.
4. **End state (bottom of page):** the list is settled in its final position,
   the ISO is gone, and the active item tracks where you are.

So it's a **scroll-linked, two-actor choreography**: the list enters while the
ISO exits, with a progress indicator tying it to scroll position. The feel we
want is smooth, inevitable, and tied 1:1 to the scrollbar (not a fire-once
transition).

## Why the current version feels "not perfect"

The logic is sound but it's fighting itself in a few places:

1. **Layout is measured during render, one frame late.**
   `areaRef.current?.offsetHeight` and `listRef.current?.offsetHeight` are read
   inside the render body. On the first render they're `0`, and after that
   they're whatever the *previous* paint was. Any resize (window, font load,
   zoom) makes the math stale until the next scroll event nudges it. This is the
   main source of the "slightly off" / jumpy feeling.

2. **Scroll handler drives React state directly.**
   Every scroll event calls `setProgress`, which re-renders the whole component.
   That couples a 60–120 Hz input to React's reconciler. It works, but it's the
   kind of thing that stutters on slower devices and under load.

3. **The phase split is a magic-number guess.**
   `t1 (0→0.4)`, `t2 (0.6→1)`, blended `0.45/0.55`, plus a `120px` ISO
   threshold derived from live layout. These constants are tuned to one viewport
   height. Change the rail height or the number of list items and the timing
   drifts, because the "mid" and "final" positions aren't anchored to anything
   real.

4. **Two coordinate systems.**
   The list moves in **pixels** (`translateY(px)`) while the ISO moves in
   **percent** (`translateY(%)`). The handoff between them (`listTopPx` vs
   `isoCenterPx`) is reconstructed by hand every render, which is brittle.

5. **No reduced-motion handling.**
   There's no `prefers-reduced-motion` path, so the whole thing animates
   regardless of user preference.

## Better approach

You already have **`motion` (Framer Motion v14)** installed, and it's built for
exactly this. The cleanest version uses `useScroll` + `useTransform` so values
are derived from scroll **without** re-rendering on every frame.

### Core idea

- Use `useScroll({ container, target, offset })` to get a `scrollYProgress`
  motion value (0→1) for the scroll container. No scroll listener, no
  `setState`.
- Derive each animated property with `useTransform(scrollYProgress, input, output)`.
  This runs off-main-thread-friendly and updates the DOM directly.
- Animate `transform` only (translate/scale) — never layout properties — so it
  stays on the compositor.
- Anchor keyframes to **fractions of scroll progress**, not pixel math, so it's
  viewport-independent.

### Sketch

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Iso from "@/components/atoms/iso";

const items = [
  { n: "01", label: "Digital Infrastructure" },
  { n: "02", label: "Scalable Systems" },
  { n: "03", label: "Distributed Architecture" },
];

interface Props {
  scrollEl: HTMLElement | null;
}

export default function Rail({ scrollEl }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress of the whole scroll container, 0 at top → 1 at bottom.
  const { scrollYProgress } = useScroll({
    container: { current: scrollEl } as React.RefObject<HTMLElement>,
  });

  // List: rises from fully-below (100%) to settled (0%) over the scroll.
  // Percent of its OWN height = viewport independent.
  const listY = useTransform(scrollYProgress, [0, 0.85], ["100%", "0%"]);

  // ISO: leaves as the list arrives. One shared timeline, no handoff math.
  const isoY = useTransform(scrollYProgress, [0.15, 0.55], ["0%", "-120%"]);
  const isoScale = useTransform(scrollYProgress, [0.15, 0.55], [1, 0.7]);
  const isoOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);

  // Active-item underline tied directly to progress.
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <aside className="w-[28vw] flex-shrink-0 flex flex-col h-screen sticky top-0 border-r border-black/10 bg-bg-surface overflow-hidden">
      <div className="px-8 py-6 flex-shrink-0 relative z-10">
        <span className="text-base font-bold uppercase text-fg-primary">Elltech</span>
      </div>

      <div ref={areaRef} className="relative flex-1 overflow-hidden">
        {/* ISO */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduce ? undefined : { y: isoY, scale: isoScale, opacity: isoOpacity }}
        >
          <div className="w-[75%]"><Iso /></div>
        </motion.div>

        {/* List */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-bg-surface"
          style={reduce ? undefined : { y: listY }}
        >
          {/* ...list markup; underline uses style={{ scaleX: barScaleX }} + origin-left */}
        </motion.div>
      </div>
    </aside>
  );
}
```

### What this fixes

- **No per-frame React renders.** `useScroll`/`useTransform` write to the DOM
  directly; the component renders once.
- **No live layout measurement.** Everything is expressed in percentages of the
  element's own box, so resizes and font loads just work.
- **One timeline, no handoff.** The ISO exit and list entry are two transforms
  on the *same* `scrollYProgress`. You tune the story by moving the breakpoints
  (`0.15`, `0.55`, `0.85`) instead of reverse-engineering pixels.
- **Reduced-motion respected** via `useReducedMotion()`.
- **Compositor-only props** (`y`, `scale`, `opacity`) keep it at 60fps.

### Optional polish

- Wrap `scrollYProgress` in `useSpring` for a slight lag/weight on the list so
  it feels physical rather than rigidly glued to the scrollbar:
  `const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });`
  then transform from `smooth`.
- Drive the **active item** from progress too (e.g. `useTransform` into an index
  0/1/2 and highlight accordingly) instead of hard-coding the underline on item 0.
- Make the three keyframe breakpoints line up with the three service sections so
  "scrolled past section 2" maps to a known progress value.

## Open questions for you

1. Should the ISO **fully disappear** at the end, or shrink to a small corner
   mark that stays?
2. Should the active underline **jump between items** as you pass each section,
   or keep growing continuously on one item (current behavior)?
3. Do you want the list motion to feel **rigid** (locked to scroll) or
   **weighted** (spring lag)?

Answer those and I can rewrite `rail.tsx` to match.
