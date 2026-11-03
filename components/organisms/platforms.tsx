import Statement from "@/components/molecules/statement";
import Ticker from "@/components/molecules/ticker";
import Features from "@/components/molecules/features";
import Sectionheader from "@/components/molecules/sectionheader";

export default function Platforms() {
  return (
    <section id="enterprise-platforms" className="relative">
      <Sectionheader
        meta={["Enterprise Platforms", "Scalable Infrastructure"]}
        title={"Enterprise\nPlatforms"}
        description={"Elltech designs and delivers enterprise-grade platforms built for scale, reliability, and long-term growth across complex digital ecosystems."}
        stats={[
          { label: "Uptime", value: "99.99%" },
          { label: "Deployments", value: "500+" },
        ]}
      />
      <Statement />
      <Ticker />
      <Features />
    </section>
  );
}
