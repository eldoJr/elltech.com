"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import Accordion from "@/components/molecules/accordion";

interface Stat { label: string; value: string; }
interface AccordionItem { heading: string; body: string; }
interface Props {
  meta: string[];
  title: string;
  icons?: ReactNode;
  logo?: ReactNode;
  description: string;
  accordion?: AccordionItem[];
  stats: Stat[];
}

const E = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Sectionheader({ meta, title, icons, logo, description, accordion, stats }: Props) {
  const titleLines = title.split("\n");

  return (
    <div className="px-10 py-16 flex flex-col gap-0">

      <motion.div
        className="h-px bg-black/10 mb-10"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      {/* Meta tags */}
      <motion.div
        className="flex flex-col gap-0.5 mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ staggerChildren: 0.06 }}
      >
        {meta.map((tag) => (
          <motion.span
            key={tag}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: E }}
            className="text-[10px] uppercase tracking-widest text-fg-muted"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Display title */}
      <motion.h2
        className="text-[clamp(4rem,8vw,9rem)] leading-[0.95] font-bold text-fg-primary mb-16"
        style={{ fontFamily: "var(--font-syne)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ staggerChildren: 0.08 }}
      >
        {titleLines.map((line, i) => (
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

      {/* Content row */}
      <motion.div
        className={`grid gap-10 mb-16 ${icons || logo ? "grid-cols-[1fr_2fr_3fr]" : "grid-cols-1"}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      >
        {icons && (
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: E }} className="flex items-center gap-3">
            {icons}
          </motion.div>
        )}
        {logo && (
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: E }} className="bg-black/5 flex items-center justify-center aspect-square max-w-[200px]">
            {logo}
          </motion.div>
        )}
        <motion.p variants={fadeUp} transition={{ duration: 0.8, ease: E }} className="text-sm text-fg-muted leading-relaxed self-center">
          {description.split(/(Elltech)/).map((part, i) =>
            part === "Elltech"
              ? <strong key={i} className="font-bold text-fg-primary">Elltech</strong>
              : part
          )}
        </motion.p>
      </motion.div>

      {/* Accordion */}
      {accordion && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: E }}
        >
          <Accordion items={accordion} />
        </motion.div>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ staggerChildren: 0.07 }}
        >
          {stats.map(({ label, value }, i) => (
            <motion.div key={i} variants={fadeUp} transition={{ duration: 0.7, ease: E }}>
              <div className="h-px bg-black/10" />
              <div className="flex items-center justify-between py-4">
                <span className="text-[10px] uppercase tracking-widest text-fg-muted">{label}</span>
                <span className="text-[10px] uppercase tracking-widest text-fg-muted">{value}</span>
              </div>
            </motion.div>
          ))}
          <div className="h-px bg-black/10" />
        </motion.div>
      )}

    </div>
  );
}
