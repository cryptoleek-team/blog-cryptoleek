import { HomeIntro } from "@/components/HomeIntro";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <HomeIntro />

      <section className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
