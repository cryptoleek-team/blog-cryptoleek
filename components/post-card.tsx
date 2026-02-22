"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { useLanguage } from "@/components/LanguageProvider";

export function PostCard({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();

  return (
    <article className="rounded-2xl border bg-[var(--surface)] p-6 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US")}</time>
        <span>•</span>
        <span>{post.readingTime} {t.post.minRead}</span>
      </div>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent)]">
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={`${post.slug}-${tag}`}
            href={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
            className="rounded-full border px-2.5 py-1 text-xs text-[var(--muted)] hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
