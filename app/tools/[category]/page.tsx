import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/pages/CategoryPageView";
import { CATEGORIES, CATEGORY_LIST } from "@/data/categories";
import { getToolsByCategory } from "@/data/toolsRegistry";
import { SITE_OG_IMAGE } from "@/lib/site";
import { ToolCategory } from "@/types/tools";

type Params = { category: string };

export function generateStaticParams() {
  return CATEGORY_LIST.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORIES[category as ToolCategory];

  if (!info) {
    return { title: "Category Not Found" };
  }

  const tools = getToolsByCategory(category);

  return {
    title: `${info.name} — ${tools.length} Free Online Tools`,
    description: info.description,
    keywords: [info.name, ...tools.flatMap((tool) => tool.tags)].slice(0, 40),
    alternates: {
      canonical: `/tools/${info.slug}`,
    },
    openGraph: {
      title: `${info.name} — Free Online Tools | WrenchlyTools`,
      description: info.description,
      url: `/tools/${info.slug}`,
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1600,
          height: 730,
          alt: "WrenchlyTools online utility toolbox",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${info.name} — Free Online Tools | WrenchlyTools`,
      description: info.description,
      images: [SITE_OG_IMAGE],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { category } = await params;

  if (!CATEGORIES[category as ToolCategory]) {
    notFound();
  }

  const info = CATEGORIES[category as ToolCategory];
  const tools = getToolsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${info.name} — WrenchlyTools`,
    description: info.description,
    url: `/tools/${info.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: tool.route,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageView categoryParam={category} />
    </>
  );
}
