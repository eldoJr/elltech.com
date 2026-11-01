"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, stagger, animate } from "motion/react";
import Rail from "@/components/organisms/rail";
import Intro from "@/components/organisms/intro";
import Engineering from "@/components/organisms/engineering";
import Platforms from "@/components/organisms/platforms";
import Application from "@/components/organisms/application";
import Data from "@/components/organisms/data";

const E = [0.16, 1, 0.3, 1] as const;
const D = 1.4;

function NavItem({ label }: { label: string }) {
  return (
    <div className="overflow-hidden relative">
      <motion.a
        href="#"
        className="relative block px-4 py-1.5 text-[10px] uppercase tracking-widest text-fg-primary cursor-pointer"
        initial="rest"
        whileHover="hover"
      >
        <motion.span
          className="absolute inset-0 bg-fg-primary"
          variants={{
            rest: { scaleY: 0, transformOrigin: "bottom" },
            hover: { scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
        />
        <motion.span
          className="relative z-10 block"
          variants={{
            rest: { color: "#0d0d0d", transition: { duration: 0.25, ease: "easeOut" } },
            hover: { color: "#ffffff", transition: { duration: 0.25, ease: "easeOut" } },
          }}
        >
          {label}
        </motion.span>
      </motion.a>
    </div>
  );
}

const LINES = [
  "Systems will reshape",
  "the digital economy.",
  "Elltech designs scalable",
  "infrastructure into",
  "modern industries.",
];

export default function Hero() {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [introReady, setIntroReady] = useState(false);
  const [railReady, setRailReady] = useState(false);
  const railLogoRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();

  const [bgTinted, setBgTinted] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);
  const bgState = useRef<"white" | "tinted">("white");

  const scrollRef = useCallback((el: HTMLElement | null) => {
    setScrollEl(el);
    mainRef.current = el;
  }, []) as React.RefCallback<HTMLElement>;

  useEffect(() => {
    if (!scrollEl) return;
    const onScroll = () => {
      const platforms = scrollEl.querySelector("#enterprise-platforms");
      if (!platforms || !mainRef.current) return;
      const rect = platforms.getBoundingClientRect();
      const containerRect = scrollEl.getBoundingClientRect();
      const inside = rect.top < containerRect.bottom && rect.bottom > containerRect.top;
      if (inside && bgState.current !== "tinted") {
        bgState.current = "tinted";
        setBgTinted(true);
        animate(mainRef.current, { backgroundColor: "#E9EDEF" }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
      } else if (!inside && bgState.current !== "white") {
        bgState.current = "white";
        setBgTinted(false);
        animate(mainRef.current, { backgroundColor: "#ffffff" }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
      }
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollEl]);

  useEffect(() => {
    if (!introReady) return;

    const run = async () => {
      // Set initial state instantly
      await animate([
        ["[data-line]", { y: "105%" }, { duration: 0 }],
        ["[data-nav]", { y: "105%" }, { duration: 0 }],
        ["[data-bottom]", { y: "105%" }, { duration: 0 }],
      ]);

      // All elements simultaneously
      animate("[data-nav]", { y: "0%" }, { duration: D, ease: E, delay: stagger(0.09) });
      animate("[data-line]", { y: "0%" }, { duration: D, ease: E, delay: stagger(0.1) });
      await animate("[data-bottom]", { y: "0%" }, { duration: D, ease: E, delay: stagger(0.11) });

      setRailReady(true);
    };

    run();
  }, [introReady]);

  return (
    <>
      <AnimatePresence>
        {!introReady && <Intro onDone={() => setIntroReady(true)} targetRef={railLogoRef} />}
      </AnimatePresence>

      <div className="flex h-screen overflow-hidden">
        <Rail scrollEl={scrollEl} logoRef={railLogoRef} ready={railReady} bgTinted={bgTinted} />

        <main ref={scrollRef} className="flex-1 overflow-y-auto" style={{ backgroundColor: "#ffffff" }}>

          <div ref={scope} className="flex flex-col min-h-screen">

            {/* Nav */}
            <nav className="flex items-center justify-between px-10 py-6">
              <div className="overflow-hidden">
                <div data-nav className="flex items-center gap-2" style={{ transform: "translateY(105%)" }}>
                  <svg width="96" height="25" viewBox="0 0 96 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.5" y="3.5" width="18" height="18" stroke="#262933" />
                    <rect x="7.5" y="7.5" width="10" height="10" stroke="#262933" />
                    <line x1="7.5" y1="2.18557e-08" x2="7.5" y2="4" stroke="#262933" />
                    <line y1="17.5" x2="4" y2="17.5" stroke="#262933" />
                    <line x1="21" y1="17.5" x2="25" y2="17.5" stroke="#262933" />
                    <line x1="7.5" y1="21" x2="7.5" y2="25" stroke="#262933" />
                    <line y1="7.5" x2="4" y2="7.5" stroke="#262933" />
                    <line x1="17.5" y1="2.18557e-08" x2="17.5" y2="4" stroke="#262933" />
                    <line x1="21" y1="7.5" x2="25" y2="7.5" stroke="#262933" />
                    <line x1="17.5" y1="21" x2="17.5" y2="25" stroke="#262933" />
                    <path d="M35.77 16V8.56H37.09L38.64 12.6C38.94 13.41 39.39 14.93 39.39 14.93H39.41C39.41 14.93 39.87 13.42 40.17 12.6L41.69 8.56H43.05V16H42.07V11.5C42.07 10.84 42.13 9.59 42.13 9.59H42.11C42.11 9.59 41.81 10.71 41.59 11.29L39.78 16H38.98L37.17 11.29C36.96 10.71 36.65 9.59 36.65 9.59H36.63C36.63 9.59 36.69 10.84 36.69 11.5V16H35.77ZM44.0986 16L46.8186 8.56H47.9586L50.6986 16H49.5786L48.8386 13.83H45.9086L45.1486 16H44.0986ZM46.9186 10.95L46.1886 13.03H48.5686L47.8586 10.95C47.6086 10.23 47.4086 9.37 47.4086 9.37H47.3786C47.3786 9.37 47.1586 10.26 46.9186 10.95ZM51.761 16V8.56H52.831L55.881 13.22C56.241 13.77 56.711 14.7 56.711 14.7H56.741C56.741 14.7 56.671 13.73 56.671 13.11V8.56H57.631V16H56.571L53.531 11.34C53.171 10.78 52.681 9.87 52.681 9.87H52.661C52.661 9.87 52.721 10.84 52.721 11.44V16H51.761ZM59.2931 16V8.56H60.3131V16H59.2931ZM61.9708 16V8.56H67.0608V9.46H62.9908V11.69H66.3808V12.56H62.9908V16H61.9708ZM68.2915 16V8.56H73.5815V9.46H69.3115V11.71H73.1715V12.56H69.3115V15.07H73.6915V16H68.2915ZM77.684 16.15C75.604 16.15 74.574 15.01 74.494 13.59H75.504C75.624 14.71 76.364 15.33 77.714 15.33C78.704 15.33 79.424 14.89 79.424 13.99C79.424 13.02 78.564 12.79 77.264 12.5C75.934 12.22 74.804 11.84 74.804 10.41C74.804 9.16 75.854 8.42 77.384 8.42C79.214 8.42 80.034 9.34 80.214 10.61H79.224C79.094 9.71 78.444 9.22 77.394 9.22C76.414 9.22 75.774 9.62 75.774 10.36C75.774 11.17 76.584 11.4 77.704 11.63C79.144 11.92 80.454 12.29 80.454 13.95C80.454 15.36 79.294 16.15 77.684 16.15ZM80.9612 9.46V8.56H86.8812V9.46H84.4312V16H83.4012V9.46H80.9612ZM90.9749 16.16C88.7249 16.16 87.3349 14.5 87.3349 12.28C87.3349 10.05 88.7249 8.4 90.9749 8.4C93.2149 8.4 94.6249 10.05 94.6249 12.28C94.6249 14.5 93.2149 16.16 90.9749 16.16ZM90.9749 15.26C92.6649 15.26 93.5649 13.98 93.5649 12.28C93.5649 10.57 92.6649 9.28 90.9749 9.28C89.2849 9.28 88.3749 10.57 88.3749 12.28C88.3749 13.98 89.2849 15.26 90.9749 15.26Z" fill="#262933" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center divide-x divide-black/20 border border-black/20">
                {["Services", "Work", "Contact", "Blog"].map((item) => (
                  <div key={item} className="overflow-hidden">
                    <div data-nav style={{ transform: "translateY(105%)" }}>
                      <NavItem label={item} />
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            {/* Headline — each line clips and slides up */}
            <div className="flex-1 px-10 pt-8">
              <h1 className="text-[clamp(2.4rem,4.2vw,4.8rem)] leading-[1.04] font-bold text-fg-primary max-w-3xl">
                {LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <span data-line className="block" style={{ transform: "translateY(105%)" }}>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              <div className="px-10 pb-10 flex items-center">
                <div className="overflow-hidden">
                  <span data-bottom className="block border border-black/25 px-3 py-1.5 text-[10px] uppercase tracking-widest text-fg-primary" style={{ transform: "translateY(105%)" }}>
                    Systems Design
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span data-bottom className="block w-6 h-px bg-black/25" style={{ transform: "translateY(105%)" }} />
                </div>
                <div className="overflow-hidden">
                  <span data-bottom className="block border border-black/25 px-3 py-1.5 text-[10px] uppercase tracking-widest text-fg-primary rounded-full" style={{ transform: "translateY(105%)" }}>
                    Scalability
                  </span>
                </div>
              </div>
              <div className="m-6 overflow-hidden">
                <motion.div
                  data-bottom
                  className="relative bg-accent text-white px-10 py-8 flex items-center justify-between gap-20 cursor-pointer min-w-[260px] overflow-hidden"
                  style={{ transform: "translateY(105%)" }}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.span
                    className="absolute inset-0 bg-fg-primary"
                    variants={{
                      rest: { scaleY: 0, transformOrigin: "bottom" },
                      hover: { scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  />
                  <motion.span
                    className="relative z-10 text-sm tracking-wide"
                    variants={{
                      rest: { color: "#ffffff", transition: { duration: 0.25, ease: "easeOut" } },
                      hover: { color: "#ffffff", transition: { duration: 0.25, ease: "easeOut" } },
                    }}
                  >
                    Start a project
                  </motion.span>
                  <motion.span
                    className="relative z-10 text-base"
                    variants={{
                      rest: { color: "#ffffff", transition: { duration: 0.25, ease: "easeOut" } },
                      hover: { color: "#ffffff", transition: { duration: 0.25, ease: "easeOut" } },
                    }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </div>

          </div>

          <Engineering />
          <Platforms />
          <Application />
          <Data />

        </main>
      </div>
    </>
  );
}
