"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

const services = [
  {
    n: "01",
    title: "Digital Infrastructure",
    desc: "We architect the backbone of modern digital products — cloud-native systems, API layers, and distributed pipelines built to scale without friction.",
    tags: ["Cloud Architecture", "API Design", "DevOps"],
    detail: "From zero to production-grade infrastructure. We design systems that grow with your business, not against it.",
  },
  {
    n: "02",
    title: "Scalable Systems",
    desc: "Performance at every layer. We engineer systems that handle 10x growth without rewrites — through thoughtful design, not brute force.",
    tags: ["System Design", "Performance", "Reliability"],
    detail: "Horizontal scaling, event-driven architecture, and observability baked in from day one.",
  },
  {
    n: "03",
    title: "Distributed Architecture",
    desc: "Microservices, edge computing, and resilient data flows. We build distributed systems that stay coherent under pressure.",
    tags: ["Microservices", "Edge", "Data Pipelines"],
    detail: "Consistency, availability, and partition tolerance — we navigate the tradeoffs so your system doesn't have to.",
  },
];

function fadeUp(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  };
}

function Section({
  n, title, desc, tags, detail, scrollEl,
}: typeof services[0] & { scrollEl: HTMLElement | null }) {
  const ref = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  rootRef.current = scrollEl;

  const inView = useInView(ref, {
    once: true,
    amount: 0.15,
    root: scrollEl ? rootRef as React.RefObject<HTMLElement> : undefined,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-between px-10 py-16 border-t border-black/10"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span
          className="text-[10px] text-fg-muted uppercase tracking-widest"
          style={fadeUp(inView, 0)}
        >
          {n}
        </span>
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className="border border-black/20 px-3 py-1 text-[10px] uppercase tracking-widest text-fg-muted"
              style={fadeUp(inView, i * 0.07)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px bg-black/10 my-8 origin-left"
        style={{
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
      />

      {/* Title */}
      <div className="flex-1 flex items-center">
        <h2
          className="text-[clamp(3rem,5vw,6rem)] leading-[1.02] font-bold text-fg-primary max-w-2xl"
          style={fadeUp(inView, 0.1)}
        >
          {title}
        </h2>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between gap-16">
        <p
          className="text-sm text-fg-muted leading-relaxed max-w-sm"
          style={fadeUp(inView, 0.18)}
        >
          {desc}
        </p>
        <p
          className="text-[11px] text-fg-muted leading-relaxed max-w-xs text-right"
          style={fadeUp(inView, 0.24)}
        >
          {detail}
        </p>
      </div>
    </section>
  );
}

export default function Services({ scrollEl }: { scrollEl: HTMLElement | null }) {
  return (
    <div>
      {services.map((s) => (
        <Section key={s.n} {...s} scrollEl={scrollEl} />
      ))}
    </div>
  );
}
