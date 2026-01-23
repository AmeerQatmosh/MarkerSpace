// components/LandingPage/sections/FAQSection.tsx
import React from "react";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: "Is MarkerSpace free to use?",
      a: "Yes. You can use MarkerSpace for free with generous limits.",
    },
    {
      q: "Can I access my bookmarks on multiple devices?",
      a: "Absolutely. Everything syncs securely across your devices.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Your data is encrypted and never shared with third parties.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-muted/40">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently asked questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border bg-background p-6"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
