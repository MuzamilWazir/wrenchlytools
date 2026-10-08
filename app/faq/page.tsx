import type { Metadata } from "next";
import { FAQPage } from "@/components/pages/FAQPage";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — WrenchlyTools Help",
  description:
    "Answers about WrenchlyTools pricing, in-browser privacy, offline usage, watermarks, file limits, and locally stored favorites.",
  alternates: {
    canonical: "/faq",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQPage />
    </>
  );
}
