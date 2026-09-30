import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/pages/BlogPostView";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blogPosts";

type Params = { slug: string };

// Converts "September 2026" -> "2026-09-01" (valid ISO 8601 for schema.org / OpenGraph)
function toIsoDate(date: string): string | undefined {
  const parsed = new Date(`${date} 1`);
  return Number.isNaN(parsed.getTime())
    ? undefined
    : parsed.toISOString().split("T")[0];
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const publishedTime = toIsoDate(post.date);
  const images = post.image
    ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt ?? post.title,
        },
      ]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime,
      section: post.category,
      images,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isoDate = toIsoDate(post.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: isoDate,
    dateModified: isoDate,
    url: `/blog/${post.slug}`,
    mainEntityOfPage: `/blog/${post.slug}`,
    ...(post.image && { image: [post.image] }),
    author: { "@type": "Organization", name: "WrenchlyTools" },
    publisher: { "@type": "Organization", name: "WrenchlyTools" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView post={post} />
    </>
  );
}

export const dynamicParams = false;