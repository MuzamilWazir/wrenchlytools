import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageView } from "@/components/pages/ToolPageView";
import { CATEGORIES } from "@/data/categories";
import { TOOLS_REGISTRY, getToolBySlug } from "@/data/toolsRegistry";
import { ToolCategory } from "@/types/tools";

type Params = { category: string; tool: string };

export function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    category: tool.category,
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  const description = tool.longDescription || tool.shortDescription;

  return {
    title: `${tool.name} — Free Online Tool`,
    description,
    keywords: tool.tags,
    alternates: {
      canonical: tool.route,
    },
    openGraph: {
      type: "website",
      title: `${tool.name} — Free Online Tool | WrenchlyTools`,
      description,
      url: tool.route,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — Free Online Tool | WrenchlyTools`,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { category, tool: toolSlug } = await params;

  const tool = getToolBySlug(toolSlug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  const categoryInfo = CATEGORIES[tool.category as ToolCategory];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo?.name ?? tool.category,
        item: `/tools/${tool.category}`,
      },
      { "@type": "ListItem", position: 4, name: tool.name, item: tool.route },
    ],
  };

  const howToJsonLd = tool.howToUse.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${tool.name}`,
        step: tool.howToUse.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          text: step,
        })),
      }
    : null;

  return (
    <>
      {tool.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ToolPageView tool={tool} />
    </>
  );
}

export const dynamicParams = false;
