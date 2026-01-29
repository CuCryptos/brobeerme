"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { sampleBlogPosts } from "@/lib/sample-data";
import { getBlogPostBySlug as wpGetBlogPostBySlug, getBlogPosts as wpGetBlogPosts } from "@/lib/wordpress";
import { BlogPost } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { WordReveal, LineReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import {
  StaggerContainerOnScroll,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

function renderMarkdown(content: string) {
  // Basic markdown-to-HTML for our blog content
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="mb-6 space-y-2 pl-6">
          {listItems.map((item, i) => (
            <li key={i} className="list-disc text-stone-300">
              <span
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-stone-100">$1</strong>'
                  ),
                }}
              />
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, , ...body] = tableRows;
      elements.push(
        <div
          key={`table-${elements.length}`}
          className="mb-6 overflow-x-auto rounded-xl border border-stone-800"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-900">
                {header.map((cell, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold text-amber-400"
                  >
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-stone-800/50 last:border-0"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-stone-300">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table
    if (line.startsWith("|")) {
      flushList();
      inTable = true;
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "");
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // List items
    if (line.startsWith("- ")) {
      inList = true;
      listItems.push(line.slice(2));
      continue;
    } else if (inList) {
      flushList();
    }

    // Headers
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mb-4 mt-10 text-2xl font-bold text-stone-100"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mb-3 mt-8 text-xl font-semibold text-stone-200"
        >
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") continue;

    // Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="mb-4 leading-relaxed text-stone-300"
        dangerouslySetInnerHTML={{
          __html: line
            .replace(
              /\*\*(.*?)\*\*/g,
              '<strong class="text-stone-100">$1</strong>'
            )
            .replace(
              /\*(.*?)\*/g,
              '<em>$1</em>'
            ),
        }}
      />
    );
  }

  flushList();
  flushTable();

  return elements;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const postData = await wpGetBlogPostBySlug(slug);
      setPost(postData);

      if (postData) {
        const allPosts = await wpGetBlogPosts();
        setRelatedPosts(
          allPosts
            .filter(
              (p) =>
                p.id !== postData.id &&
                p.categories.some((c) => postData.categories.includes(c))
            )
            .slice(0, 3)
        );
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-stone-700 border-t-amber-500"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-100">
        <div className="text-center">
          <p className="mb-4 text-6xl">📝</p>
          <h1 className="mb-2 text-2xl font-bold">Article Not Found</h1>
          <p className="mb-6 text-stone-400">
            This article may have been moved or deleted.
          </p>
          <Link
            href="/blog"
            className="text-amber-500 hover:text-amber-400"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const readTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Article Header */}
        <section className="pb-8 pt-28">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link
                href="/blog"
                className="text-sm text-stone-500 transition-colors hover:text-amber-400"
              >
                ← All Articles
              </Link>
            </motion.div>

            <motion.div
              className="mb-4 flex flex-wrap items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400"
                >
                  {cat}
                </span>
              ))}
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
              <WordReveal text={post.title} staggerDelay={0.02} />
            </h1>

            <LineReveal delay={0.5}>
              <div className="flex items-center gap-4 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xs font-bold text-stone-950">
                    {post.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <span className="font-medium text-stone-300">
                    {post.author}
                  </span>
                </div>
                <span>·</span>
                <span>{formattedDate}</span>
                <span>·</span>
                <span>{readTime} min read</span>
              </div>
            </LineReveal>
          </div>
        </section>

        {/* Hero Image */}
        <FadeInOnScroll>
          <div className="mx-auto max-w-4xl px-6">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-700/40 via-stone-800 to-stone-900">
              <div className="flex h-full items-center justify-center">
                <motion.span
                  className="text-7xl opacity-30"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  📝
                </motion.span>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Article Body */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-6">
            <FadeInOnScroll>
              <div className="prose-beer">{renderMarkdown(post.content)}</div>
            </FadeInOnScroll>

            {/* Tags */}
            <FadeInOnScroll>
              <div className="mt-12 border-t border-stone-800 pt-8">
                <p className="mb-3 text-sm font-medium text-stone-500">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-900 px-3 py-1.5 text-xs text-stone-400 transition-colors hover:bg-stone-800 hover:text-amber-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>

            {/* Share */}
            <FadeInOnScroll>
              <div className="mt-8 flex items-center justify-between rounded-2xl border border-stone-800 bg-stone-900 p-6">
                <div>
                  <p className="font-semibold">Enjoyed this article?</p>
                  <p className="text-sm text-stone-400">
                    Share it with your beer-loving friends.
                  </p>
                </div>
                <div className="flex gap-2">
                  <MagneticButton strength={0.3}>
                    <motion.button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition-colors hover:bg-amber-500 hover:text-stone-950"
                      whileTap={{ scale: 0.9 }}
                      aria-label="Share on Twitter"
                    >
                      𝕏
                    </motion.button>
                  </MagneticButton>
                  <MagneticButton strength={0.3}>
                    <motion.button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-sm text-stone-400 transition-colors hover:bg-amber-500 hover:text-stone-950"
                      whileTap={{ scale: 0.9 }}
                      aria-label="Copy link"
                    >
                      🔗
                    </motion.button>
                  </MagneticButton>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-stone-800/50 bg-stone-900/30 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <FadeInOnScroll>
                <h2 className="mb-8 text-2xl font-bold">
                  Related <span className="text-amber-500">Articles</span>
                </h2>
              </FadeInOnScroll>

              <StaggerContainerOnScroll
                staggerDelay={0.15}
                className="grid gap-6 md:grid-cols-3"
              >
                {relatedPosts.map((p) => (
                  <StaggerItem key={p.id}>
                    <BlogCard post={p} />
                  </StaggerItem>
                ))}
              </StaggerContainerOnScroll>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-stone-800 bg-stone-950 py-12">
          <div className="mx-auto max-w-6xl px-6 text-center text-sm text-stone-600">
            <p>© 2025 BroBeerMe. Drink responsibly.</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
