"use client";

import { motion } from "motion/react";

const E = [0.16, 1, 0.3, 1] as const;

export default function Cta() {
  return (
    <motion.div
      id="cta"
      className="px-10 py-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 border-t border-black/10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: E }}
    >
      <h2 className="text-[clamp(2rem,5vw,5.5rem)] leading-[0.95] font-bold text-fg-primary max-w-3xl">
        Explore our capabilities and platform for the AI era.
      </h2>

      <motion.a
        href="#"
        className="relative flex items-center justify-between gap-16 bg-fg-primary text-white px-10 py-8 shrink-0 overflow-hidden group"
        initial="rest"
        whileHover="hover"
      >
        <motion.span
          className="absolute inset-0 bg-accent"
          variants={{
            rest: { scaleY: 0, transformOrigin: "bottom" },
            hover: { scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.4, ease: E } },
          }}
        />
        <span className="relative z-10 text-sm tracking-wide">Get in touch</span>
        <span className="relative z-10 text-base">→</span>
      </motion.a>
    </motion.div>
  );
}
