"use client";

import { motion } from "motion/react";

const E = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<200ms", label: "P99 Latency" },
  { value: "10×", label: "Faster Onboarding" },
  { value: "0", label: "Unplanned Downtime" },
];

export default function Statement() {
  return (
    <div className="px-10 py-24">

      {/* Editorial headline */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-16 mb-24">
        <div>
          <motion.span
            className="text-[10px] uppercase tracking-widest text-fg-muted mb-8 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: E }}
          >
            Enterprise Platforms
          </motion.span>
          <h2
            className="text-[clamp(3rem,7vw,8rem)] leading-[0.92] font-bold text-fg-primary"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {["Large-scale", "systems,", "built to last."].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1.1, ease: E, delay: i * 0.08 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Stat column */}
        <motion.div
          className="flex flex-col justify-end gap-0 lg:border-l border-black/10 lg:pl-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              className="py-5 border-t border-black/10"
              variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: E }}
            >
              <span className="block text-2xl font-bold text-fg-primary leading-none mb-1">{s.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-fg-muted">{s.label}</span>
            </motion.div>
          ))}
          <div className="border-t border-black/10" />
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-black/10 pt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: E }}
      >
        <p className="text-sm text-fg-muted leading-relaxed max-w-lg">
          <strong className="text-fg-primary font-bold">Elltech</strong> designs and integrates enterprise-grade platforms that connect people, systems, and data at scale — bringing engineering rigour to the complexity of large organisations without the overhead.
        </p>
        <p className="text-sm text-fg-muted leading-relaxed max-w-lg">
          We work across legacy modernisation, multi-tenant SaaS, and compliance-critical environments — always with a clear migration path, zero-downtime delivery, and full operational handoff.
        </p>
      </motion.div>

    </div>
  );
}
