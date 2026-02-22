"use client";

import Link from "next/link";
import type { TocItem } from "@/lib/blog";
import { useLanguage } from "@/components/LanguageProvider";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const { t } = useLanguage();

  if (!items.length) return null;

  return (
    <aside className="sticky top-24 rounded-2xl border bg-[var(--surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">{t.post.onThisPage}</h2>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.depth - 2) * 10}px` }}>
            <Link href={`#${item.id}`} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
