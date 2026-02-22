"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: "/", label: t.nav.blog },
    { href: "/tags", label: t.nav.tags },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/45">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-bold tracking-[0.18em] text-zinc-900 dark:text-zinc-100">
          <Image src="/jiucai_logo.png" alt="jiucai logo" width={30} height={30} className="h-7 w-7 rounded-sm object-contain" priority />
          <span>CRYPTOLEEK</span>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-zinc-700 dark:text-zinc-300 sm:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-zinc-200/80 px-4 pb-3 pt-2 dark:border-white/10 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 px-3 py-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
