// components/LandingPage/sections/AboutSection.tsx
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for people who collect knowledge
          </h2>
          <p className="text-muted-foreground mb-4">
            MarkerSpace was created to help developers, designers, researchers,
            and curious minds organize everything they find online.
          </p>
          <p className="text-muted-foreground">
            Instead of losing valuable links across browsers, chats, and notes,
            MarkerSpace brings everything into one structured workspace.
          </p>
        </div>

        <div className="rounded-2xl bg-muted/40 h-64 flex items-center justify-center text-muted-foreground">
          Placeholder image / illustration
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
