"use client";

import Image from "next/image";
import { motion } from "motion/react";
import gatesImg from "../assets/quote-img.png";

const E = [0.16, 1, 0.3, 1] as const;

export default function Manifesto() {
  return (
    <div className="px-10 pt-8 pb-16">
      <motion.div
        className="h-px bg-black/10"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-16 items-end">

        {/* Quote */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-widest text-fg-muted mb-8 block mt-8"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: E }}
          >
            On Scale
          </motion.span>
          <div className="overflow-hidden mb-10">
            <motion.blockquote
              className="text-[clamp(1.6rem,3vw,3rem)] leading-[1.1] font-bold text-fg-primary"
              style={{ fontFamily: "var(--font-syne)" }}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: E }}
            >
              "The best systems don't help people do the heavy lifting; they do the heavy lifting themselves, so that people can focus solely on the fruits of that labor."
            </motion.blockquote>
          </div>
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-xl"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: E }}
          >
            We don't build software that forces your team to spend hours inputting data. We create platforms and digital products designed to attract, convert, and deliver end results — directly and efficiently.
          </motion.p>
        </motion.div>

        {/* Attribution */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: E, delay: 0.3 }}
        >
          <Image
            src={gatesImg}
            alt="Bill Gates"
            width={120}
            height={120}
            className="w-24 h-24 object-cover grayscale"
          />
          <span className="text-sm font-bold text-fg-primary">Bill Gates</span>
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">Co-founder of Microsoft</span>
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">& Philanthropist</span>
        </motion.div>

      </div>

    </div>
  );
}
