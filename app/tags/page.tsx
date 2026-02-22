import type { Metadata } from "next";
import Link from "next/link";
import { TagsHeading } from "@/components/TagsHeading";
import { getAllTags, getPostsByTag } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all topics and categories on CryptoLeek Blog"
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section className="rounded-2xl border bg-[var(--surface)] p-8">
      <TagsHeading />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="font-medium">#{tag}</span>
            <span className="text-sm text-[var(--muted)]">{getPostsByTag(tag).length}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
