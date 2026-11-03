import Sectionheader from "@/components/molecules/sectionheader";

export default function Data() {
  return (
    <section id="data-ai-services" className="relative">
      <Sectionheader
        meta={["Data & AI Services", "Intelligent Systems"]}
        title={"Data &\nAI Services"}
        description={"Elltech builds data pipelines, machine learning systems, and AI-powered products that turn raw information into strategic advantage at scale."}
        stats={[
          { label: "Models Deployed", value: "120+" },
          { label: "Data Processed", value: "10TB+" },
        ]}
      />
    </section>
  );
}
