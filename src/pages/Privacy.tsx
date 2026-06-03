import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Shield, Lock } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY } from "@/lib/company";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - In-Sync</title>
        <meta name="description" content={`How ${COMPANY.legalName} collects, uses, and protects your personal information on the In-Sync platform.`} />
        <meta name="keywords" content="privacy policy, data protection, personal information, In-Sync, Prosync AI Solutions" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Privacy Policy
                </h1>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                <span>Last updated: 3 June 2026</span>
              </div>
              <p className="text-xl text-muted-foreground">
                {COMPANY.legalName} values your privacy and is committed to protecting your personal information.
              </p>
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
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {COMPANY.legalName} ("In-Sync," "we," "our," or "us") operates the In-Sync platform
                    and values your privacy. This Privacy Policy explains how we collect, use, store, and
                    share information when you use our platform, apps, websites, and related services
                    (collectively, the "Services"), in accordance with applicable Indian law including the
                    Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue using our Services.
                  </p>
                </CardContent>
              </Card>

              {/* Section 1 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">1. Information We Collect</h2>
                  <p className="text-muted-foreground mb-6">We collect the following categories of information:</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">a) Information You Provide</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li><strong>Account Information:</strong> Name, phone number, email address, company details, and other registration details.</li>
                        <li><strong>Communications:</strong> Messages, calls, emails, or other content shared via our Services.</li>
                        <li><strong>Billing Information:</strong> Billing name, address, GSTIN (if any), and payment confirmation. Card and bank details are entered directly with our payment partner and are not stored by us.</li>
                        <li><strong>Support Requests:</strong> Information you provide when you contact customer support.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">b) Information We Automatically Collect</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li><strong>Device Information:</strong> Device model, operating system, unique device identifiers.</li>
                        <li><strong>Usage Data:</strong> Log data such as IP address, browser type, app usage statistics, and crash reports.</li>
                        <li><strong>Location Information:</strong> Approximate location based on IP or device settings (if enabled).</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">c) Information from Third Parties</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li><strong>Integrations:</strong> If you connect third-party platforms (e.g., cloud backup, CRM, email, or telephony services), we may receive limited information as permitted by those providers.</li>
                        <li><strong>Payment Partner:</strong> We receive payment status and reference details from {COMPANY.paymentProcessor} ("Razorpay") to confirm your transactions.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">2. How We Use Information</h2>
                  <p className="text-muted-foreground mb-4">We use your information to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide, operate, and improve our Services.</li>
                    <li>• Authenticate users and manage accounts and subscriptions.</li>
                    <li>• Process payments, issue invoices, and prevent fraud.</li>
                    <li>• Deliver and personalize communications and support.</li>
                    <li>• Ensure security, detect abuse, and comply with legal obligations.</li>
                    <li>• Send service-related announcements and, where permitted, marketing.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 3 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Sharing of Information</h2>
                  <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share it in the following circumstances:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>With Service Providers:</strong> Vendors that help us operate (e.g., cloud hosting, SMS/email providers, and our payment partner Razorpay).</li>
                    <li><strong>With Business Partners:</strong> Where you use integrated features (e.g., CRM or telephony).</li>
                    <li><strong>For Legal Compliance:</strong> When required by law, regulation, or valid legal process.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 4 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your data as long as necessary to provide the Services, comply with legal
                    and tax obligations, resolve disputes, and enforce our agreements. When data is no
                    longer required, it is securely deleted or anonymised.
                  </p>
                </CardContent>
              </Card>

              {/* Section 5 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">
                    Subject to applicable law, you may have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• Access, correct, or update your data.</li>
                    <li>• Delete your account and associated data.</li>
                    <li>• Restrict or object to processing of your data.</li>
                    <li>• Port your data to another provider.</li>
                    <li>• Withdraw consent where processing is based on consent.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Requests can be made by contacting us at <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.
                  </p>
                </CardContent>
              </Card>

              {/* Section 6 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use industry-standard measures (encryption, firewalls, access controls) to safeguard your information. However, no method of transmission or storage is 100% secure.
                  </p>
                </CardContent>
              </Card>

              {/* Section 7 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Services are not directed at children under 18. We do not knowingly collect data from minors. If you believe a minor has provided data, please contact us for deletion.
                  </p>
                </CardContent>
              </Card>

              {/* Section 8 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">8. Changes to this Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last updated" date. Significant changes will be communicated where required.
                  </p>
                </CardContent>
              </Card>

              {/* Section 9 - Contact */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have questions or concerns about this Privacy Policy or your data, please contact us at:
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
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Your Trust Matters</h2>
              <p className="text-muted-foreground mb-6">
                We're committed to maintaining the highest standards of data protection and privacy for all our users.
              </p>
              <p className="text-sm text-muted-foreground">
                This privacy policy reflects our ongoing commitment to transparency and data security.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
