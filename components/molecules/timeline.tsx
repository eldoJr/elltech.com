"use client";

import { StaticImageData } from "next/image";
import { motion } from "motion/react";
import webSearch from "../assets/undraw_web-search_7oif.svg";
import softwareEngineer from "../assets/undraw_software-engineer_ljie.svg";
import programming from "../assets/undraw_programming_j1zw.svg";
import statusPage from "../assets/undraw_status-page_46km.svg";

interface Step {
  index: number;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  icon: string;
  image?: string | StaticImageData;
}

const STEPS: Step[] = [
  {
    index: 1,
    eyebrow: "Phase 01",
    heading: "Discovery",
    body: "Understanding the problem, context, and goals. We align on scope, risks, and what defines success.",
    bullets: ["Stakeholder interviews & system audits", "Capacity planning & bottleneck analysis", "Technology selection & trade-off documentation"],
    icon: "bi-diagram-3",
    image: webSearch,
  },
  {
    index: 2,
    eyebrow: "Phase 02",
    heading: "Architecture",
    body: "Technical design, stack selection, and delivery plan. Decisions that are documented and easy to defend.",
    bullets: ["Distributed system implementation", "Infrastructure provisioning via Terraform", "Automated testing & deployment pipelines"],
    icon: "bi-code-slash",
    image: softwareEngineer,
  },
  {
    index: 3,
    eyebrow: "Phase 03",
    heading: "Development",
    body: "Short cycles, tested code, and frequent deliveries. You follow progress every step of the way.",
    bullets: ["Distributed tracing & structured logging", "SLO definition & alerting configuration", "Runbook documentation & on-call handoff"],
    icon: "bi-activity",
    image: programming,
  },
  {
    index: 4,
    eyebrow: "Phase 04",
    heading: "Sustain",
    body: "Monitoring, evolution, and continuous support. The system stays reliable long after launch.",
    bullets: ["Load testing & performance profiling", "Cost optimisation & right-sizing", "Architecture evolution & roadmap planning"],
    icon: "bi-graph-up-arrow",
    image: statusPage,
  },
];

const E = [0.16, 1, 0.3, 1] as const;

export default function Timeline() {
  return (
    <div className="px-10 pt-16 pb-16 flex flex-col gap-16">

      {/* Header */}
      <div className="pb-4">
        <span className="text-[10px] uppercase tracking-widest text-fg-muted mb-3 block">
          Process
        </span>
        <h2
          className="text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-bold text-fg-primary mb-3"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          How We Work
        </h2>
        <p className="text-sm text-fg-muted leading-relaxed max-w-sm">
          A predictable process, with visibility at every step.
        </p>
      </div>

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
                className={`relative flex items-center justify-center min-h-[140px] max-h-[300px] overflow-hidden ${flip ? "lg:order-1" : ""}`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: E, delay: 0.15 }}
              >
                {step.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={typeof step.image === "string" ? step.image : (step.image as StaticImageData).src}
                    alt=""
                    className="w-full h-auto max-h-[280px] object-contain"
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
