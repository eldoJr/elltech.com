'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, RefObject } from 'react';

interface CardData {
  title: string;
  description: string;
  url: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  scrollEl: RefObject<HTMLElement | null>;
}

const Card = ({ i, title, description, url, color, progress, range, targetScale, scrollEl }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    container: scrollEl as RefObject<HTMLElement>,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[80%] p-10 origin-top border border-black/10"
      >
        <h2 className="text-xl font-bold text-fg-primary mb-1">{title}</h2>
        <div className="flex h-full mt-6 gap-10">
          <div className="w-[40%] relative top-[10%]">
            <p className="text-sm text-fg-muted leading-relaxed">{description}</p>
          </div>
          <div className="relative w-[60%] h-full overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function StackingCard({ cards, scrollEl }: { cards: CardData[]; scrollEl: RefObject<HTMLElement | null> }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    container: scrollEl as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container}>
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            url={card.url}
            title={card.title}
            color={card.color}
            description={card.description}
            progress={scrollYProgress}
            range={[i * (1 / cards.length), 1]}
            targetScale={targetScale}
            scrollEl={scrollEl}
          />
        );
      })}
    </div>
  );
}
