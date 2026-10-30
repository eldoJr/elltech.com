import DesignMock from "@/components/molecules/designmock";
import MobileMock from "@/components/molecules/mobilemock";
import MicrointeractionMock from "@/components/molecules/microinteractionmock";
import CommunicationMock from "@/components/molecules/communicationmock";

const crosshatch = {
  backgroundImage:
    "repeating-linear-gradient(315deg, var(--border-default) 0, var(--border-default) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-315deg, var(--border-default) 0, var(--border-default) 1px, transparent 0, transparent 50%)",
  backgroundSize: "5px 5px",
};

const innerShadow = {
  boxShadow:
    "0 24px 40px -20px rgba(38,38,43,0.30), 0 10px 24px 0 rgba(38,38,43,0.06), 0 1px 1px 0 rgba(38,38,43,0.16), 0 0 0 1px rgba(38,38,43,0.05)",
};

function Row({
  left,
  right,
  descriptions,
  bgHeight = 448,
  leftW = 514, leftH = 384,
  rightW = 514, rightH = 384,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  descriptions: [{ title: string; text: string }, { title: string; text: string }];
  bgHeight?: number;
  leftW?: number; leftH?: number;
  rightW?: number; rightH?: number;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* shared bg card */}
      <div className="relative rounded-xl overflow-hidden flex items-center justify-center gap-4" style={{ background: "var(--bg-default)", height: bgHeight, padding: "32px", ...crosshatch }}>
          {/* left mock */}
          <div className="overflow-hidden shrink-0" style={{ borderRadius: "var(--radius-md)", width: leftW, height: leftH, ...innerShadow }}>
            {left}
          </div>
          {/* right mock */}
          <div className="overflow-hidden shrink-0" style={{ borderRadius: "var(--radius-md)", width: rightW, height: rightH, ...innerShadow }}>
            {right}
          </div>
      </div>

      {/* descriptions */}
      <div className="grid grid-cols-2 gap-6">
        {descriptions.map((d) => (
          <div key={d.title}>
            <p className="font-medium" style={{ fontSize: 13, color: "var(--fg-primary)", fontFamily: "var(--font-monument)" }}>{d.title}</p>
            <p className="mt-1" style={{ fontSize: 12, color: "var(--fg-muted)", fontFamily: "var(--font-monument)", lineHeight: 1.6 }}>{d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--accent)", fontFamily: "var(--font-monument)" }}
      >
        Processo
      </p>
      <h2
        className="mt-3 leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 500, color: "var(--fg-primary)", fontFamily: "var(--font-monument)" }}
      >
        A process tuned for momentum
      </h2>
      <p
        className="mt-4 max-w-md leading-relaxed"
        style={{ fontSize: 15, color: "var(--fg-muted)", fontFamily: "var(--font-monument)" }}
      >
        Design, build, polish, and stay in sync. Nothing gets lost in the handoff.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        <Row
          left={<DesignMock />}
          right={<MobileMock />}
          descriptions={[
            { title: "Design", text: "Designing with top notch attention to detail for every pixel." },
            { title: "Development", text: "Development with the latest stack and tools, performance optimized and scalable." },
          ]}
        />
        <Row
          left={<MicrointeractionMock />}
          right={<CommunicationMock />}
          descriptions={[
            { title: "Microinteractions", text: "Microinteractions that feel intentional and makes your webpage unique." },
            { title: "Communication", text: "Communication with clear and concise channel, regular updates." },
          ]}
        />
      </div>
    </section>
  );
}
