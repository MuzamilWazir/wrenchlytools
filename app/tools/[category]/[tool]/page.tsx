import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageView } from "@/components/pages/ToolPageView";
import { ToolGuideSections } from "@/components/tools/ToolGuideSections";
import { CATEGORIES } from "@/data/categories";
import { TOOLS_REGISTRY, getToolBySlug } from "@/data/toolsRegistry";
import { getToolGuide } from "@/data/toolGuides";
import { SITE_URL } from "@/lib/site";
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
  const title = tool.seoTitle ?? `${tool.name} — Free Online Tool`;
  const ogImage = {
    url: `/og-${tool.category}.png`,
    width: 1200,
    height: 630,
    alt: `${tool.name} — free online tool on WrenchlyTools`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: tool.route,
    },
    openGraph: {
      type: "website",
      title: `${title} | WrenchlyTools`,
      description,
      url: tool.route,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | WrenchlyTools`,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { category, tool: toolSlug } = await params;

  const tool = getToolBySlug(toolSlug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  const guide = getToolGuide(tool.slug);
  const faqs = guide?.extraFaqs?.length
    ? [...tool.faqs, ...guide.extraFaqs]
    : tool.faqs;
  const toolWithFaqs = faqs === tool.faqs ? tool : { ...tool, faqs };

  const categoryInfo = CATEGORIES[tool.category as ToolCategory];
  const description = tool.longDescription || tool.shortDescription;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo?.name ?? tool.category,
        item: `${SITE_URL}/tools/${tool.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `${SITE_URL}${tool.route}`,
      },
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

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description,
    url: `${SITE_URL}${tool.route}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (runs in a web browser)",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(guide && { dateModified: guide.lastReviewed }),
  };

  return (
    <>
      {faqs.length > 0 && (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <ToolPageView
        tool={toolWithFaqs}
        guide={guide ? <ToolGuideSections guide={guide} /> : undefined}
      />
    </>
  );
}

export const dynamicParams = false;
