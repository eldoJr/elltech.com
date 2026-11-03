"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Item {
  heading: string;
  body: string;
}

interface Props {
  items: Item[];
}

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map(({ heading, body }, i) => (
        <div key={i}>
          <div className="h-px bg-black/10" />
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="text-sm font-medium text-fg-primary tracking-wide">
              {heading}
            </span>
            <motion.i
              className="bi bi-chevron-down text-xs text-fg-muted"
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="text-sm text-fg-muted leading-relaxed pb-5 max-w-2xl">
                  {body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="h-px bg-black/10" />
    </div>
  );
}
