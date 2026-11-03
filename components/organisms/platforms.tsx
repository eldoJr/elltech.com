"use client";

import { motion } from "motion/react";
import Features from "@/components/molecules/features";
import Manifesto from "@/components/molecules/manifesto";
import Whatwedo from "@/components/molecules/whatwedo";

const E = [0.16, 1, 0.3, 1] as const;

export default function Platforms() {
  return (
    <section id="enterprise-platforms" className="relative">
      <div className="px-10 pt-16 pb-4 flex flex-col gap-0">

        <motion.div
          className="h-px bg-black/10 mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: E }}
        />

        {/* Meta */}
        <motion.div
          className="flex flex-col gap-0.5 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ staggerChildren: 0.06 }}
        >
          {["Enterprise Platforms", "Scalable Infrastructure"].map((tag) => (
            <motion.span
              key={tag}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: E }}
              className="text-[10px] uppercase tracking-widest text-fg-muted"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-[clamp(4rem,8vw,9rem)] leading-[0.95] font-bold text-fg-primary mb-16"
          style={{ fontFamily: "var(--font-syne)" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {["Enterprise", "Platforms"].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                transition={{ duration: 1.1, ease: E }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.div
          className="h-px bg-black/10 mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: E }}
        />

        {/* Description */}
        <motion.p
          className="text-sm text-fg-muted leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: E }}
        >
          Elltech designs and delivers enterprise-grade platforms built for scale, reliability, and long-term growth across complex digital ecosystems.
        </motion.p>

      </div>
      <Manifesto />
      <Features />
      <Whatwedo />
    </section>
  );
}
