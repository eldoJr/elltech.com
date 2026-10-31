"use client";

import { useCallback, useState } from "react";
import Header from "@/components/organisms/header";
import Rail from "@/components/organisms/rail";
import Services from "@/components/organisms/services";

export default function Hero() {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);

  const scrollRef = useCallback((el: HTMLElement | null) => {
    setScrollEl(el);
  }, []) as React.RefCallback<HTMLElement>;

  return (
    <div className="flex h-screen overflow-hidden">

      <Rail scrollEl={scrollEl} />

      <main ref={scrollRef} className="flex-1 overflow-y-auto bg-bg-surface">

        {/* Hero screen */}
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="flex-1 px-10 pt-8">
            <h1 className="text-[clamp(2.4rem,4.2vw,4.8rem)] leading-[1.04] font-bold text-fg-primary max-w-3xl">
              Systems will reshape the digital economy. Elltech designs scalable infrastructure into modern industries.
            </h1>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-center px-10 pb-10">
              <span className="border border-black/25 px-3 py-1.5 text-[10px] uppercase tracking-widest text-fg-primary">
                Systems Design
              </span>
              <span className="border border-black/25 border-l-0 px-3 py-1.5 text-[10px] uppercase tracking-widest text-fg-primary rounded-r-full">
                Scalability
              </span>
            </div>
            <div className="bg-accent text-white px-10 py-8 flex items-center justify-between gap-20 cursor-pointer hover:opacity-90 transition-opacity min-w-[260px] m-6">
              <span className="text-sm tracking-wide">Start a project</span>
              <span className="text-base">→</span>
            </div>
          </div>
        </div>

        <Services scrollEl={scrollEl} />

      </main>
    </div>
  );
}
