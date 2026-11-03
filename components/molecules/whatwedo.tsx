'use client';

import { motion } from 'motion/react';
import StackingCard from '@/components/ui/stackingcard';

const E = [0.16, 1, 0.3, 1] as const;

const CARDS = [
  {
    title: 'Legacy Modernisation',
    description: 'We incrementally modernise legacy systems using strangler-fig patterns and API facades — preserving business continuity while eliminating technical debt at the core.',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    color: '#ffffff',
  },
  {
    title: 'Multi-Tenant SaaS',
    description: 'From tenant isolation to billing infrastructure and feature flagging, we architect SaaS platforms that scale to thousands of enterprise customers without operational complexity.',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: '#f5f5f5',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'From multi-region deployments to infrastructure-as-code pipelines, we build cloud environments that are reproducible, auditable, and cost-efficient.',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    color: '#efefef',
  },
  {
    title: 'Enterprise Integration',
    description: 'Event sourcing, CQRS, and saga orchestration to connect heterogeneous systems reliably — with full observability, rollback capability, and documented contracts.',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    color: '#e9e9e9',
  },
];

export default function Whatwedo() {
  return (
    <section>
      <div className="px-10 pt-4 pb-8">
        <span className="text-[10px] uppercase tracking-widest text-fg-muted mb-3 block">
          Capabilities
        </span>
        <h2
          className="text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-bold text-fg-primary"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          What We Can Do
        </h2>
      </div>
      <StackingCard cards={CARDS} />
    </section>
  );
}
