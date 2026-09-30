import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/blogPosts';

export function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/blog"
        className="inline-block text-xs font-semibold text-moss-600 hover:underline"
      >
        ← Back to All Articles
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink leading-tight">
          {post.title}
        </h1>
      </div>

      {post.image && (
        <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl bg-moss-50">
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

      <div className="prose text-sm leading-relaxed text-stone-700 space-y-4 pt-4 border-t border-line">
        {post.content.split('\n\n').map((para, i) => {
          if (para.startsWith('### ')) {
            return (
              <h3 key={i} className="text-lg font-bold text-ink pt-2">
                {para.replace('### ', '')}
              </h3>
            );
          }
          return <p key={i}>{para}</p>;
        })}
      </div>
    </div>
  );
}
