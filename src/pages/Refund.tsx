import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { RefreshCcw } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { COMPANY } from "@/lib/company";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cancellation &amp; Refund Policy - In-Sync</title>
        <meta name="description" content={`Cancellation and refund policy for In-Sync subscriptions, operated by ${COMPANY.legalName}.`} />
      </Helmet>

      <main>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <RefreshCcw className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">Cancellation &amp; Refund Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                How cancellations and refunds work for In-Sync subscriptions, operated by {COMPANY.legalName}.
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
                  <h2 className="text-2xl font-bold text-primary mb-4">1. Nature of the Service</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In-Sync is a cloud-based software-as-a-service (SaaS) platform. We offer subscription
                    plans and, in some products, prepaid usage credits (for example, for AI calls or
                    messaging). This policy explains when and how you may cancel and when refunds apply.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">2. Free Trial</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Where a free trial is offered, you may evaluate the Services during the trial period
                    at no charge. You will only be billed if you choose to subscribe to a paid plan. We
                    encourage you to use the trial to confirm the Services meet your needs before paying.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Cancellation</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• You may cancel your subscription at any time from your account settings or by writing to us at <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.</li>
                    <li>• On cancellation, your plan remains active until the end of the current billing period, after which it will not renew. You will continue to have access until then.</li>
                    <li>• Cancellation stops future renewals; it does not, by itself, trigger a refund of fees already paid for the current period.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Refunds</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Subscription fees are generally non-refundable once the billing period has begun, as access to the Services is provided immediately.</li>
                    <li>• If you were charged in error, charged twice, or were unable to access the Services due to a verified fault on our side, you are entitled to a refund of the affected amount.</li>
                    <li>• Prepaid usage credits that remain unused and unexpired may be refunded, less any non-recoverable third-party costs and applicable taxes, at our reasonable discretion.</li>
                    <li>• To request a refund, email <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a> with your account details and reason within 7 days of the charge.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Refund Processing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Approved refunds are processed to the original payment method through our payment
                    partner, {COMPANY.paymentProcessor} ("Razorpay"), within 5–7 business days of approval.
                    The time for the amount to reflect in your account depends on your bank or card issuer.
                    Taxes already remitted to government authorities (e.g., GST) may not be refundable.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Contact</h2>
                  <p className="text-muted-foreground mb-4">For any cancellation or refund request, contact us at:</p>
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

export default Refund;
