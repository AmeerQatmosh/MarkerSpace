// // components/LandingPage/sections/FAQSection.tsx
// import React from "react"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

// const FAQSection: React.FC = () => {
//   const faqs = [
//     {
//       q: "Is MarkerSpace free to use?",
//       a: "Yes. You can use MarkerSpace for free with generous limits.",
//     },
//     {
//       q: "Can I access my bookmarks on multiple devices?",
//       a: "Absolutely. Everything syncs securely across your devices.",
//     },
//     {
//       q: "Is my data private?",
//       a: "Yes. Your data is encrypted and never shared with third parties.",
//     },
//   ]

//   return (
//     <section id="faq" className="py-24 bg-muted/40">
//       <div className="max-w-4xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Frequently asked questions
//         </h2>

//         <Accordion
//           type="single"
//           collapsible
//           className="space-y-4"
//         >
//           {faqs.map((faq, index) => (
//             <AccordionItem
//               key={faq.q}
//               value={`item-${index}`}
//               className="rounded-xl border bg-background px-6"
//             >
//               <AccordionTrigger className="text-left font-semibold py-6">
//                 {faq.q}
//               </AccordionTrigger>
//               <AccordionContent className="text-muted-foreground pb-6">
//                 {faq.a}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   )
// }

// export default FAQSection

// components/LandingPage/sections/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

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

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-muted/40">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              value={`item-${index}`}
              className="rounded-xl border bg-background hover:bg-secondary px-6"
            >
              <AccordionTrigger className="group flex items-center justify-between py-6 text-left font-semibold">
                <span>{faq.q}</span>

                <span className="ml-4 flex h-6 w-6 items-center justify-center">
                  <Plus className="h-5 w-5 transition-all group-data-[state=open]:hidden" />
                  <Minus className="h-5 w-5 hidden transition-all group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-6 text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
