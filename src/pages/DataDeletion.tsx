import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Trash2, Mail } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY } from "@/lib/company";

const DataDeletion = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Data Deletion Instructions - In-Sync</title>
        <meta name="description" content={`How to request deletion of your personal data from ${COMPANY.brandName} apps and services.`} />
        <meta name="keywords" content="data deletion, delete my data, account deletion, In-Sync, Prosync AI Solutions" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trash2 className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Data Deletion Instructions
                </h1>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                <span>Last updated: 13 July 2026</span>
              </div>
              <p className="text-xl text-muted-foreground">
                You can request deletion of your personal data from any {COMPANY.brandName} app or service at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">

              {/* How to request */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">How to Request Deletion</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To request that we delete your personal data, send an email to{" "}
                    <a href={`mailto:${COMPANY.email}?subject=Data%20Deletion%20Request`} className="text-primary hover:underline">
                      {COMPANY.email}
                    </a>{" "}
                    with the subject line <strong>"Data Deletion Request"</strong> from the email address or phone number registered on your account, and include:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• The name of the {COMPANY.brandName} app or product you used (e.g. globalcrm, Work-Sync, Field-Sync, Vendor Verification, ATS, Expense, Event-Sync, Email Broadcast, WhatsApp Campaigns).</li>
                    <li>• Your registered email address and/or phone number.</li>
                    <li>• Your organisation/company name, if applicable.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    We will verify your identity, confirm the request by email, and permanently delete your
                    personal data — including account details, contact information, and associated records —
                    from our production systems and backups within <strong>30 days</strong>, except where we
                    are required to retain certain records (e.g. billing/invoice data) to comply with Indian
                    tax, accounting, or other legal obligations.
                  </p>
                </CardContent>
              </Card>

              {/* What gets deleted */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">What Is Deleted</h2>
                  <p className="text-muted-foreground mb-4">
                    Once your request is verified, we delete or anonymise:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Your account profile (name, email, phone, login credentials).</li>
                    <li>• Data you submitted through the app or platform (e.g. leads, contacts, messages, documents you uploaded).</li>
                    <li>• Any data received from connected third-party integrations (e.g. WhatsApp, telephony, or CRM connectors) tied to your account.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Records we are legally required to retain — such as tax invoices, payment records, and
                    statutory filings — are retained only as long as required by law and are not used for any
                    other purpose.
                  </p>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    For any questions about this process or the status of your request, reach us at:
                  </p>
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

        {/* Trust Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">We Respond to Every Request</h2>
              <p className="text-muted-foreground mb-6">
                Every deletion request is acknowledged and actioned by our team — no automated dead ends.
              </p>
              <p className="text-sm text-muted-foreground">
                See our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for more on how we handle your data.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DataDeletion;
