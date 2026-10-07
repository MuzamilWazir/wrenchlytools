import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import { CATEGORY_LIST } from "@/data/categories";
import { TOOLS_REGISTRY } from "@/data/toolsRegistry";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "/",
  "/tools",
  "/blog",
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/cookies",
];

/**
 * Content freshness signal for crawlers. Bump when large parts of the
 * site (or a specific tool page) change in a way that matters for SEO.
 */
const SITE_LAST_MODIFIED = new Date("2026-10-07");

const TOOL_LAST_MODIFIED: Record<string, Date> = {
  "/tools/generators/cover-letter-generator": new Date("2026-10-07"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...CATEGORY_LIST.map((category) => `/tools/${category.slug}`),
    ...TOOLS_REGISTRY.map((tool) => tool.route),
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: TOOL_LAST_MODIFIED[route] ?? SITE_LAST_MODIFIED,
  }));
}
