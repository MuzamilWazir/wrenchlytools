import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "WrenchlyTools — Everyday tools. Done in seconds.",
  description:
    "The all-in-one digital utility toolbox. Everyday tools for text, images, calculators, generators, developer tasks, converters, and PDFs — done in seconds.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "WrenchlyTools",
            description:
              "The all-in-one digital utility toolbox with over 80 free browser-based tools.",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/tools?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <HomePage />
    </>
  );
}
