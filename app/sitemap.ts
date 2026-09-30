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

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...CATEGORY_LIST.map((category) => `/tools/${category.slug}`),
    ...TOOLS_REGISTRY.map((tool) => tool.route),
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}