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
      modifiedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
      creator: "@cryptoleek"
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
      "@type": "Person",
      name: "CryptoLeek",
      url: "https://x.com/cryptoleek"
    },
    publisher: {
      "@type": "Organization",
      name: "CryptoLeek Blog",
      url: siteConfig.url
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl
    },
    keywords: post.tags.join(", "),
    image: post.coverImage || undefined
  };

  return (
    <article>
      <header className="mb-8 rounded-2xl border bg-[var(--surface)] p-5 sm:p-8">
        <PostMeta date={post.date} readingTime={post.readingTime} />
        <h1 className="max-w-4xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">{post.title}</h1>
        <p className="mt-4 max-w-3xl text-sm sm:text-base text-[var(--muted)]">{post.excerpt}</p>
      </header>

      {/* Mobile TOC - collapsible */}
      <div className="mb-6 lg:hidden">
        <TableOfContents items={toc} mobile />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div
          className="prose prose-zinc dark:prose-invert max-w-none rounded-2xl border bg-[var(--surface)] p-4 leading-8 sm:p-6 lg:p-8 prose-img:rounded-lg prose-pre:overflow-x-auto prose-table:overflow-x-auto overflow-hidden break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {/* Desktop TOC - sidebar */}
        <div className="hidden lg:block">
          <TableOfContents items={toc} />
        </div>
      </div>

      <RelatedPosts posts={related} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </article>
  );
}
