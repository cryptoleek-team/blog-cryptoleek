"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function TagsHeading() {
  const { t } = useLanguage();

  return <h1 className="mb-6 text-3xl font-semibold tracking-tight">{t.tagsPage.title}</h1>;
}
