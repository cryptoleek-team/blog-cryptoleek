"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl rounded-2xl border bg-[var(--surface)] p-8">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">{t.aboutPage.title}</h1>
      <p className="mb-4 leading-7 text-[var(--muted)]">{t.aboutPage.description1}</p>
      <p className="leading-7 text-[var(--muted)]">{t.aboutPage.description2}</p>
    </article>
  );
}
