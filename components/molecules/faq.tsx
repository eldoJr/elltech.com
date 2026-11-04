"use client";

import { motion } from "motion/react";
import Accordion from "@/components/molecules/accordion";

const E = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    heading: "What stack do you use for coding?",
    body: "We use a variety of stacks for coding. There are right tools for the right job. Most of the time, we use Next.js, Tailwind CSS, React, TypeScript, Node.js, and PostgreSQL to name a few.",
  },
  {
    heading: "How do I reach you for support?",
    body: "From the day we start working on your project, we will add you to a Slack channel. You can reach us on that channel for support.",
  },
  {
    heading: "Why should I choose your team for my project?",
    body: "We're passionate about delivering results and building long-term client relationships. Our experience across a wide range of technologies allows us to recommend the best approach for your needs, ensuring quality and reliability from start to finish.",
  },
  {
    heading: "How do you communicate progress during a project?",
    body: "Communication is key for us. We provide regular updates and demos, and remain accessible for any questions via Slack or email. Our transparent workflow ensures you're always in the loop.",
  },
  {
    heading: "What happens if I need changes after delivery?",
    body: "We offer post-delivery support and can accommodate updates or changes as your needs evolve. Our goal is to ensure your solution remains robust, up-to-date, and aligned with your business objectives.",
  },
  {
    heading: "Do you offer custom solutions or only predefined packages?",
    body: "Every client is unique, so we tailor our services to your requirements. Whether you need a custom-built application or help with an existing project, we're flexible and ready to design a solution just for you.",
  },
];

const DIANE_EMAIL = "diane@elltech.com";

export default function Faq() {
  return (
    <section className="px-10 py-20">
      <motion.div
        className="h-px bg-black/10 mb-16"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: E }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

        {/* Left */}
        <motion.div
          className="flex flex-col gap-6 lg:sticky lg:top-10 self-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: E }}
        >
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">FAQ</span>
          <h2
            className="text-[clamp(2rem,4vw,3.6rem)] font-bold text-fg-primary leading-[0.95]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Talk to us.
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed max-w-xs">
            Have questions? Browse through our FAQs to find the answers you need.
          </p>

          <div className="h-px bg-black/10" />

          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-fg-muted">Didn&apos;t find your answer?</span>
            <div className="flex flex-col gap-2">
              <motion.a
                href="#"
                className="inline-flex items-center justify-between gap-10 bg-fg-primary text-white px-8 py-5 relative overflow-hidden self-start w-full"
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
                <span className="relative z-10 text-sm tracking-wide">Chat with Diane</span>
                <span className="relative z-10 text-base">→</span>
              </motion.a>
              <button
                onClick={() => navigator.clipboard.writeText(DIANE_EMAIL)}
                className="text-[10px] uppercase tracking-widest text-fg-muted hover:text-fg-primary transition-colors text-left py-1"
              >
                Copy Diane&apos;s email address
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: E, delay: 0.1 }}
        >
          <Accordion items={FAQS} />
        </motion.div>

      </div>
    </section>
  );
}
