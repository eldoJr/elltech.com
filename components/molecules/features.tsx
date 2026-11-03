"use client";

import { motion } from "motion/react";

const E = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    index: "01",
    heading: "Legacy Modernisation",
    body: "We incrementally modernise legacy systems using strangler-fig patterns, event-driven decoupling, and API facades — preserving business continuity while eliminating technical debt at the core.",
    tags: ["Migration", "API Facades", "Zero Downtime"],
  },
  {
    index: "02",
    heading: "Multi-Tenant SaaS",
    body: "From tenant isolation to billing infrastructure and feature flagging, we architect SaaS platforms that scale to thousands of enterprise customers without operational complexity.",
    tags: ["Isolation", "Billing", "Feature Flags"],
  },
  {
    index: "03",
    heading: "Identity & Access",
    body: "Enterprise SSO, RBAC, and zero-trust access layers that scale across business units and geographies — with full audit trails and policy enforcement built in.",
    tags: ["SSO", "RBAC", "Zero-Trust"],
  },
  {
    index: "04",
    heading: "Enterprise Integration",
    body: "Event sourcing, CQRS, and saga orchestration to connect heterogeneous systems reliably — with full observability, rollback capability, and documented contracts.",
    tags: ["Event Sourcing", "CQRS", "Observability"],
  },
  {
    index: "05",
    heading: "Compliance Engineering",
    body: "SOC 2, ISO 27001, and GDPR-aligned architectures with threat modelling, secrets management, and compliance controls embedded from day one — not retrofitted.",
    tags: ["SOC 2", "ISO 27001", "GDPR"],
  },
];

export default function Features() {
  return (
    <div className="px-10 pb-24">

      {FEATURES.map((f, i) => (
        <motion.div
          key={f.index}
          className="group border-b border-black/10 cursor-default"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.7, ease: E, delay: i * 0.05 }}
        >
          <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[80px_1fr_1fr] gap-x-10 py-8 items-start">

            {/* Index */}
            <span className="text-[10px] uppercase tracking-widest text-fg-muted pt-1 group-hover:text-fg-primary transition-colors duration-300">
              {f.index}
            </span>

            {/* Heading */}
            <h3 className="text-[clamp(1.2rem,2.5vw,2rem)] font-bold text-fg-primary leading-tight lg:col-span-1">
              {f.heading}
            </h3>

            {/* Body + tags — hidden by default, revealed on hover */}
            <div className="col-span-2 lg:col-span-1 overflow-hidden">
              <motion.div
                className="grid"
                initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                whileHover={{ gridTemplateRows: "1fr", opacity: 1 }}
                transition={{ duration: 0.45, ease: E }}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-fg-muted leading-relaxed pt-4 lg:pt-0 pb-2 max-w-md">
                    {f.body}
                  </p>
                  <div className="flex flex-wrap gap-2 pb-4">
                    {f.tags.map((t) => (
                      <span key={t} className="border border-black/15 px-3 py-1 text-[10px] uppercase tracking-widest text-fg-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
}
