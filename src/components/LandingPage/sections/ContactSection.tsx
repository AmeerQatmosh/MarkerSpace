// components/LandingPage/sections/ContactSection.tsx
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in touch</h2>
        <p className="text-muted-foreground mb-10">
          Have a question, feedback, or feature request? We’d love to hear from
          you.
        </p>

        <Link to="/contact">
          <Button size="lg">Contact Us</Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
