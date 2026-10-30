import Button from "@/components/atoms/button";
import Comparison from "@/components/molecules/comparison";

export default function Hero() {
  return (
    <section
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2"
      style={{ minHeight: "100svh", paddingTop: "calc(52px + var(--space-6))", paddingBottom: "var(--space-8)" }}
    >
      {/* copy column */}
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--accent)", fontFamily: "var(--font-monument)" }}
        >
          Software Engineering Studio
        </p>

        <h1
          className="mt-3 leading-[1.05] tracking-tight"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 500,
            color: "var(--fg-primary)",
            fontFamily: "var(--font-monument)",
          }}
        >
          Systems built to<br />scale without<br />compromise.
        </h1>

        <p
          className="mt-5 max-w-md leading-relaxed"
          style={{ fontSize: 15, color: "var(--fg-muted)", fontFamily: "var(--font-monument)" }}
        >
          We design and engineer digital infrastructure that performs under pressure — from architecture decisions to production deployments.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">Start a project</Button>
          <Button href="#work" variant="ghost">See our work</Button>
        </div>

        <p
          className="mt-6 flex items-center gap-2"
          style={{ fontSize: 12, color: "var(--fg-muted)", fontFamily: "var(--font-monument)" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
          Drag the handle — same system, six weeks apart.
        </p>
      </div>

      {/* comparison column */}
      <Comparison />
    </section>
  );
}
