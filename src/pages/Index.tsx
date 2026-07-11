import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, Calendar, Mail, MapPin, Users, FileText, Receipt, MessageSquare, CheckCircle, Kanban, ShieldCheck } from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import IndustryResults from "@/components/IndustryResults";
import BusinessAssessment from "@/components/BusinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import StepByStepGuide from "@/components/StepByStepGuide";
import Footer from "@/components/Footer";
import { defaultSEOConfig, getOrganizationSchema, getSoftwareApplicationSchema } from "@/utils/seo";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'features-overview') {
      setTimeout(() => {
        const element = document.getElementById('features-overview');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [searchParams]);
  
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
          <FeaturesOverview />

          {/* Solutions strip */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Our Solutions</p>
                  <h2 className="text-3xl font-heading font-bold text-foreground">Ten products, one platform</h2>
                </div>
                <Link
                  to="/solutions"
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  See all solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "In-Sync CRM", tagline: "Sales pipeline & campaigns", icon: Kanban, color: "text-teal-700", bg: "bg-teal-500/10", href: "/products/crm" },
                  { name: "Vendor Verification", tagline: "Financial due diligence", icon: ShieldCheck, color: "text-sky-700", bg: "bg-sky-500/10", href: "/products/vendor-verification" },
                  { name: "EventSync", tagline: "Event management", icon: Calendar, color: "text-teal-600", bg: "bg-teal-500/10", href: "/products/eventsync" },
                  { name: "Field-Sync", tagline: "Field force tracking", icon: MapPin, color: "text-green-600", bg: "bg-green-500/10", href: "/products/field-sync" },
                  { name: "WhatsApp Campaigns", tagline: "Bulk messaging", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-500/10", href: "/products/whatsapp-campaigns" },
                  { name: "Email Broadcast", tagline: "Campaign analytics", icon: Mail, color: "text-blue-600", bg: "bg-blue-500/10", href: "/products/email-broadcast" },
                  { name: "In-Sync ATS", tagline: "Recruitment pipeline", icon: Users, color: "text-violet-600", bg: "bg-violet-500/10", href: "/products/ats" },
                  { name: "Paisaa Saarthi", tagline: "Loan origination", icon: FileText, color: "text-amber-600", bg: "bg-amber-500/10", href: "/products/paisaa-saarthi" },
                  { name: "Expense Claims", tagline: "Approval workflows", icon: Receipt, color: "text-rose-600", bg: "bg-rose-500/10", href: "/products/expense" },
                  { name: "Work-Sync", tagline: "Task accountability", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-500/10", href: "/products/worksync" },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.href}
                      to={p.href}
                      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 hover:shadow-md hover:border-primary/20 transition-all duration-200"
                    >
                      <div className={`w-9 h-9 rounded-lg ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${p.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link to="/solutions" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  See all solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <IndustryResults />
          
          <section className="py-20 bg-background" id="features-overview">
            <div className="container mx-auto px-4">
              <ROICalculator />
            </div>
          </section>
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <BusinessAssessment />
            </div>
          </section>
          
          <CRMShowcase />
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <TestimonialsShowcase />
            </div>
          </section>
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <StepByStepGuide />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
