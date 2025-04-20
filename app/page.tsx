import {
  HeroSection,
  DemoSection,
  HowItWorksSection,
  Pricing,
  CTASection,
} from "@/components/home";
import { BgGradient } from "@/components/common";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />

      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <Pricing />
        <CTASection />
      </div>
    </div>
  );
}
