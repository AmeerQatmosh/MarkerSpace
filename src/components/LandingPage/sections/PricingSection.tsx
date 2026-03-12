import { Button } from "@/components/ui/button";
import React from "react";

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "For personal use",
      features: ["Unlimited bookmarks", "Basic collections", "Cloud sync"],
    },
    {
      name: "Pro",
      price: "$8",
      desc: "For power users",
      features: [
        "Everything in Free",
        "Advanced search",
        "Notes & highlights",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: "$16",
      desc: "For teams & companies",
      features: [
        "Shared workspaces",
        "Team permissions",
        "Activity tracking",
        "Admin controls",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start for free. Upgrade when you need more power.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border bg-background p-8 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-muted-foreground mb-4">{plan.desc}</p>
            <p className="text-4xl font-bold mb-6">
              {plan.price}
              <span className="text-base font-normal text-muted-foreground">
                /mo
              </span>
            </p>

            <ul className="space-y-2 text-sm mb-6">
              {plan.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>

            <Button className="w-full">Get Started</Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
