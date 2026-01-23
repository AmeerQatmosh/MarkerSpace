import React from "react";
import { motion } from "framer-motion";
import { Bookmark, FileText, Eye } from "lucide-react"; // Lucide icons

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export interface Feature {
  title: string;
  subtitle: string;
  Icon: React.ElementType; // Lucide icon component
  color: string; // Tailwind color
}

const features: Feature[] = [
  {
    title: "Organize Bookmarks",
    subtitle: "Save, sort, and categorize all your links in one place.",
    Icon: Bookmark,
    color: "text-red-500",
  },
  {
    title: "Collections & Notes",
    subtitle: "Group bookmarks and add notes to keep everything connected.",
    Icon: FileText,
    color: "text-green-500",
  },
  {
    title: "Track What Matters",
    subtitle: "Watch important bookmarks and never miss updates.",
    Icon: Eye,
    color: "text-blue-500",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          What we Offer?
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          MarkerSpace helps you keep your digital knowledge structured, searchable, and always accessible.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="bg-card text-foreground border border-border rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`rounded-full w-20 h-20 flex items-center justify-center mb-6 mt-4 bg-gray-100 dark:bg-gray-800`}>
              <feature.Icon className={`w-10 h-10 ${feature.color}`} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">{feature.title}</h3>
            <p className="text-center">{feature.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
