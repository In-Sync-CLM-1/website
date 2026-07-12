import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { defaultSEOConfig } from "@/utils/seo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CostCalculator from "@/components/CostCalculator";
import DemoRequestModal from "@/components/DemoRequestModal";
import { ALL_PRODUCTS } from "@/lib/products";
import {
  Check,
  Star,
  Zap,
  Phone,
  MessageSquare,
  ArrowRight,
  Shield,
  Clock,
  Globe,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import Footer from "@/components/Footer";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

/* Pricing model per product; CRM has published plans below, the rest are quoted per deployment */
const productPricing: Record<string, string> = {
  "WhatsApp Campaigns": "Platform fee + per-message rates",
  "Email Broadcast": "Platform fee + per-email rates",
  "EventSync": "Priced per event & attendee volume",
  "Field-Sync": "Priced per field user",
  "Work-Sync": "Priced per user",
  "Expense Claims": "Priced per user",
  "Vendor Verification": "Priced per verification volume",
  "In-Sync ATS": "Priced per recruiter seat",
  "Paisaa Saarthi": "Priced per branch & application volume",
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [showCalculator, setShowCalculator] = useState(false);

  const crmPlans = [
    {
      name: "Standard",
      price: { monthly: 500, annual: 5500 }, // ₹500/user/month, 11 months for annual (1 month free)
      description: "Pay per user, scale as you grow",
      badge: "15 Days Free Trial",
      badgeColor: "bg-primary",
      minUsers: 10,
      features: [
        "₹500 per user per month",
        "Minimum 10 users (Monthly billing)",
        "Quarterly billing for less than 10 users",
        "Complete CRM & Contact Management",
        "Campaign Automation & Marketing",
        "WhatsApp, SMS & Email integration",
        "Support Ticket Management",
        "Workflow Journeys & Automation",
        "Mobile app with offline sync",
        "Custom BI Dashboards & Reports",
        "Priority support",
        "Advanced analytics"
      ],
      cta: "Start 15 Days Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: { monthly: null, annual: null },
      description: "Custom solutions for large organizations",
      badge: "Custom Pricing",
      badgeColor: "bg-purple-500",
      features: [
        "Everything in Standard Plan",
        "Custom development",
        "On-premise deployment options",
        "SLA guarantees",
        "24/7 dedicated support",
        "Custom training & onboarding",
        "Multi-tenant architecture",
        "Dedicated account manager",
        "Volume discounts available"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const communicationWallet = {
    initialAmount: 10000,
    rates: [
      { service: "WhatsApp", rate: 0.93, unit: "per message", icon: MessageSquare },
      { service: "Email", rate: 0.10, unit: "per message", icon: MessageSquare },
      { service: "SMS", rate: 0.12, unit: "per message", icon: MessageSquare },
      { service: "Calling", rate: 1.00, unit: "per minute", icon: Phone }
    ]
  };

  const oneTimeServices = [
    { name: "Setup Fee", price: 15000, description: "One-time platform setup and configuration" },
    { name: "Customization", price: 6000, description: "Per day of custom development", unit: "per day" },
    { name: "Custom API Integration", price: 25000, description: "Per API integration", unit: "per API" }
  ];

  const otherProducts = ALL_PRODUCTS.filter((p) => p.name !== "In-Sync CRM");

  return (
    <>
      <SEOHelmet config={defaultSEOConfig.pricing} />

      <div className="min-h-screen bg-background">
        <Breadcrumbs items={[{ name: 'Pricing', url: '/pricing' }]} />

        {/* Hero Section */}
        <section
          className="relative overflow-hidden text-white py-20 px-4"
          style={{ background: "linear-gradient(118deg, #0f172a 0%, #134e4a 42%, #0d9488 78%, #7c3aed 130%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-40 right-[10%] w-[560px] h-[560px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(45,212,191,0.45), transparent 70%)", filter: "blur(85px)" }}
            />
            <div
              className="absolute -bottom-32 left-[5%] w-[480px] h-[480px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)", filter: "blur(75px)" }}
            />
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-teal-300" />
              Transparent, product-wise pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Different products.
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                Priced for what they do.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Every In-Sync product is priced for its own job — per user, per event, per verification.
              Pay for what you use, add products as you grow.
            </p>
          </div>
        </section>

        {/* Flagship CRM Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">The Flagship</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">In-Sync CRM</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pipeline, campaigns, calling, and AI lead scoring. Simple per-user pricing with a free trial.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center mt-6">
                <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")} className="w-auto">
                  <TabsList className="grid w-fit grid-cols-2 bg-muted">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual" className="relative">
                      Annual
                      <Badge variant="secondary" className="ml-2 text-xs">1 Month Free</Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
              {crmPlans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl md:scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={plan.badgeColor}>
                      {plan.popular && <Star className="w-3 h-3 mr-1" />}
                      {plan.badge}
                    </Badge>
                  </div>

                  <CardHeader className="text-center pb-4 pt-6">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-sm mb-2">{plan.description}</CardDescription>

                    <div className="mt-4">
                      {plan.price.monthly !== null ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold text-foreground">
                              ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              /user/{billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                          </div>
                          {billingCycle === 'annual' && (
                            <div className="text-sm text-primary font-semibold mt-2">
                              1 Month Free with Annual Billing
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-2">
                            Minimum {plan.minUsers} users for monthly billing
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-bold text-primary">
                          Custom Pricing
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <DemoRequestModal trigger={
                      <Button
                        variant={plan.popular ? 'default' : 'outline'}
                        className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'border-primary/30 text-primary hover:bg-primary/5'}`}
                        size="lg"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    } />
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Cost Calculator Toggle */}
            <div className="text-center">
              <Collapsible open={showCalculator} onOpenChange={setShowCalculator}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-primary/5 hover:bg-primary/10 border-primary/20"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Your Exact Costs
                    {showCalculator ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-8">
                  <div className="bg-muted/30 rounded-lg p-6 text-left">
                    <CostCalculator />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Per-Product Pricing */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">The Rest of the Platform</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Nine more products, each priced for its job
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Events, field force, verification, recruitment — each product is quoted on the unit
                that matters for it. Tell us your volumes and we'll price it the same day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => {
                const Icon = p.icon;
                return (
                  <Card key={p.href} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardHeader>
                      <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`h-5 w-5 ${p.color}`} />
                      </div>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      <CardDescription className="text-sm">{p.tagline}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="text-sm font-semibold text-foreground">{productPricing[p.name]}</div>
                      <div className="text-xs text-muted-foreground mt-1">Custom quote, based on your volumes</div>
                    </CardContent>
                    <CardFooter className="flex items-center gap-3">
                      <DemoRequestModal trigger={
                        <Button size="sm" className="flex-1">
                          Request a Quote
                        </Button>
                      } />
                      <Link
                        to={p.href}
                        className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
                      >
                        Learn more
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Communication Wallet */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Communication Wallet 💬
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                One prepaid wallet powers WhatsApp, email, SMS, and calling across your In-Sync products.
                Start with ₹10,000 and top up anytime.
              </p>
              <Badge variant="secondary" className="text-lg px-6 py-3">
                ₹{communicationWallet.initialAmount.toLocaleString()} Initial Wallet Balance
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {communicationWallet.rates.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.service}</CardTitle>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary">₹{item.rate.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.unit}</div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">How the Communication Wallet Works</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Start with ₹10,000 prepaid balance included in your setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>All communication charges (WhatsApp, Email, SMS, Calling) deducted from wallet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Easy top-up anytime to keep your communications flowing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Real-time balance tracking and usage reports</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* One-time Services */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Setup & Professional Services 🛠️
              </h2>
              <p className="text-muted-foreground">
                One-time fees to get you up and running smoothly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {oneTimeServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.description}</div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-full justify-center">
                      {service.name === "Setup Fee" ? "Custom amount" : `₹${service.price.toLocaleString()} ${service.unit || 'one-time'}`}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Bank-grade security with SOC2 compliance</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock assistance when you need it</p>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">99.9% Uptime</h3>
                <p className="text-sm text-muted-foreground">Reliable service with guaranteed availability</p>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to transform your business?
              </h2>
              <p className="text-muted-foreground mb-6">
                Growing businesses across India run on In-Sync. Tell us what you need — we'll price it the same day.
              </p>
              <DemoRequestModal trigger={
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request Demo & Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              } />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
