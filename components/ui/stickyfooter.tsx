"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Globe, GitFork, Mail, ExternalLink } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

interface FooterLink { title: string; href: string }
interface FooterLinkGroup { label: string; links: FooterLink[] }

const socialLinks = [
  { title: "LinkedIn", href: "#", icon: ExternalLink },
  { title: "GitHub", href: "#", icon: GitFork },
  { title: "Website", href: "#", icon: Globe },
  { title: "Email", href: "#", icon: Mail },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Services",
    links: [
      { title: "Digital Engineering", href: "#" },
      { title: "Data & AI", href: "#" },
      { title: "Cloud Infrastructure", href: "#" },
      { title: "API Design", href: "#" },
      { title: "Systems Architecture", href: "#" },
      { title: "Observability & SRE", href: "#" },
    ],
  },
  {
    label: "Work",
    links: [
      { title: "Case Studies", href: "#" },
      { title: "Projects", href: "#" },
      { title: "Open Source", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Cookie Policy", href: "#" },
    ],
  },
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: E }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StickyFooterProps = React.ComponentProps<"footer">;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn("relative h-[640px]", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="sticky top-[calc(100vh-640px)] h-[640px]">
          <div className="relative flex h-full flex-col justify-between bg-fg-primary px-10 py-12">

            {/* Top row */}
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">

              {/* Brand */}
              <AnimatedContainer className="flex flex-col gap-6 w-full max-w-xs shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40">—</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Elltech</span>
                </div>
                <img
                  src="/logo.svg"
                  alt="Elltech"
                  style={{ height: 40, width: "auto", filter: "invert(1)" }}
                />
                <p className="text-sm text-white/50 leading-relaxed">
                  Design digital systems for scalability. We engineer the foundations modern enterprises depend on.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ title, href, icon: Icon }) => (
                    <motion.a
                      key={title}
                      href={href}
                      aria-label={title}
                      className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 relative overflow-hidden"
                      initial="rest"
                      whileHover="hover"
                    >
                      <motion.span
                        className="absolute inset-0 bg-accent"
                        variants={{
                          rest: { scaleY: 0, transformOrigin: "bottom" },
                          hover: { scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.35, ease: E } },
                        }}
                      />
                      <Icon className="relative z-10 size-3.5" />
                    </motion.a>
                  ))}
                </div>
              </AnimatedContainer>

              {/* Link groups */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 w-full">
                {footerLinkGroups.map((group, i) => (
                  <AnimatedContainer key={group.label} delay={0.1 + i * 0.07}>
                    <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">{group.label}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>
                ))}
              </div>

            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-start gap-6 border-t border-white/10 pt-6">
              <p className="text-[10px] uppercase tracking-widest text-white/30">
                © 2025 Elltech. All rights reserved.
              </p>
              <p className="text-[10px] uppercase tracking-widest text-white/30">
                Design digital systems for scalability.
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
