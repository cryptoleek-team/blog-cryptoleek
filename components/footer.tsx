import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-[var(--surface)]/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} CryptoLeek Blog. All rights reserved.</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--foreground)]" href={siteConfig.social.x}>
            X
          </Link>
          <Link className="hover:text-[var(--foreground)]" href={siteConfig.social.github}>
            GitHub
          </Link>
          <Link className="hover:text-[var(--foreground)]" href={siteConfig.social.linkedin}>
            LinkedIn
          </Link>
          <Link className="hover:text-[var(--foreground)]" href="/feed.xml">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
