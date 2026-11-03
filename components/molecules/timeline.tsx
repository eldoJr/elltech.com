"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface Step {
  index: number;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  icon: string;
  image?: string;
}

const STEPS: Step[] = [
  {
    index: 1,
    eyebrow: "Phase 01",
    heading: "Discovery",
    body: "Understanding the problem, context, and goals. We align on scope, risks, and what defines success.",
    bullets: ["Stakeholder interviews & system audits", "Capacity planning & bottleneck analysis", "Technology selection & trade-off documentation"],
    icon: "bi-diagram-3",
    image: "/perspective-2.svg",
  },
  {
    index: 2,
    eyebrow: "Phase 02",
    heading: "Architecture",
    body: "Technical design, stack selection, and delivery plan. Decisions that are documented and easy to defend.",
    bullets: ["Distributed system implementation", "Infrastructure provisioning via Terraform", "Automated testing & deployment pipelines"],
    icon: "bi-code-slash",
    image: "/perspective-1.svg",
  },
  {
    index: 3,
    eyebrow: "Phase 03",
    heading: "Development",
    body: "Short cycles, tested code, and frequent deliveries. You follow progress every step of the way.",
    bullets: ["Distributed tracing & structured logging", "SLO definition & alerting configuration", "Runbook documentation & on-call handoff"],
    icon: "bi-activity",
    image: "/perspective-3.svg",
  },
  {
    index: 4,
    eyebrow: "Phase 04",
    heading: "Sustain",
    body: "Monitoring, evolution, and continuous support. The system stays reliable long after launch.",
    bullets: ["Load testing & performance profiling", "Cost optimisation & right-sizing", "Architecture evolution & roadmap planning"],
    icon: "bi-graph-up-arrow",
    image: "/perspective-4.webp",
  },
];

const E = [0.16, 1, 0.3, 1] as const;

export default function Timeline() {
  return (
    <div className="px-10 pb-16 flex flex-col gap-16">

      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: E }}
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-bold text-fg-primary mb-3">
          How We Work
        </h2>
        <p className="text-sm font-semibold text-fg-primary">
          A predictable process, with visibility at every step.
        </p>
      </motion.div>

      {STEPS.map((step, i) => {
        const flip = i % 2 !== 0;
        return (
          <motion.div
            key={step.index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, ease: E }}
          >
            <motion.div
              className="h-px bg-black/10"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease: E }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Text block */}
              <motion.div
                className={`flex flex-col justify-center py-16 ${flip ? "lg:order-2 lg:pl-16" : "lg:pr-16"}`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-8%" }}
                transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
              >
                <motion.span
                  className="text-[10px] uppercase tracking-widest text-fg-muted mb-4"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: E }}
                >
                  {step.eyebrow}
                </motion.span>

                <div className="overflow-hidden mb-6">
                  <motion.h3
                    className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-bold text-fg-primary"
                    variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                    transition={{ duration: 1, ease: E }}
                  >
                    {step.heading}
                  </motion.h3>
                </div>

                <motion.p
                  className="text-sm text-fg-muted leading-relaxed mb-6 max-w-md"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.75, ease: E }}
                >
                  {step.body}
                </motion.p>

                <motion.ul
                  className="flex flex-col gap-2"
                  variants={{ hidden: {}, show: {} }}
                  transition={{ staggerChildren: 0.07 }}
                >
                  {step.bullets.map((b) => (
                    <motion.li
                      key={b}
                      className="flex items-start gap-3 text-sm text-fg-muted"
                      variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.6, ease: E }}
                    >
                      <i className="bi bi-dash text-fg-primary mt-px shrink-0" />
                      {b}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Media panel */}
              <motion.div
                className={`relative bg-black/[0.03] aspect-video lg:aspect-auto min-h-[280px] overflow-hidden ${flip ? "lg:order-1" : ""}`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: E, delay: 0.15 }}
              >
                {step.image ? (
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className={`object-cover ${step.index === 4 ? "object-bottom" : "object-center"}`}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <i className={`bi ${step.icon} text-4xl text-black/20`} />
                    <span className="text-[10px] uppercase tracking-widest text-black/20">0{step.index}</span>
                  </div>
                )}
              </motion.div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
