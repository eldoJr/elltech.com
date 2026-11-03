"use client";

import { motion } from "motion/react";

const SERVICES = [
  { index: "01", heading: "Custom Development", body: "Products and systems built from scratch — from MVP to scale — with code quality that holds up over time." },
  { index: "02", heading: "Consulting & Architecture", body: "Technical decisions, architecture review, and engineering direction to unblock and de-risk your roadmap." },
  { index: "03", heading: "Web & Internal Systems", body: "High-performance web platforms, portals, and internal tools built around the way your operation actually works." },
  { index: "04", heading: "Integrations & APIs", body: "Connect systems, ERPs, and services with robust, documented, and secure APIs — no rework, no surprises." },
  { index: "05", heading: "Data & AI", body: "Data pipelines, models, and intelligent automations applied to real business problems." },
  { index: "06", heading: "BI & Analytics", body: "Dashboards and indicators that turn scattered data into clear, reliable decisions." },
];

const E = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <div className="px-10 pb-16">
      <motion.h2
        className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-bold text-fg-primary mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: E }}
      >
        Our Core Services
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      >
        {SERVICES.map((s) => (
          <motion.div
            key={s.index}
            variants={cardVariants}
            transition={{ duration: 0.75, ease: E }}
            className="border-t border-black/10 py-10 pr-10 pb-16 group cursor-default"
          >
            <span className="text-[10px] uppercase tracking-widest text-fg-muted mb-6 block transition-colors duration-300 group-hover:text-fg-primary">
              {s.index}
            </span>
            <h3 className="text-lg font-bold text-fg-primary mb-3 leading-tight transition-opacity duration-300 group-hover:opacity-70">
              {s.heading}
            </h3>
            <p className="text-sm text-fg-muted leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="h-px bg-black/10 mt-10"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />
    </div>
  );
}
