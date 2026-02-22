"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function PostMeta({ date, readingTime }: { date: string; readingTime: number }) {
  const { language, t } = useLanguage();

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
      <time dateTime={date}>{new Date(date).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US")}</time>
      <span>•</span>
      <span>{readingTime} {t.post.minRead}</span>
    </div>
  );
}
