import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroSection from "@/components/LandingPage/sections/HeroSection";
import ConceptSlider from "@/components/LandingPage/ConceptSlider";
import FeaturesSection from "@/components/LandingPage/sections/FeaturesSection";
import PricingSection from "@/components/LandingPage/sections/PricingSection";
import AboutSection from "@/components/LandingPage/sections/AboutSection";
import FAQSection from "@/components/LandingPage/sections/FAQSection";
import ContactSection from "@/components/LandingPage/sections/ContactSection";
import CTASection from "@/components/LandingPage/sections/CTASection";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const sectionMotion = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ---------------------------------- */}
      {/* TOP HERO */}
      {/* ---------------------------------- */}
      <motion.section
        {...sectionMotion}
        className="relative overflow-hidden text-left py-32 md:py-48 bg-cyan-950"
      >
        <div className="absolute inset-0 bg-cyan-950 z-0" />
        <motion.div
          className="relative z-20 px-6 max-w-3xl m-10"
          variants={fadeUp}
        >
          <motion.h1
            className="text-4xl text-white md:text-6xl font-bold mb-4"
            variants={fadeUp}
          >
            Welcome to <u className="text-sky-300">MarkerSpace</u>
          </motion.h1>
          <motion.p
            className="text-lg text-white md:text-xl mb-6"
            variants={fadeUp}
          >
            Organize your bookmarks, notes, and collections — all in one place.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={fadeUp}>
            <Link to="/signin">
              <Button className="bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-500 font-semibold py-3 px-8 ransition duration-300">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-cyan-900 text-cyan-100 hover:bg-cyan-800 border border-cyan-700 font-semibold py-3 px-8 transition duration-300">
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ---------------------------------- */}
      {/* CONCEPT SLIDER */}
      {/* ---------------------------------- */}
      <ConceptSlider />

      {/* ---------------------------------- */}
      {/* FEATURES HERO (DIAGONAL BOTTOM) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="Features"
          subtitle=""
          gradientFrom="from-sky-700"
          gradientTo="to-sky-900"
          textColor="text-white"
          className="py-24 relative overflow-hidden"
        >
          {/* Diagonal shape at bottom */}
          <div
            className="absolute bottom-0 left-0 w-full h-16 bg-white dark:bg-gray-900"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </HeroSection>
      </motion.div>

      {/* FEATURES CONTENT */}
      <motion.div {...sectionMotion}>
        <FeaturesSection />
      </motion.div>

      {/* ---------------------------------- */}
      {/* PRICING HERO (WAVE BOTTOM) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="Pricing"
          subtitle=""
          gradientFrom="from-green-700"
          gradientTo="to-green-900"
          textColor="text-white"
          buttonText="View Plans"
          buttonLink="/plans"
          className="py-24 relative overflow-hidden"
        >
          <svg
            className="absolute bottom-0 w-full h-12"
            viewBox="0 0 500 50"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C150,0 350,100 500,50 L500,0 L0,0 Z"
              className="fill-white dark:fill-gray-900"
            ></path>
          </svg>
        </HeroSection>
      </motion.div>

      {/* PRICING CONTENT */}
      <motion.div {...sectionMotion}>
        <PricingSection />
      </motion.div>

      {/* ---------------------------------- */}
      {/* ABOUT HERO (CIRCLES OVERLAY) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="About"
          subtitle=""
          gradientFrom="from-red-700"
          gradientTo="to-red-900"
          textColor="text-white"
          buttonText="Learn More"
          buttonLink="/about"
          className="py-24 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="100" fill="white" />
            </svg>
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="100" fill="white" />
            </svg>
          </div>
        </HeroSection>
      </motion.div>

      {/* ABOUT CONTENT */}
      <motion.div {...sectionMotion}>
        <AboutSection />
      </motion.div>

      {/* ---------------------------------- */}
      {/* FAQ HERO (SLIGHT DIAGONAL) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="FAQ"
          subtitle=""
          gradientFrom="from-yellow-600"
          gradientTo="to-yellow-800"
          textColor="text-white"
          buttonText="Read FAQ"
          buttonLink="/faq"
          className="py-24 relative overflow-hidden"
        >
          <div
            className="absolute bottom-0 left-0 w-full h-16 bg-white dark:bg-gray-900"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </HeroSection>
      </motion.div>

      {/* FAQ CONTENT */}
      <motion.div {...sectionMotion}>
        <FAQSection />
      </motion.div>

      {/* ---------------------------------- */}
      {/* CONTACT HERO (CIRCLES) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="Contact Us"
          subtitle=""
          gradientFrom="from-teal-700"
          gradientTo="to-teal-900"
          textColor="text-white"
          className="py-24 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="100" fill="white" />
            </svg>
          </div>
        </HeroSection>
      </motion.div>

      {/* CONTACT CONTENT */}
      <motion.div {...sectionMotion}>
        <ContactSection />
      </motion.div>

      {/* ---------------------------------- */}
      {/* JOIN HERO (GLASS OVERLAY) */}
      {/* ---------------------------------- */}
      <motion.div {...sectionMotion}>
        <HeroSection
          title="Join MarkerSpace"
          subtitle=""
          gradientFrom="from-orange-700"
          gradientTo="to-orange-900"
          textColor="text-white"
          className="py-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl pointer-events-none" />
        </HeroSection>
      </motion.div>

      {/* FINAL CTA CONTENT */}
      <motion.div {...sectionMotion}>
        <CTASection />
      </motion.div>
    </div>
  );
}

export default LandingPage;
