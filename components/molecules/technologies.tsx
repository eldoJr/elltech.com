'use client';

import { motion } from 'motion/react';
import { LogoCloud } from '@/components/ui/logocloud';

const E = [0.16, 1, 0.3, 1] as const;

const TECHS = [
  { src: 'https://cdn.simpleicons.org/typescript/3178C6', alt: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/python/3776AB', alt: 'Python' },
  { src: 'https://cdn.simpleicons.org/go/00ADD8', alt: 'Go' },
  { src: 'https://cdn.simpleicons.org/rust/B7410E', alt: 'Rust' },
  { src: 'https://cdn.simpleicons.org/openjdk/E76F00', alt: 'Java' },
  { src: 'https://cdn.simpleicons.org/swift/F05138', alt: 'Swift' },
  { src: 'https://cdn.simpleicons.org/kotlin/7F52FF', alt: 'Kotlin' },
  { src: 'https://cdn.simpleicons.org/react/61DAFB', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/nextdotjs/555555', alt: 'Next.js' },
  { src: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', alt: 'Vue' },
  { src: 'https://cdn.simpleicons.org/angular/DD0031', alt: 'Angular' },
  { src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', alt: 'Tailwind' },
  { src: 'https://cdn.simpleicons.org/nodedotjs/339933', alt: 'Node.js' },
  { src: 'https://cdn.simpleicons.org/dotnet/512BD4', alt: '.NET' },
  { src: 'https://cdn.simpleicons.org/graphql/E10098', alt: 'GraphQL' },
  { src: 'https://cdn.simpleicons.org/icloud/FF9900', alt: 'AWS' },
  { src: 'https://cdn.simpleicons.org/googlecloud/4285F4', alt: 'GCP' },
  { src: 'https://cdn.simpleicons.org/alibabacloud/FF6A00', alt: 'Azure' },
  { src: 'https://cdn.simpleicons.org/docker/2496ED', alt: 'Docker' },
  { src: 'https://cdn.simpleicons.org/kubernetes/326CE5', alt: 'Kubernetes' },
  { src: 'https://cdn.simpleicons.org/terraform/844FBA', alt: 'Terraform' },
  { src: 'https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg', alt: 'OpenAI' },
  { src: 'https://cdn.simpleicons.org/cursor/412991', alt: 'Cursor' },
  { src: 'https://cdn.simpleicons.org/githubcopilot/6e40c9', alt: 'GitHub Copilot' },
  { src: 'https://cdn.simpleicons.org/postgresql/4169E1', alt: 'PostgreSQL' },
  { src: 'https://cdn.simpleicons.org/redis/FF4438', alt: 'Redis' },
  { src: 'https://cdn.simpleicons.org/mongodb/47A248', alt: 'MongoDB' },
  { src: 'https://cdn.simpleicons.org/apachekafka/555555', alt: 'Kafka' },
];

export default function Technologies() {
  return (
    <section className="px-10 py-20">
      <motion.div
        className="h-px bg-black/10 mb-16"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: E }}
      />

      <div className="flex flex-col gap-10">

        {/* Title + desc */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-widest text-fg-muted mb-4 block"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: E }}
          >
            Tech Stack
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-bold text-fg-primary max-w-2xl"
              style={{ fontFamily: 'var(--font-syne)' }}
              variants={{ hidden: { y: '105%' }, show: { y: '0%' } }}
              transition={{ duration: 1, ease: E }}
            >
              Yes, we cover the tech stack and AI coding tools you rely on.
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-xl"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: E }}
          >
            Our team has expertise in 100+ technologies and programming languages, including the AI coding tools rewriting how software gets built.
          </motion.p>
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.75, ease: E }}
        >
          <LogoCloud
            logos={TECHS}
            style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
            className="w-full rounded-lg overflow-hidden"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.75, ease: E }}
        >
          <button className="flex items-center gap-3 border border-black/20 px-6 py-3 text-[10px] uppercase tracking-widest text-fg-primary relative overflow-hidden group">
            <span className="absolute inset-0 bg-fg-primary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View all technologies</span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
