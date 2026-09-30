import type { Metadata } from "next";
import { AllToolsPage } from "@/components/pages/AllToolsPage";
import { TOOLS_REGISTRY } from "@/data/toolsRegistry";

export const metadata: Metadata = {
  title: "All Tools Directory — Free Online Utilities",
  description: `Browse all ${TOOLS_REGISTRY.length} free in-browser utilities on WrenchlyTools: text, image, calculator, generator, developer, converter, PDF, AI, and creator tools.`,
  alternates: {
    canonical: "/tools",
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
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "/tools" },
            ],
          }),
        }}
      />
      <AllToolsPage />
    </>
  );
}
