import Image from "next/image";
import Sectionheader from "@/components/molecules/sectionheader";
import Timeline from "@/components/molecules/timeline";
import Services from "@/components/molecules/services";

export default function Engineering() {
  return (
    <section id="digital-engineering" className="relative">
      <Sectionheader
        meta={["elltech.com", "Digital Engineering", "Systems & Infrastructure"]}
        title={"Digital\nEngineering"}
        icons={
          <>
            <span className="border border-black/25 w-9 h-9 flex items-center justify-center">
              <i className="bi bi-hdd-stack text-sm text-fg-primary" />
            </span>
            <span className="border border-black/25 rounded-full w-9 h-9 flex items-center justify-center">
              <i className="bi bi-bezier2 text-sm text-fg-primary" />
            </span>
            <span className="border border-black/25 rounded-full w-9 h-9 flex items-center justify-center">
              <i className="bi bi-reception-4 text-sm text-fg-primary" />
            </span>
          </>
        }
        logo={
          <Image
            src="/logo.svg"
            alt="Elltech"
            width={10}
            height={20}
            className="h-24 w-auto"
            style={{ height: "6rem", width: "auto" }}
          />
        }
        description="Elltech architects resilient digital systems built for scale. From distributed infrastructure to real-time data pipelines, we engineer the foundations that modern enterprises depend on."
        accordion={[
          {
            heading: "Distributed Systems Architecture",
            body: "We design fault-tolerant, horizontally scalable architectures that eliminate single points of failure. Our systems sustain high availability under variable load through intelligent partitioning, replication strategies, and consensus protocols.",
          },
          {
            heading: "Cloud Infrastructure & Platform Engineering",
            body: "From multi-region deployments to infrastructure-as-code pipelines, we build cloud environments that are reproducible, auditable, and cost-efficient. We work across AWS, GCP, and Azure with a strong preference for platform-agnostic abstractions.",
          },
          {
            heading: "Observability & Site Reliability",
            body: "Operational excellence requires full-stack visibility. We instrument systems with structured logging, distributed tracing, and metric-driven alerting — enabling rapid incident response and continuous performance optimisation.",
          },
          {
            heading: "API Design & Integration Engineering",
            body: "We architect clean, versioned APIs and integration layers that connect disparate systems without coupling. Whether REST, GraphQL, or event-driven, our interfaces are designed for longevity and developer experience.",
          },
        ]}
        stats={[]}
      />
      <Services />
      <Timeline />
    </section>
  );
}
