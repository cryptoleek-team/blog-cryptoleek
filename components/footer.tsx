"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-200/80 dark:border-white/10">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
