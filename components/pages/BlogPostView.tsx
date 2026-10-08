import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/blogPosts';
import { BlogContent } from '@/components/pages/BlogContent';
import { getToolBySlug } from '@/data/toolsRegistry';

export function BlogPostView({ post }: { post: BlogPost }) {
  const relatedTool = post.relatedToolSlug
    ? getToolBySlug(post.relatedToolSlug)
    : undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/blog"
        className="inline-block text-xs font-semibold text-moss-600 hover:underline"
      >
        ← Back to All Articles
      </Link>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600">
          <span>{post.category}</span>
          <span>·</span>
          <span>
            <time dateTime={post.datePublished}>{post.date}</time>
          </span>
          <span>·</span>
          <span>By {post.author ?? 'WrenchlyTools Editorial Team'}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink leading-tight">
          {post.title}
        </h1>
      </div>

      {post.image && (
        <div className="relative aspect-1200/630 w-full overflow-hidden rounded-xl bg-moss-50">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="pt-6 border-t border-line">
        <BlogContent content={post.content} />
      </div>

      {relatedTool && (
        <div className="rounded-2xl border border-moss-100 bg-moss-50 p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-moss-600">
            Put it into practice
          </p>
          <p className="mt-1.5 text-sm text-stone-600">
            {relatedTool.shortDescription}
          </p>
          <Link
            href={relatedTool.route}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-moss-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-moss-700"
          >
            Open {relatedTool.name} →
          </Link>
        </div>
      )}
    </div>
  );
}
