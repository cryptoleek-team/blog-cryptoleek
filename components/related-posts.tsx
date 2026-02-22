"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { useLanguage } from "@/components/LanguageProvider";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  const { t } = useLanguage();

  if (!posts.length) return null;

  return (
    <section className="mt-14 border-t pt-8">
      <h2 className="mb-4 text-xl font-semibold">{t.post.relatedPosts}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border bg-[var(--surface)] p-4">
            <h3 className="text-base font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent)]">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
