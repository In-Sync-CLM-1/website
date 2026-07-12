import SEOHelmet from "@/components/SEOHelmet";
import HeroSection from "@/components/HeroSection";
import PlatformPillars from "@/components/PlatformPillars";
import WhyInSync from "@/components/WhyInSync";
import IndustryResults from "@/components/IndustryResults";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import Footer from "@/components/Footer";
import { defaultSEOConfig, getOrganizationSchema, getSoftwareApplicationSchema } from "@/utils/seo";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getSoftwareApplicationSchema()
    ]
  };

  return (
    <>
      <SEOHelmet
        config={{
          ...defaultSEOConfig.home,
          structuredData
        }}
      />

      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />
          <PlatformPillars />
          <WhyInSync />
          <IndustryResults />
          <CRMShowcase />

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <TestimonialsShowcase />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
