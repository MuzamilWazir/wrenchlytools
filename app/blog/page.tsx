import type { Metadata } from "next";
import { BlogIndex } from "@/components/pages/BlogIndex";
import { BLOG_POSTS } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog & Educational Guides",
  description:
    "In-depth guides on digital productivity, file privacy, developer utilities, image optimization, and tax calculations.",
  alternates: {
    canonical: "/blog",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "WrenchlyTools Knowledge Base",
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `/blog/${post.slug}`,
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
