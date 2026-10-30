"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Comparison() {
  const [pos, setPos] = useState(50);
  const [panelWidth, setPanelWidth] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const measure = useCallback(() => {
    if (panelRef.current) setPanelWidth(panelRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const toPercent = (clientX: number) => {
    if (!panelRef.current) return pos;
    const { left } = panelRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / panelWidth) * 100));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos(toPercent(e.clientX));
  };
  const onPointerUp = () => { dragging.current = false; };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={panelRef}
      className="relative w-full select-none overflow-hidden"
      style={{
        aspectRatio: "4/3",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* after — base layer */}
      <div className="absolute inset-0 p-6" style={{ background: "#171717" }}>
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
          <div className="h-6 w-16 rounded-lg" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>
        <div className="mt-5 h-28 rounded-xl" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.05), rgba(249,132,97,0.25))" }} />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[48, 40, 56].map((w, i) => (
            <div key={i} className="p-3" style={{ borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.08)" }}>
              <div className="h-2 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
              <div className="mt-2 rounded-full" style={{ height: 10, width: w, background: "rgba(255,255,255,0.7)" }} />
            </div>
          ))}
        </div>
        <span
          className="absolute bottom-4 right-4 text-xs font-medium text-white"
          style={{ background: "rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: "var(--radius-full)", fontFamily: "var(--font-monument)" }}
        >
          After
        </span>
      </div>

      {/* before — clipped layer */}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div
          className="absolute inset-y-0 left-0 p-6"
          style={{ width: panelWidth > 0 ? panelWidth : "100%", background: "#f5f5f5" }}
        >
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-20 rounded" style={{ background: "#a3a3a3" }} />
            <div className="h-6 w-14 rounded" style={{ background: "#d4d4d4" }} />
          </div>
          <div className="mt-5 h-28 rounded" style={{ background: "#e5e5e5" }} />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[40, 32, 48].map((w, i) => (
              <div key={i} className="rounded p-3" style={{ background: "#e5e5e5" }}>
                <div className="h-2 w-8 rounded" style={{ background: "#a3a3a3" }} />
                <div className="mt-2 h-3 rounded" style={{ width: w, background: "#737373" }} />
              </div>
            ))}
          </div>
          <span
            className="absolute bottom-4 left-4 text-xs font-medium shadow-sm"
            style={{ background: "#ffffff", color: "#737373", padding: "3px 10px", borderRadius: "var(--radius-full)", fontFamily: "var(--font-monument)" }}
          >
            Before
          </span>
        </div>
      </div>

      {/* drag handle */}
      <button
        aria-label="Move the comparison divider"
        className="absolute inset-y-0 z-10 flex w-10 cursor-ew-resize items-center justify-center outline-none overflow-visible"
        style={{ left: `${pos}%`, marginLeft: "-20px" }}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: "rgba(255,255,255,0.85)" }} />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg" style={{ color: "#171717" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M7 7h12m0 0-3-3m3 3-3 3M17 17H5m0 0 3 3m-3-3 3-3" />
          </svg>
        </span>
      </button>
    </div>
  );
}
