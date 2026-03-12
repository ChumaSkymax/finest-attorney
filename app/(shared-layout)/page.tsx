import CTA from "@/components/web/CTA";
import Hero from "@/components/web/Hero";
import PracticeAreasOverview from "@/components/web/PracticeAreasOverview";
import TrustIndicators from "@/components/web/TrustIndicators";
import WhyChooseUs from "@/components/web/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustIndicators />
      <PracticeAreasOverview />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}
