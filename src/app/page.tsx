import { Hero } from "@/components/hero/hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { FeatureShowcase } from "@/components/sections/feature-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <FeatureShowcase />
      <HowItWorks />
      <ProductShowcase />
      <CTA />
    </main>
  );
}
