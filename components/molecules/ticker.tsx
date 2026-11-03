"use client";

import { motion } from "motion/react";

const TAGS = [
  "Legacy Modernisation",
  "ERP Integration",
  "Zero-Trust Access",
  "Multi-Tenant SaaS",
  "Event Sourcing",
  "CQRS",
  "Data Mesh",
  "SOC 2",
  "ISO 27001",
  "GDPR",
  "Saga Orchestration",
  "Platform Consolidation",
];

export default function Ticker() {
  const repeated = [...TAGS, ...TAGS];
  return (
    <div className="border-t border-b border-black/10 py-5 overflow-hidden">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((tag, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-fg-muted whitespace-nowrap">{tag}</span>
            <span className="w-1 h-1 rounded-full bg-black/20 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
