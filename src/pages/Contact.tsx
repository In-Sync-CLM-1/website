import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY } from "@/lib/company";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - In-Sync</title>
        <meta name="description" content={`Contact ${COMPANY.legalName}, the company that operates the In-Sync platform.`} />
      </Helmet>

      <main>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Mail className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">Contact Us</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                We'd love to hear from you. Reach the In-Sync team using the details below.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">

              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Registered Entity</h3>
                      <p className="text-muted-foreground">{COMPANY.legalName}</p>
                      <p className="text-sm text-muted-foreground">CIN: {COMPANY.cin} &nbsp;|&nbsp; GSTIN: {COMPANY.gstin}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Registered Office</h3>
                      <p className="text-muted-foreground">{COMPANY.address.line1}</p>
                      <p className="text-muted-foreground">{COMPANY.address.line2}</p>
                      <p className="text-muted-foreground">{COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.pin}, {COMPANY.address.country}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{COMPANY.phone}</a>
                      <p className="text-sm text-muted-foreground">{COMPANY.contactPerson}, Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground text-center">
                Our support team typically responds within one business day.
              </p>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
