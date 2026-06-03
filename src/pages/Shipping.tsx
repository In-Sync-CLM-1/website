import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Truck } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY } from "@/lib/company";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shipping &amp; Delivery Policy - In-Sync</title>
        <meta name="description" content={`Shipping and delivery policy for In-Sync. In-Sync is a digital service operated by ${COMPANY.legalName}; no physical goods are shipped.`} />
      </Helmet>

      <main>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Truck className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">Shipping &amp; Delivery Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                In-Sync is a digital service. This policy explains how access is delivered.
              </p>
              <p className="text-sm text-muted-foreground mt-3">Last updated: 3 June 2026</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">1. Digital Delivery Only</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In-Sync, operated by {COMPANY.legalName}, provides cloud-based software and services.
                    We do <strong>not</strong> sell or ship any physical products. Accordingly, no
                    physical shipping, courier, or delivery of goods is involved, and no shipping
                    charges apply.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">2. How &amp; When Access Is Delivered</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Access to the Services is delivered electronically.</li>
                    <li>• On successful registration and/or payment, your account and subscription are activated immediately, typically within a few minutes.</li>
                    <li>• Access credentials, confirmations, and invoices are sent to the email address registered with your account.</li>
                    <li>• In rare cases where activation is delayed, please contact us and we will resolve it promptly.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Service Availability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Services are accessible online over the internet, 24x7, subject to scheduled
                    maintenance and circumstances beyond our reasonable control. There are no
                    geographic shipping restrictions; the Services can be accessed wherever permitted by law.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Contact</h2>
                  <p className="text-muted-foreground mb-4">For any question about activation or delivery of access, contact us at:</p>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="space-y-1 text-muted-foreground">
                      <p><strong>{COMPANY.legalName}</strong></p>
                      <p>{COMPANY.address.line1}, {COMPANY.address.line2}</p>
                      <p>{COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.pin}, {COMPANY.address.country}</p>
                      <p>📧 <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
                      <p>📞 <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{COMPANY.phone}</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
