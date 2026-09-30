import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';

export function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moss-500/10 text-moss-600 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Guides &amp; Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
          WrenchlyTools Knowledge Base
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Educational guides on digital productivity, file privacy, development utilities, and tax calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition-all hover:border-moss-400 hover:shadow-[0_12px_28px_-18px_rgba(27,42,37,0.45)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-100 transition-colors group-hover:bg-moss-500 group-hover:text-white group-hover:ring-moss-500">
              <BookOpen className="h-5 w-5" />
            </div>

            <div className="mt-3.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-stone-500">
              <span className="truncate text-moss-700">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span className="shrink-0">{post.readTime}</span>
            </div>

            <h2 className="mt-1.5 text-sm font-bold leading-snug text-ink transition-colors group-hover:text-moss-700">
              {post.title}
            </h2>
            <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-stone-600">
              {post.excerpt}
            </p>

            <div className="mt-3.5 flex items-center gap-1 border-t border-line pt-3 text-xs font-semibold text-moss-600">
              Read Guide
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
