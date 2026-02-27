"use client";

import Link from "next/link";
import { useState } from "react";
import type { TocItem } from "@/lib/blog";
import { useLanguage } from "@/components/LanguageProvider";

export function TableOfContents({ items, mobile }: { items: TocItem[]; mobile?: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  if (mobile) {
    return (
      <div className="rounded-2xl border bg-[var(--surface)]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">{t.post.onThisPage}</h2>
          <svg
            className={`h-4 w-4 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <ul className="space-y-1.5 px-4 pb-4">
            {items.map((item) => (
              <li key={item.id} style={{ paddingLeft: `${(item.depth - 2) * 10}px` }}>
                <Link
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

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
