import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "@/components/Header";
import Index from "./pages/Index";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import Integrations from "./pages/Integrations";
import Industries from "./pages/Industries";
import FAQ from "./pages/FAQ";
import Healthcare from "./pages/industries/Healthcare";
import FinancialServices from "./pages/industries/FinancialServices";
import Manufacturing from "./pages/industries/Manufacturing";
import RealEstate from "./pages/industries/RealEstate";
import TechnologySaaS from "./pages/industries/TechnologySaaS";
import ProfessionalServices from "./pages/industries/ProfessionalServices";
import Education from "./pages/industries/Education";
import RetailEcommerce from "./pages/industries/RetailEcommerce";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Partnership from "./pages/Partnership";
import BlogPost from "./pages/BlogPost";
import Cookies from "./pages/Cookies";
import Privacy from "./pages/Privacy";
import DataDeletion from "./pages/DataDeletion";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EventSyncPage from "./pages/products/EventSync";
import EmailBroadcastPage from "./pages/products/EmailBroadcast";
import FieldSyncPage from "./pages/products/FieldSync";
import ATSPage from "./pages/products/ATS";
import PaisaaSaarthiPage from "./pages/products/PaisaaSaarthi";
import ExpensePage from "./pages/products/Expense";
import WhatsAppCampaignsPage from "./pages/products/WhatsAppCampaigns";
import WorkSyncPage from "./pages/products/WorkSync";
import GlobalCRMPage from "./pages/products/GlobalCRM";
import VendorVerificationPage from "./pages/products/VendorVerification";
import Solutions from "./pages/Solutions";
import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isProductPage = pathname.startsWith('/products/');
  return (
    <>
      {!isProductPage && <Header />}
      {children}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <SiteShell>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/industries/healthcare-life-sciences" element={<Healthcare />} />
          <Route path="/industries/financial-services" element={<FinancialServices />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/real-estate" element={<RealEstate />} />
          <Route path="/industries/technology-saas" element={<TechnologySaaS />} />
          <Route path="/industries/professional-services" element={<ProfessionalServices />} />
          <Route path="/industries/education" element={<Education />} />
          <Route path="/industries/retail-ecommerce" element={<RetailEcommerce />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/products/eventsync" element={<EventSyncPage />} />
          <Route path="/products/email-broadcast" element={<EmailBroadcastPage />} />
          <Route path="/products/field-sync" element={<FieldSyncPage />} />
          <Route path="/products/ats" element={<ATSPage />} />
          <Route path="/products/paisaa-saarthi" element={<PaisaaSaarthiPage />} />
          <Route path="/products/expense" element={<ExpensePage />} />
          <Route path="/products/whatsapp-campaigns" element={<WhatsAppCampaignsPage />} />
          <Route path="/products/worksync" element={<WorkSyncPage />} />
          <Route path="/products/crm" element={<GlobalCRMPage />} />
          <Route path="/products/vendor-verification" element={<VendorVerificationPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </SiteShell>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
