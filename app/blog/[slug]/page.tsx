import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostMeta } from "@/components/PostMeta";
import { RelatedPosts } from "@/components/related-posts";
import { TableOfContents } from "@/components/table-of-contents";
import { getAllPosts, getPostBySlug, getPostHtml, getRelatedPosts, getTableOfContents } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined
    }
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await getPostHtml(post.content);
  const toc = getTableOfContents(post.content);
  const related = getRelatedPosts(post.slug);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CryptoLeek Blog"
    },
    publisher: {
      "@type": "Organization",
      name: "CryptoLeek Blog"
    },
    mainEntityOfPage: postUrl,
    keywords: post.tags.join(", ")
  };

  return (
    <article>
      <header className="mb-8 rounded-2xl border bg-[var(--surface)] p-8">
        <PostMeta date={post.date} readingTime={post.readingTime} />
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">{post.excerpt}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div
          className="prose-content max-w-none rounded-2xl border bg-[var(--surface)] p-6 leading-8 sm:p-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <TableOfContents items={toc} />
      </div>

      <RelatedPosts posts={related} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </article>
  );
}
