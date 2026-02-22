import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-10 rounded-2xl border bg-[var(--surface)] p-8">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Insights</p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Crypto, AI, and technology analysis built for operators.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Practical research and playbooks from the CryptoLeek team. Every post is optimized for fast loading,
          structured search visibility, and clear decision-making.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
