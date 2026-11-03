"use client";

import { motion } from "motion/react";

const E = [0.16, 1, 0.3, 1] as const;

const tools = [
  { name: "Claude Code", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Claude-Code_1777908230.svg?_a=BAVT+ODY0" },
  { name: "GitHub Copilot", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Github_1777908319.svg?_a=BAVT+ODY0" },
  { name: "Cursor", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Cursor_1777908236.svg?_a=BAVT+ODY0" },
  { name: "Replit", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Replit_1777908429.svg?_a=BAVT+ODY0" },
  { name: "Gemini", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Gemini_1777908317.svg?_a=BAVT+ODY0" },
  { name: "Copilot", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Copilot_1777908234.svg?_a=BAVT+ODY0" },
  { name: "Codex", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Codex_1777908232.svg?_a=BAVT+ODY0" },
  { name: "Ollama", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Ollama_1777908321.svg?_a=BAVT+ODY0" },
  { name: "Windsurf", url: "https://assets.bairesdev.com//image/upload/fl_sanitize/c_limit,w_56/v1/www/static/Windsurf_1777908323.svg?_a=BAVT+ODY0" },
];

export default function Aiexperts() {
  return (
    <div className="px-10 pt-16 pb-16">
      <motion.div
        className="h-px bg-black/10"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">

        {/* Text */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-widest text-fg-muted mb-6 block"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: E }}
          >
            AI Experts
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h3
              className="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.1] font-bold text-fg-primary"
              style={{ fontFamily: "var(--font-syne)" }}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: E }}
            >
              Work with AI-augmented developers.
            </motion.h3>
          </div>
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-md"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: E }}
          >
            Every developer we provide uses modern AI coding tools to ship faster than ever while producing cleaner, more consistent code.
          </motion.p>
        </motion.div>

        {/* Icons */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              className="w-16 h-16 bg-white flex items-center justify-center"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)" }}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: E }}
            >
              <img src={tool.url} alt={tool.name} className="w-8 h-8 object-contain" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
