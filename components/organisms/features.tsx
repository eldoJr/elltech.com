const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0" style={{ width: "1em", height: "1em", verticalAlign: "-0.125em" }}>
    <path d="m5 12.5 4.25 4.25L19 7" />
  </svg>
);

export default function Features() {
  return (
    <section
      className="group"
      style={{ background: "#280016" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* eyebrow + heading */}
        <p
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "#f98461", fontFamily: "var(--font-monument)" }}
        >
          What we deliver
        </p>
        <h2
          className="mt-3 leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 500, color: "#fff", fontFamily: "var(--font-monument)" }}
        >
          Every layer, handled.
        </h2>
        <p
          className="mt-4 max-w-md leading-relaxed"
          style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-monument)" }}
        >
          From the first commit to the last deploy — we own the full stack so nothing falls through the cracks.
        </p>

        {/* radio inputs */}
        <input type="radio" name="feat" id="feat-a" className="sr-only" defaultChecked />
        <input type="radio" name="feat" id="feat-b" className="sr-only" />
        <input type="radio" name="feat" id="feat-c" className="sr-only" />

        {/* pill tabs */}
        <div className="mt-10 flex justify-center">
          <div
            className="flex gap-1 rounded-full p-1"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <label
              htmlFor="feat-a"
              className="cursor-pointer rounded-full px-5 py-2 text-sm group-has-[#feat-a:checked]:bg-[#f98461] group-has-[#feat-a:checked]:font-medium group-has-[#feat-a:checked]:text-white"
              style={{ fontFamily: "var(--font-monument)", color: "rgba(255,255,255,0.4)", transition: "all 150ms ease" }}
            >
              Architecture
            </label>
            <label
              htmlFor="feat-b"
              className="cursor-pointer rounded-full px-5 py-2 text-sm group-has-[#feat-b:checked]:bg-[#f98461] group-has-[#feat-b:checked]:font-medium group-has-[#feat-b:checked]:text-white"
              style={{ fontFamily: "var(--font-monument)", color: "rgba(255,255,255,0.4)", transition: "all 150ms ease" }}
            >
              Performance
            </label>
            <label
              htmlFor="feat-c"
              className="cursor-pointer rounded-full px-5 py-2 text-sm group-has-[#feat-c:checked]:bg-[#f98461] group-has-[#feat-c:checked]:font-medium group-has-[#feat-c:checked]:text-white"
              style={{ fontFamily: "var(--font-monument)", color: "rgba(255,255,255,0.4)", transition: "all 150ms ease" }}
            >
              Delivery
            </label>
          </div>
        </div>

        {/* panel A — Architecture */}
        <div
          className="mt-8 hidden gap-10 rounded-2xl p-8 group-has-[#feat-a:checked]:grid lg:grid-cols-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <h3
              className="leading-snug tracking-tight"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500, color: "#fff", fontFamily: "var(--font-monument)" }}
            >
              Built for scale from day one
            </h3>
            <p className="mt-3 leading-relaxed" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-monument)" }}>
              We design systems that grow with your product — not against it. Every decision is made with future load, team size, and operational complexity in mind.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {["Modular service boundaries", "Event-driven data flows", "Zero-downtime deployment pipelines", "Observability baked in from the start"].map((b) => (
                <li key={b} className="flex items-start gap-2.5" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-monument)" }}>
                  <span style={{ color: "#f98461", marginTop: 1 }}><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: "#280016", border: "1px solid rgba(255,255,255,0.08)", minHeight: 420 }}>
            <div className="flex items-center gap-1.5 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} className="rounded-full" style={{ width: 8, height: 8, background: c, opacity: 0.7 }} />)}
              <span className="ml-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-monument)" }}>System topology</span>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
              <img
                alt="Fireworks Lab"
                title="Fireworks Lab"
                loading="lazy"
                decoding="async"
                style={{ width: "80%", height: "80%", objectFit: "contain", transform: "rotate(90deg)", color: "transparent" }}
                src="https://cdn.sanity.io/images/pv37i0yn/horizon/6b512b4af5b4557e7786b1f24c452e4453dc9405-1080x1080.svg"
              />
            </div>
            <div className="hidden">
              {[["API Gateway","100%"],["Auth Service","99.98%"],["Data Layer","99.99%"],["CDN Edge","100%"]].map(([name, up]) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="rounded-md flex items-center justify-center shrink-0" style={{ width: 28, height: 28, background: "rgba(249,132,97,0.15)", border: "1px solid rgba(249,132,97,0.25)" }}>
                    <div className="rounded-sm" style={{ width: 8, height: 8, background: "#f98461" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-monument)" }}>{name}</span>
                      <span style={{ fontSize: 9, color: "#f98461", fontFamily: "var(--font-monument)" }}>{up}</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.08)" }}>
                      <div style={{ height: "100%", width: up, background: "linear-gradient(to right,#f98461,rgba(249,132,97,0.4))", borderRadius: 9999 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* panel B — Performance */}
        <div
          className="mt-8 hidden gap-10 rounded-2xl p-8 group-has-[#feat-b:checked]:grid lg:grid-cols-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <h3
              className="leading-snug tracking-tight"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500, color: "#fff", fontFamily: "var(--font-monument)" }}
            >
              Speed is a feature, not a metric
            </h3>
            <p className="mt-3 leading-relaxed" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-monument)" }}>
              We obsess over every millisecond. From edge caching to bundle splitting and render optimisation — your users feel the difference immediately.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {["Sub-100ms TTFB on global edge", "Core Web Vitals in the green", "Adaptive image & font loading", "Real-user monitoring dashboards"].map((b) => (
                <li key={b} className="flex items-start gap-2.5" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-monument)" }}>
                  <span style={{ color: "#f98461", marginTop: 1 }}><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: "#280016", border: "1px solid rgba(255,255,255,0.08)", minHeight: 420 }}>
            <div className="flex items-center gap-1.5 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} className="rounded-full" style={{ width: 8, height: 8, background: c, opacity: 0.7 }} />)}
              <span className="ml-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-monument)" }}>Performance snapshot</span>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
              <img
                alt="Fireworks Inference"
                title="Fireworks Inference"
                loading="lazy"
                decoding="async"
                style={{ width: "80%", height: "80%", objectFit: "contain", color: "transparent" }}
                src="https://cdn.sanity.io/images/pv37i0yn/horizon/7bf4f8defdb7474e26f24b824b14097605e1df11-1080x1080.svg"
              />
            </div>
          </div>
        </div>

        {/* panel C — Delivery */}
        <div
          className="mt-8 hidden gap-10 rounded-2xl p-8 group-has-[#feat-c:checked]:grid lg:grid-cols-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <h3
              className="leading-snug tracking-tight"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500, color: "#fff", fontFamily: "var(--font-monument)" }}
            >
              Shipped on time, every time
            </h3>
            <p className="mt-3 leading-relaxed" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-monument)" }}>
              Predictable delivery through tight feedback loops, weekly previews, and a process that keeps you informed without slowing us down.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {["Weekly preview deployments", "Async-first communication", "Scope-locked sprint cycles", "Post-launch support included"].map((b) => (
                <li key={b} className="flex items-start gap-2.5" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-monument)" }}>
                  <span style={{ color: "#f98461", marginTop: 1 }}><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: "#280016", border: "1px solid rgba(255,255,255,0.08)", minHeight: 420 }}>
            <div className="flex items-center gap-1.5 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} className="rounded-full" style={{ width: 8, height: 8, background: c, opacity: 0.7 }} />)}
              <span className="ml-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-monument)" }}>Sprint timeline</span>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
              <img
                alt="Fireworks Ensembling"
                title="Fireworks Ensembling"
                loading="lazy"
                decoding="async"
                style={{ width: "80%", height: "80%", objectFit: "contain", color: "transparent" }}
                src="https://cdn.sanity.io/images/pv37i0yn/horizon/24170776adcefd472cbde0cd67f4ea632f48d9b3-1080x1080.svg"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
