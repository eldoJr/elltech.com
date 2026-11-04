"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MorphGallery, { MorphItem } from "@/components/ui/morphgallery";
import { ArrowUpRightIcon } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

type Project = MorphItem & { category: string; name: string };

const PROJECTS: Project[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/ec/eceae69f56b5b3e29b9372032b5c22e96bd5fc9c167ce072813868aa871d52af.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/69/69dbb246d917da410f7e79e87e53aaf6302023baa9db05f1075fca5bcb255410.jpg",
    alt: "Enterprise platform redesign",
    category: "Web Platform",
    name: "Enterprise Portal Redesign",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/95/95b854c8c5fc73249ba12e729548a432ff171dab87d960e2aaf098f1db941828.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/3d/3d637a6ebf76a17643434f0a6939ae4a0e15853797ba886588071bf792dd12d9.jpg",
    alt: "Cloud infrastructure migration",
    category: "Infrastructure",
    name: "Cloud Migration at Scale",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/15/15a4a367001c723a22cc1f5b480cfdc6abc1e50fdf87e0555ddd324f404fb98a.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/b8/b88e4af2580633f65cd2fce4867c647be4e317e3bf54c47dac854aab211e6dde.jpg",
    alt: "Real-time data pipeline",
    category: "Data Engineering",
    name: "Real-Time Analytics Pipeline",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/69/6947b2d1b15fc6614fe30af02282fe6418b3c43556fbfe6ad8e2fa16c72ae700.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/e0/e025ceb111646f4030ac36225aa4997e5024d098c4c939c409cddd281bd2c314.jpg",
    alt: "Multi-tenant SaaS architecture",
    category: "SaaS",
    name: "Multi-Tenant SaaS Platform",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/40/40907f0afb67e9bf2767a5982d24f0d56e6f49dd12b859cf92eb9b3b9771f4a4.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/38/38b66ef8fe46060a916db605710e709522a9534ff72aa549c1233c543f0a92a9.jpg",
    alt: "AI-powered analytics dashboard",
    category: "AI / ML",
    name: "AI Analytics Dashboard",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ef/ef4b96d0e0de49e89f600b77edbe0a150e1f93f8ba92ae1422d285d267b7bd47.jpg",
    thumb: "https://cdn.21st.dev/assets/mirror/f8/f8ee65346d7a36d4a795ca4628042627baa2f3f5e1c79d1dd471f874c8a6f0a4.jpg",
    alt: "Mobile-first fintech product",
    category: "Mobile",
    name: "Fintech Mobile Product",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const active = PROJECTS[activeIndex];

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
        className="flex flex-col gap-4 mb-12"
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
          Portfolio
        </motion.span>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              className="text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] font-bold text-fg-primary"
              style={{ fontFamily: "var(--font-syne)" }}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: E }}
            >
              Delivered projects.
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-sm"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: E }}
          >
            A selection of systems we've designed, built, and shipped for clients across industries.
          </motion.p>
        </div>
      </motion.div>

      {/* Gallery + overlay wrapper */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.9, ease: E }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MorphGallery
          items={PROJECTS}
          height="70vh"
          autoplay={4500}
          noiseScale={3.5}
          edge={0.15}
          drift={0.5}
          index={activeIndex}
          onIndexChange={setActiveIndex}
        />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-8 pb-24"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: E }}
            >
              {/* Left: category + name */}
              <div className="flex flex-col gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.category + activeIndex}
                    className="text-[10px] uppercase tracking-widest text-white/60"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: E }}
                  >
                    {active.category}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={active.name + activeIndex}
                    className="text-white font-bold text-[clamp(1.2rem,2.5vw,2rem)] leading-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: E, delay: 0.04 }}
                  >
                    {active.name}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Right: launch icon */}
              <a
                href="#"
                aria-label="Open project"
                className="pointer-events-auto text-white/70 hover:text-white transition-colors"
              >
                <ArrowUpRightIcon className="h-6 w-6" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* View more */}
      <motion.div
        className="mt-8 flex justify-end"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.7, ease: E }}
      >
        <button className="flex items-center gap-3 border border-black/20 px-6 py-3 text-[10px] uppercase tracking-widest text-fg-primary relative overflow-hidden group">
          <span className="absolute inset-0 bg-fg-primary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">View more</span>
          <ArrowUpRightIcon className="relative z-10 h-3 w-3 group-hover:text-white transition-colors duration-300" />
        </button>
      </motion.div>
    </section>
  );
}
