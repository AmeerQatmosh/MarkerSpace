import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  customButtons?: React.ReactNode; // optional custom buttons
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  customButtons,
  gradientFrom = "from-cyan-800",
  gradientTo = "to-cyan-950",
  textColor = "text-white",
  className = "",
  align = "center",
}) => {
  // alignment classes
  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  return (
    <section
      className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} ${textColor} py-32 md:py-30 px-6 ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className={`max-w-3xl mx-auto flex flex-col ${alignClass}`}
      >
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-6" variants={fadeUp}>
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p className="text-lg md:text-xl mb-8" variants={fadeUp}>
            {subtitle}
          </motion.p>
        )}

        {customButtons ? (
          <motion.div className="flex flex-wrap gap-4" variants={fadeUp}>
            {customButtons}
          </motion.div>
        ) : buttonText && buttonLink ? (
          <motion.div variants={fadeUp}>
            <Link to={buttonLink}>
              <Button className="bg-foreground font-semibold py-3 px-8 shadow-md hover:shadow-lg transition duration-300">
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
};

export default HeroSection;
