import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingTime: number;
};

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = /^(##|###|####)\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const hashes = match[1];
    const text = match[2].replace(/[`*_]/g, "").trim();
    toc.push({
      depth: hashes.length,
      text,
      id: slugify(text)
    });
  }

  return toc;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

export function getAllPosts(): BlogPost[] {
  const files = getMarkdownFiles();

  return files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as BlogFrontmatter;

      return {
        slug,
        content,
        title: frontmatter.title,
        date: frontmatter.date,
        tags: frontmatter.tags ?? [],
        excerpt: frontmatter.excerpt,
        coverImage: frontmatter.coverImage,
        readingTime: estimateReadingTime(content)
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    content,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    excerpt: frontmatter.excerpt,
    coverImage: frontmatter.coverImage,
    readingTime: estimateReadingTime(content)
  };
}

export async function getPostHtml(content: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["anchor-link"]
      },
      content: {
        type: "text",
        value: " #"
      }
    })
    .use(rehypeStringify)
    .process(content);

  return processed.toString();
}

export function getTableOfContents(content: string): TocItem[] {
  return extractToc(content);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag.toLowerCase());
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string): BlogPost[] {
  const tagLower = tag.toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((item) => item.toLowerCase() === tagLower)
  );
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const overlap = post.tags.filter((tag) =>
        current.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      ).length;
      return { post, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || +new Date(b.post.date) - +new Date(a.post.date))
    .slice(0, limit)
    .map((item) => item.post);
}
