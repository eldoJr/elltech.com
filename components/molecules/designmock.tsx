const layers = [
  { icon: "frame", label: "Hero Section", indent: 0, selected: true },
  { icon: "rect",  label: "Background",   indent: 1, selected: false },
  { icon: "text",  label: "Headline",     indent: 1, selected: false },
  { icon: "rect",  label: "CTA Button",   indent: 1, selected: false },
  { icon: "frame", label: "Nav",          indent: 0, selected: false },
  { icon: "rect",  label: "Logo",         indent: 1, selected: false },
  { icon: "text",  label: "Links",        indent: 1, selected: false },
];

const FrameIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v18M18 3v18M3 6h18M3 18h18" />
  </svg>
);
const RectIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);
const TextIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
  </svg>
);

const iconMap = { frame: <FrameIcon />, rect: <RectIcon />, text: <TextIcon /> };

const toolIcons = [
  <svg key="v" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-7 1-4 7z" /></svg>,
  <svg key="r" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>,
  <svg key="t" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16" /></svg>,
  <svg key="p" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>,
];

export default function DesignMock() {
  return (
    <div className="flex w-full h-full overflow-hidden" style={{ background: "var(--bg-surface)", fontFamily: "var(--font-monument)" }}>

      {/* toolbar left */}
      <div className="flex flex-col items-center gap-3 py-3 px-2 shrink-0" style={{ borderRight: "1px solid var(--border-default)", width: 32 }}>
        {toolIcons.map((icon, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded"
            style={{
              width: 22, height: 22,
              background: i === 0 ? "var(--bg-default)" : "transparent",
              color: i === 0 ? "var(--fg-primary)" : "var(--fg-muted)",
              cursor: "pointer",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* layers panel */}
      <div className="flex flex-col shrink-0 overflow-hidden" style={{ width: 110, borderRight: "1px solid var(--border-default)" }}>
        <div className="flex items-center justify-between px-2 py-2 shrink-0" style={{ borderBottom: "1px solid var(--border-default)" }}>
          <span style={{ fontSize: 8, color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Layers</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--fg-muted)" }}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <div className="flex flex-col py-1">
          {layers.map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-1 py-[3px] rounded-sm mx-1"
              style={{
                background: l.selected ? "rgba(249,132,97,0.12)" : "transparent",
                paddingLeft: 8 + l.indent * 8,
                paddingRight: 4,
              }}
            >
              <span style={{ color: l.selected ? "var(--accent)" : "var(--fg-muted)", flexShrink: 0 }}>
                {iconMap[l.icon as keyof typeof iconMap]}
              </span>
              <span style={{ fontSize: 8, color: l.selected ? "var(--fg-primary)" : "var(--fg-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* canvas */}
      <div className="flex flex-1 items-center justify-center overflow-hidden relative" style={{ background: "var(--bg-default)" }}>
        {/* grid dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-default) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* frame label */}
        <div className="absolute" style={{ top: "calc(50% - 100px)", left: "calc(50% - 80px)", transform: "translateX(-50%)" }}>
          <span style={{ fontSize: 7, color: "var(--fg-muted)", letterSpacing: "0.04em" }}>Hero Section</span>
        </div>

        {/* wireframe card */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            width: 160, height: 110,
            background: "var(--bg-surface)",
            border: "1px solid var(--accent)",
            boxShadow: "0 0 0 3px rgba(249,132,97,0.12), 0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* nav bar */}
          <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid var(--border-default)" }}>
            <div className="rounded" style={{ width: 20, height: 5, background: "var(--accent)", opacity: 0.8 }} />
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-full" style={{ width: 14, height: 3, background: "var(--border-default)" }} />
              ))}
            </div>
          </div>
          {/* hero content */}
          <div className="flex flex-col items-start px-3 pt-3 gap-1.5">
            <div className="rounded-full" style={{ width: 36, height: 3, background: "var(--accent)", opacity: 0.7 }} />
            <div className="rounded" style={{ width: "90%", height: 5, background: "var(--fg-primary)", opacity: 0.5 }} />
            <div className="rounded" style={{ width: "70%", height: 5, background: "var(--fg-primary)", opacity: 0.5 }} />
            <div className="rounded" style={{ width: "80%", height: 3, background: "var(--fg-muted)", opacity: 0.35 }} />
            <div className="flex gap-1.5 mt-1">
              <div className="rounded-md" style={{ width: 32, height: 10, background: "var(--accent)", opacity: 0.9 }} />
              <div className="rounded-md" style={{ width: 28, height: 10, background: "transparent", border: "1px solid var(--border-default)" }} />
            </div>
          </div>
        </div>

        {/* selection handles */}
        {[[-80,-55],[80,-55],[-80,55],[80,55]].map(([x, y], i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              width: 5, height: 5,
              left: `calc(50% + ${x}px - 2.5px)`,
              top:  `calc(50% + ${y}px - 2.5px)`,
              background: "var(--bg-surface)",
              border: "1px solid var(--accent)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          />
        ))}

        {/* cursor */}
        <div className="absolute pointer-events-none" style={{ left: "calc(50% + 52px)", top: "calc(50% - 28px)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--fg-primary)" stroke="var(--bg-surface)" strokeWidth="1.5">
            <path d="M5 3l14 9-7 1-4 7z" />
          </svg>
          <div className="rounded-sm px-1.5 py-0.5 mt-0.5" style={{ background: "var(--accent)", fontSize: 6, color: "#fff", whiteSpace: "nowrap" }}>
            elltech
          </div>
        </div>
      </div>

      {/* inspect panel */}
      <div className="flex flex-col shrink-0 overflow-hidden" style={{ width: 88, borderLeft: "1px solid var(--border-default)" }}>
        <div className="px-2 py-2 shrink-0" style={{ borderBottom: "1px solid var(--border-default)" }}>
          <span style={{ fontSize: 8, color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Inspect</span>
        </div>
        <div className="flex flex-col gap-3 px-2 py-3">
          {/* dimensions */}
          <div>
            <p style={{ fontSize: 7, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Frame</p>
            <div className="grid grid-cols-2 gap-1">
              {[["W","1440"],["H","900"],["X","0"],["Y","0"]].map(([k, v]) => (
                <div key={k} className="flex items-center gap-1 rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
                  <span style={{ fontSize: 7, color: "var(--fg-muted)" }}>{k}</span>
                  <span style={{ fontSize: 7, color: "var(--fg-primary)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* fill */}
          <div>
            <p style={{ fontSize: 7, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Fill</p>
            <div className="flex items-center gap-1.5 rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
              <div className="rounded-sm shrink-0" style={{ width: 10, height: 10, background: "var(--accent)" }} />
              <span style={{ fontSize: 7, color: "var(--fg-primary)" }}>F98461</span>
            </div>
          </div>
          {/* typography */}
          <div>
            <p style={{ fontSize: 7, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Text</p>
            <div className="flex flex-col gap-1">
              <div className="rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
                <p style={{ fontSize: 7, color: "var(--fg-primary)" }}>Monument Grotesk</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
                  <span style={{ fontSize: 7, color: "var(--fg-primary)" }}>52px</span>
                </div>
                <div className="rounded px-1.5 py-1" style={{ background: "var(--bg-default)" }}>
                  <span style={{ fontSize: 7, color: "var(--fg-primary)" }}>500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
