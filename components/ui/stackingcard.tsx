'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';

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
}

export const Card = ({ i, title, description, url, color, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="flex flex-col relative h-[600px] w-[85%] p-12 origin-top border border-black/10"
      >
        <h2 className="text-2xl text-center font-semibold text-fg-primary">{title}</h2>
        <div className="flex h-full mt-5 gap-10">
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

interface StackingCardProps {
  cards: CardData[];
}

export default function StackingCard({ cards }: StackingCardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container}>
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
          />
        );
      })}
    </main>
  );
}
