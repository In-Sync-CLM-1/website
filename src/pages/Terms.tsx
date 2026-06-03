import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { FileText, Scale } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY, COMPANY_ADDRESS_ONELINE } from "@/lib/company";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms & Conditions - In-Sync</title>
        <meta name="description" content={`Terms & Conditions for the In-Sync platform, operated by ${COMPANY.legalName}.`} />
        <meta name="keywords" content="terms and conditions, terms of service, legal agreement, In-Sync, Prosync AI Solutions" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Terms &amp; Conditions
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                The In-Sync platform is owned and operated by {COMPANY.legalName}.
              </p>
              <p className="text-sm text-muted-foreground mt-3">Last updated: 3 June 2026</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">

              {/* Introduction */}
              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms &amp; Conditions ("Terms") govern your access to and use of the
                    websites, applications, software, and services offered under the "In-Sync" brand
                    (collectively, the "Services"). The Services are owned and operated by{" "}
                    <strong>{COMPANY.legalName}</strong> ("In-Sync," "Company," "we," "our," or "us"),
                    a company incorporated in India (CIN {COMPANY.cin}) with its registered office at{" "}
                    {COMPANY_ADDRESS_ONELINE}. By accessing, registering for, subscribing to, or using
                    the Services, you agree to be bound by these Terms. If you do not agree, please do
                    not use the Services.
                  </p>
                </CardContent>
              </Card>

              {/* 1. Eligibility & Accounts */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">1. Eligibility &amp; Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You must be at least 18 years of age and capable of forming a binding contract to
                    use the Services. When you create an account, you agree to provide accurate and
                    complete information and to keep it up to date. You are responsible for maintaining
                    the confidentiality of your login credentials and for all activity that occurs under
                    your account.
                  </p>
                </CardContent>
              </Card>

              {/* 2. Services & Subscriptions */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">2. Services &amp; Subscriptions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In-Sync provides cloud-based business software, including customer relationship
                    management (CRM), communication, and workflow automation tools, on a
                    subscription basis. The specific features, usage limits, and price applicable to you
                    are those shown at the point of purchase or in your subscription plan. We may add,
                    modify, or discontinue features from time to time to improve the Services.
                  </p>
                </CardContent>
              </Card>

              {/* 3. Fees, Billing & Payments */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Fees, Billing &amp; Payments</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Subscription fees and applicable usage charges are billed in advance and are stated exclusive of taxes unless specified otherwise. Goods and Services Tax (GST) is added where applicable.</li>
                    <li>• Online payments are processed through our payment partner, {COMPANY.paymentProcessor} ("Razorpay"). By making a payment, you also agree to Razorpay's terms and policies. We do not store your full card or banking credentials.</li>
                    <li>• Subscriptions renew for successive terms unless cancelled before the renewal date. You authorise us (and our payment partner) to charge the applicable fees for each renewal term.</li>
                    <li>• Failure to pay may result in suspension or termination of access to the Services.</li>
                    <li>• Cancellations and refunds are governed by our <a href="/refund" className="text-primary hover:underline">Cancellation &amp; Refund Policy</a>.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 4. Acceptable Use */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use the Services to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Violate any applicable law, regulation, or third-party right;</li>
                    <li>• Send unlawful, fraudulent, defamatory, obscene, or unsolicited bulk communications (spam);</li>
                    <li>• Upload malware or attempt to gain unauthorised access to our systems or other users' data;</li>
                    <li>• Reverse engineer, resell, or sublicense the Services except as expressly permitted;</li>
                    <li>• Use the Services in any manner that could damage, disable, or impair them.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 5. Intellectual Property */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All software, content, trademarks, logos, and materials comprising the Services are
                    owned by {COMPANY.legalName} or its licensors. We grant you a limited, non-exclusive,
                    non-transferable, revocable licence to use the Services for your internal business
                    purposes during your subscription. You retain ownership of the data you upload ("Your
                    Data"); you grant us a licence to process Your Data solely to provide the Services.
                  </p>
                </CardContent>
              </Card>

              {/* 6. Disclaimers & Limitation of Liability */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Disclaimers &amp; Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Services are provided on an "as is" and "as available" basis without warranties
                    of any kind, whether express or implied. To the maximum extent permitted by law, our
                    total aggregate liability arising out of or relating to the Services shall not exceed
                    the amount paid by you to us for the Services in the twelve (12) months preceding the
                    event giving rise to the claim. We shall not be liable for any indirect, incidental,
                    or consequential damages.
                  </p>
                </CardContent>
              </Card>

              {/* 7. Indemnification */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify and hold harmless {COMPANY.legalName}, its directors,
                    employees, and partners from any claims, losses, or expenses arising out of your
                    use of the Services, Your Data, or your breach of these Terms.
                  </p>
                </CardContent>
              </Card>

              {/* 8. Term & Termination */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">8. Term &amp; Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms remain in effect while you use the Services. You may stop using the
                    Services at any time. We may suspend or terminate your access if you breach these
                    Terms, fail to pay applicable fees, or use the Services in a manner that may cause
                    harm or legal liability. On termination, your right to use the Services ceases; you
                    may request export of Your Data within 30 days, after which it may be deleted.
                  </p>
                </CardContent>
              </Card>

              {/* 9. Governing Law & Jurisdiction */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">9. Governing Law &amp; Jurisdiction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms are governed by the laws of India. Any dispute arising out of or in
                    connection with these Terms or the Services shall be subject to the exclusive
                    jurisdiction of the competent courts at {COMPANY.jurisdiction}.
                  </p>
                </CardContent>
              </Card>

              {/* 10. Changes & Contact */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">10. Changes &amp; Contact</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may update these Terms from time to time. Material changes will be posted on this
                    page with a revised "Last updated" date. Continued use of the Services after changes
                    take effect constitutes acceptance of the revised Terms. For any questions, contact us at:
                  </p>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="space-y-1 text-muted-foreground">
                      <p><strong>{COMPANY.legalName}</strong></p>
                      <p>{COMPANY.address.line1}, {COMPANY.address.line2}</p>
                      <p>{COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.pin}, {COMPANY.address.country}</p>
                      <p>CIN: {COMPANY.cin} &nbsp;|&nbsp; GSTIN: {COMPANY.gstin}</p>
                      <p>📧 <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
                      <p>📞 <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{COMPANY.phone}</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Legal Notice Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Legal Agreement</h2>
              <p className="text-muted-foreground mb-6">
                By using In-Sync services, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
              </p>
              <p className="text-sm text-muted-foreground">
                These Terms constitute a legally binding agreement between you and {COMPANY.legalName}.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
