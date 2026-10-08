import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/pages/BlogPostView";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blogPosts";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

type Params = { slug: string };

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

  const images = post.image
    ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt ?? post.title,
        },
      ]
    : [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "WrenchlyTools online utility toolbox",
        },
      ];

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
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author ?? "WrenchlyTools Editorial Team"],
      section: post.category,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [SITE_OG_IMAGE],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    url: postUrl,
    mainEntityOfPage: postUrl,
    ...(post.image && { image: [`${SITE_URL}${post.image}`] }),
    author: {
      "@type": "Organization",
      name: post.author ?? "WrenchlyTools Editorial Team",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WrenchlyTools",
      url: SITE_URL,
    },
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
