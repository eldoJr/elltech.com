'use client';

import { RefObject } from 'react';
import StackingCard from '@/components/ui/stackingcard';
import systemInterface from '../assets/undraw_system-interface_jffo.svg';

const CARDS = [
  {
    title: 'Front-End Development',
    description: 'Build modern frontends designed for performance, accessibility, and scale.',
    url: systemInterface.src,
    color: '#ffffff',
    badges: ['Front-End', 'Web Development', 'React', 'Angular', 'NextJs'],
  },
  {
    title: 'Multi-Tenant SaaS',
    description: 'From tenant isolation to billing infrastructure and feature flagging, we architect SaaS platforms that scale to thousands of enterprise customers without operational complexity.',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: '#f3f4f4',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'From multi-region deployments to infrastructure-as-code pipelines, we build cloud environments that are reproducible, auditable, and cost-efficient.',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    color: '#eaecec',
  },
  {
    title: 'Enterprise Integration',
    description: 'Event sourcing, CQRS, and saga orchestration to connect heterogeneous systems reliably — with full observability, rollback capability, and documented contracts.',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    color: '#f0f2f2',
  },
  {
    title: 'Compliance Engineering',
    description: 'SOC 2, ISO 27001, and GDPR-aligned architectures with threat modelling, secrets management, and compliance controls embedded from day one — not retrofitted.',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    color: '#e4e8e9',
  },
  {
    title: 'Observability & SRE',
    description: 'Full-stack visibility through distributed tracing, structured logging, and metric-driven alerting — enabling rapid incident response and continuous performance optimisation.',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    color: '#E9EDEF',
  },
];

export default function Whatwedo({ scrollEl }: { scrollEl: RefObject<HTMLElement | null> }) {
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
      <StackingCard cards={CARDS} scrollEl={scrollEl} />
    </section>
  );
}
