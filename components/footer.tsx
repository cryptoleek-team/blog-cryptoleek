"use client";

import { useLanguage } from "@/components/LanguageProvider";

const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com/@cryptoleek",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2C19.8 3.7 12 3.7 12 3.7s-7.8 0-9.5.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 0 12a30 30 0 0 0 .5 5.8 2.9 2.9 0 0 0 2 2c1.7.5 9.5.5 9.5.5s7.8 0 9.5-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 24 12a30 30 0 0 0-.5-5.8ZM9.5 15.7V8.3L16 12l-6.5 3.7Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/cryptoleek",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M18.9 2H22l-6.8 7.7L23.2 22h-6.3l-5-6.5L6.2 22H3l7.2-8.1L.8 2h6.4l4.5 6 7.2-6Zm-1.1 18h1.8L6.2 3.9H4.3L17.8 20Z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/joinchat/r6ILxt3tRZM1ZGZl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M9.9 14.8 9.5 20c.6 0 .8-.2 1.2-.6l2.8-2.7 5.7 4.2c1 .6 1.8.3 2-.9l3.7-17.5v-.1c.3-1.3-.5-1.8-1.5-1.4L1.6 9.3c-1.2.5-1.2 1.2-.2 1.5l5.6 1.7L19.7 5c.6-.4 1.2-.2.7.3" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-200/80 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-indigo-400/70 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/20 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-200"
              aria-label={link.name}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
