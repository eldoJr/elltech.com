'use client';

import { RefObject } from 'react';
import StackingCard from '@/components/ui/stackingcard';
import systemInterface from '../assets/undraw_system-interface_jffo.svg';
import serverCluster from '../assets/undraw_server-cluster_7ugi.svg';
import aiAgent from '../assets/undraw_ai-agent_pdkp.svg';
import mobileDevices from '../assets/undraw_mobile-devices_7ob7.svg';
import dragDrop from '../assets/undraw_drag-and-drop_v4po.svg';
import qaEngineers from '../assets/undraw_qa-engineers_kgp8.svg';

const CARDS = [
  {
    title: 'Front-End Development',
    description: 'Build modern frontends designed for performance, accessibility, and scale.',
    url: systemInterface.src,
    color: '#ffffff',
    badges: ['Front-End', 'Web Development', 'React', 'Angular', 'NextJs'],
  },
  {
    title: 'Back-End Development',
    description: 'Develop secure, scalable backends that perform reliably under load.',
    url: serverCluster.src,
    color: '#f3f4f4',
    badges: ['Back-End', 'Database', 'Go', '.NET', 'Java', 'Node.js'],
  },
  {
    title: 'AI and Machine Learning',
    description: 'Ship AI features that survive production — from LLM apps to ML pipelines.',
    url: aiAgent.src,
    color: '#eaecec',
    badges: ['AI', 'Machine Learning', 'Data Science', 'LLMs', 'Generative AI', 'Python'],
  },
  {
    title: 'Mobile Development',
    description: 'Launch iOS and Android apps with smooth performance, stable sessions, and secure data handling.',
    url: mobileDevices.src,
    color: '#f0f2f2',
    badges: ['Mobile Applications', 'iOS', 'Android'],
  },
  {
    title: 'UX/UI Design',
    description: 'Deliver product designs with clear user flows, reusable components, and accessible layouts.',
    url: dragDrop.src,
    color: '#e4e8e9',
    badges: ['UX Design', 'UI Design'],
  },
  {
    title: 'QA and Testing',
    description: 'Ship release-ready software with manual and automated testing that validates core flows end to end.',
    url: qaEngineers.src,
    color: '#E9EDEF',
    badges: ['Quality Assurance'],
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
