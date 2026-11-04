"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

type Tool = { name: string; src?: string; isInvertable?: boolean };

const tools: Tool[] = [
  { name: "Empty 1" },
  { name: "Claude Code", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Claude-Code_1777908230.svg?_a=BAVT+ODY0" },
  { name: "GitHub Copilot", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Github_1777908319.svg?_a=BAVT+ODY0", isInvertable: true },
  { name: "Cursor", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Cursor_1777908236.svg?_a=BAVT+ODY0" },
  { name: "Replit", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Replit_1777908429.svg?_a=BAVT+ODY0" },
  { name: "Gemini", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Gemini_1777908317.svg?_a=BAVT+ODY0" },
  { name: "Windsurf", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Windsurf_1777908323.svg?_a=BAVT+ODY0" },
  { name: "Codex", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Codex_1777908232.svg?_a=BAVT+ODY0" },
  { name: "Ollama", src: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Ollama_1777908321.svg?_a=BAVT+ODY0" },
  { name: "Empty 2" },
];

export default function Aiexperts() {
  return (
    <div className="px-10 pt-16 pb-20">
      <motion.div
        className="h-px bg-black/10 mb-16"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      <motion.div
        className="flex flex-col items-center text-center gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        transition={{ staggerChildren: 0.09 }}
      >
        <motion.span
          className="text-[10px] uppercase tracking-widest text-fg-muted"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: E }}
        >
          AI Experts
        </motion.span>

        <div className="overflow-hidden">
          <motion.h3
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-bold text-fg-primary max-w-2xl"
            style={{ fontFamily: "var(--font-syne)" }}
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 1, ease: E }}
          >
            Work with AI-augmented developers.
          </motion.h3>
        </div>

        <motion.p
          className="text-sm text-fg-muted leading-relaxed max-w-lg"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: E }}
        >
          Every developer we provide uses modern AI coding tools to ship faster than ever while producing cleaner, more consistent code.
        </motion.p>

        {/* Pill */}
        <motion.div
          className="rounded-full border border-black/10 bg-black/5 p-1"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: E }}
        >
          <div className="flex items-center -space-x-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className={cn(
                  "relative z-0 transition-transform",
                  tool.src ? "hover:z-10 hover:scale-110" : ""
                )}
              >
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white shadow-sm md:size-16">
                  {tool.src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={tool.name}
                      src={tool.src}
                      className={cn(
                        "size-6 object-contain md:size-7",
                        tool.isInvertable && "dark:invert"
                      )}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          className="flex items-center gap-3 border border-black/20 px-6 py-3 text-[10px] uppercase tracking-widest text-fg-primary relative overflow-hidden group"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: E }}
        >
          <span className="absolute inset-0 bg-fg-primary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">See all tools</span>
          <ArrowUpRightIcon className="relative z-10 h-3 w-3 group-hover:text-white transition-colors duration-300" />
        </motion.button>
      </motion.div>
    </div>
  );
}
