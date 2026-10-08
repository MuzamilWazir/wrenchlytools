import type { Metadata } from "next";
import { BlogIndex } from "@/components/pages/BlogIndex";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Educational Guides",
  description:
    "In-depth guides on digital productivity, file privacy, developer utilities, image optimization, and tax calculations.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: "WrenchlyTools Blog & Educational Guides",
    description:
      "In-depth guides on digital productivity, file privacy, developer utilities, image optimization, and tax calculations.",
    url: "/blog",
    siteName: "WrenchlyTools",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "WrenchlyTools blog — guides on productivity, privacy and developer tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WrenchlyTools Blog & Educational Guides",
    description:
      "In-depth guides on digital productivity, file privacy, developer utilities, image optimization, and tax calculations.",
    images: [SITE_OG_IMAGE],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "WrenchlyTools Knowledge Base",
    url: `${SITE_URL}/blog`,
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      author: {
        "@type": "Organization",
        name: post.author ?? "WrenchlyTools Editorial Team",
        url: SITE_URL,
      },
      image: post.image ? `${SITE_URL}${post.image}` : undefined,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogIndex />
    </>
  );
}
