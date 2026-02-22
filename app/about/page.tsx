import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About CryptoLeek Blog"
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl rounded-2xl border bg-[var(--surface)] p-8">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">About CryptoLeek Blog</h1>
      <p className="mb-4 leading-7 text-[var(--muted)]">
        CryptoLeek Blog publishes practical, deeply researched content at the intersection of crypto, AI, and software.
      </p>
      <p className="leading-7 text-[var(--muted)]">
        Our editorial approach prioritizes clear frameworks, replicable methods, and actionable tactics for builders,
        investors, and growth teams.
      </p>
    </article>
  );
}
