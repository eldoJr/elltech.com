import Sectionheader from "@/components/molecules/sectionheader";
import Aiexperts from "@/components/molecules/aiexperts";
import Projects from "@/components/molecules/projects";
import Nextsteps from "@/components/molecules/nextsteps";
import Faq from "@/components/molecules/faq";

export default function Data() {
  return (
    <section id="data-ai-services" className="relative">
      <Sectionheader
        meta={["Data & AI Services", "Intelligent Systems"]}
        title={"Data &\nAI Services"}
        description={"Elltech builds data pipelines, machine learning systems, and AI-powered products that turn raw information into strategic advantage at scale."}
        stats={[]}
      />
      <Aiexperts />
      <Projects />
      <Nextsteps />
      <Faq />
    </section>
  );
}
