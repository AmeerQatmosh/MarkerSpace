import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background text-foreground transition-colors duration-300">
      <Card className="w-full max-w-4xl p-8 md:p-12 rounded-2xl shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-left text-lg">
          <p>
            At <strong>MarkerSpace</strong>, your privacy is important to us. This
            Privacy Policy explains how we collect, use, and protect your
            information when you use our platform.
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Personal information such as username and email address</li>
              <li>Account activity, purchases, subscriptions, and transaction history</li>
              <li>Technical data such as browser type and device information</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and improve our services</li>
              <li>To process purchases and manage accounts</li>
              <li>To send notifications, updates, and important information</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your data.
              However, no system is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            <p>
              We may use trusted third-party services to operate our platform.
              These services are required to protect your information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-6">
            This is a sample privacy policy for demonstration purposes only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
