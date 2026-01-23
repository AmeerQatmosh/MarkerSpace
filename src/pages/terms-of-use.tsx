import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background text-foreground transition-colors duration-300">
      <Card className="w-full max-w-4xl p-8 md:p-12 rounded-2xl shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Use
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-left text-lg">
          <p>
            Welcome to <strong>MarkerSpace</strong>. By accessing or using our
            platform, you agree to be bound by these Terms of Use.
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Use of the Platform</h2>
            <p>
              You agree to use MarkerSpace only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use
              of the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Account Responsibility</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these terms or misuse the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            <p>
              MarkerSpace is provided "as is" without warranties of any kind. We
              are not liable for any damages arising from the use of our
              services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. Continued use of the
              platform means you accept the updated terms.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-6">
            This is a sample terms of use document for demonstration purposes
            only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfUse;
