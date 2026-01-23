// components/LandingPage/sections/CTASection.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-background text-foreground text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start organizing your digital world
        </h2>
        <p className="opacity-90 mb-10">
          Create your free account and never lose an important link again.
        </p>
        <Link to="/signup">
          <Button size="lg" variant="secondary" className="border border-border">
            Create Free Account
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
