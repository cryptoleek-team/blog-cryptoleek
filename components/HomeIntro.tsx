"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function HomeIntro() {
  const { t } = useLanguage();

  return (
    <section className="mb-10 rounded-2xl border bg-[var(--surface)] p-8">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{t.home.badge}</p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{t.home.title}</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">{t.home.description}</p>
    </section>
  );
}
