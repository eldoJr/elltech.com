"use client";

import { motion } from "motion/react";

const E = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    day: "Day 1",
    heading: "Tell us about your project",
    body: "Tell us about your project, needs and constraints. This usually happens in a form of docs exchange and a video call. We sign NDA if you require one.",
  },
  {
    day: "Day 4",
    heading: "We analyse & architect a roadmap",
    body: "Current state of your application, available materials, business objectives and deadlines are taken into account.",
  },
  {
    day: "Day 6",
    heading: "You get a detailed proposal",
    body: "12–20 pages of thought-out insights from our experts along with the business terms. A huge value even if you decide to go the other way.",
  },
  {
    day: "Day 10",
    heading: "Project kickoff & onboarding",
    body: "After a contract fast-track process, we're ready to go. In most cases, you can expect a pull request within the first 24 hours of cooperation.",
  },
];

export default function Nextsteps() {
  return (
    <section className="px-10 py-20">

      <motion.div
        className="h-px bg-black/10 mb-16"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      {/* Header */}
      <motion.div
        className="flex flex-col gap-6 mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.span
          className="text-[10px] uppercase tracking-widest text-fg-muted"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: E }}
        >
          Process
        </motion.span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="overflow-hidden">
            <motion.h2
              className="text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] font-bold text-fg-primary"
              style={{ fontFamily: "var(--font-syne)" }}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: E }}
            >
              What are the<br />next steps?
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-col gap-4 max-w-sm"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: E }}
          >
            <p className="text-sm text-fg-muted leading-relaxed">
              Expect the first pull request in <strong className="text-fg-primary font-semibold">10 days</strong> from today. The goal is to get you the best team of engineers in the shortest time and start delivering real business value.
            </p>
            <button className="self-start flex items-center gap-3 bg-fg-primary text-white px-6 py-3 text-[10px] uppercase tracking-widest relative overflow-hidden group">
              <span className="absolute inset-0 bg-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
              <span className="relative z-10">Get a proposal</span>
              <span className="relative z-10">→</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <motion.div
          className="absolute left-[calc(theme(spacing.16)+1px)] top-0 bottom-0 w-px bg-black/10 hidden lg:block"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: E }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.day}
            className="relative grid grid-cols-1 lg:grid-cols-[4rem_1fr] gap-x-16 border-t border-black/10 py-10 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.7, ease: E, delay: i * 0.07 }}
          >
            {/* Day marker */}
            <div className="flex lg:flex-col lg:items-end gap-3 mb-4 lg:mb-0">
              <div className="relative flex items-center justify-center">
                {/* Dot on the line */}
                <motion.div
                  className="hidden lg:flex absolute right-[-1.05rem] w-3 h-3 rounded-full border-2 border-fg-primary bg-[#E9EDEF] items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: E, delay: i * 0.07 + 0.3 }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-fg-muted lg:text-right">
                {step.day}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 lg:pl-8">
              <h3
                className="text-[clamp(1.1rem,2vw,1.6rem)] font-bold text-fg-primary leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {step.heading}
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed max-w-xl">
                {step.body}
              </p>
            </div>

            {/* Step number — large background */}
            <span
              className="absolute right-0 top-6 text-[6rem] font-bold leading-none text-black/[0.04] select-none pointer-events-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              0{i + 1}
            </span>
          </motion.div>
        ))}

        <div className="h-px bg-black/10" />
      </div>

    </section>
  );
}
