"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggle = () => setLanguage(language === "zh" ? "en" : "zh");

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-zinc-300/70 bg-white/90 p-2 text-zinc-600 transition hover:text-zinc-900 dark:border-white/15 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-zinc-100"
      aria-label={language === "zh" ? t.language.switchToEn : t.language.switchToZh}
      title={language === "zh" ? t.language.en : t.language.zh}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </button>
  );
}
