'use client';

import { motion } from 'motion/react';

const E = [0.16, 1, 0.3, 1] as const;

const TECHS = [
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Go', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
  { name: 'Rust', icon: 'https://cdn.simpleicons.org/rust/B7410E' },
  { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/E76F00' },
  { name: 'Swift', icon: 'https://cdn.simpleicons.org/swift/F05138' },
  { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/555555' },
  { name: 'Vue', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: '.NET', icon: 'https://cdn.simpleicons.org/dotnet/512BD4' },
  { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/icloud/FF9900' },
  { name: 'GCP', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
  { name: 'Azure', icon: 'https://cdn.simpleicons.org/alibabacloud/FF6A00' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
  { name: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform/844FBA' },
  { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/huggingface/FF9D00' },
  { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor/412991' },
  { name: 'GitHub Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot/6e40c9' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Kafka', icon: 'https://cdn.simpleicons.org/apachekafka/555555' },
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
          className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-14 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          transition={{ staggerChildren: 0.03 }}
        >
          {TECHS.map((tech) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center gap-2 group cursor-default"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: E }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-7 h-7 object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-200"
              />
              <span className="text-[9px] uppercase tracking-widest text-fg-muted text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {tech.name}
              </span>
            </motion.div>
          ))}
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
