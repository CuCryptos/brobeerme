"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleBlogPosts, getAllBlogCategories as sampleGetAllBlogCategories } from "@/lib/sample-data";
import { getBlogPosts, getAllBlogCategories } from "@/lib/wordpress";
import { BlogPost } from "@/lib/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { WordReveal } from "@/components/animations/TextReveal";
import {
  StaggerContainerOnScroll,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [categories, setCategories] = useState<string[]>(sampleGetAllBlogCategories());
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getBlogPosts().then(setAllPosts);
    getAllBlogCategories().then(setCategories);
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = [...allPosts];

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      posts = posts.filter((p) => p.categories.includes(selectedCategory));
    }

    return posts;
  }, [allPosts, search, selectedCategory]);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Hero */}
        <section className="pb-8 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeInOnScroll>
              <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                Stories & Guides
              </span>
            </FadeInOnScroll>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              <WordReveal text="The Beer Blog" />
            </h1>
            <FadeInOnScroll delay={0.3}>
              <p className="max-w-xl text-lg text-stone-400">
                Deep dives into beer styles, brewing techniques, brewery
                profiles, and everything craft beer.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[65px] z-40 border-y border-stone-800/50 bg-stone-950/90 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-sm flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 pl-10 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
                />
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <span className="text-sm text-stone-500">
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Category filters */}
            <div className="mt-3 flex flex-wrap gap-2">
              <motion.button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-amber-500 text-stone-950"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-stone-950"
                      : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${search}-${selectedCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-10">
                    <FadeInOnScroll>
                      <BlogCard post={featuredPost} featured />
                    </FadeInOnScroll>
                  </div>
                )}

                {/* Grid */}
                {remainingPosts.length > 0 && (
                  <StaggerContainerOnScroll
                    staggerDelay={0.1}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {remainingPosts.map((post) => (
                      <StaggerItem key={post.id}>
                        <BlogCard post={post} />
                      </StaggerItem>
                    ))}
                  </StaggerContainerOnScroll>
                )}
              </motion.div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="mb-2 text-2xl">📝</p>
                <p className="text-lg font-medium text-stone-400">
                  No articles found
                </p>
                <p className="text-sm text-stone-500">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-stone-800/50 bg-stone-900/30 py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <FadeInOnScroll>
              <h2 className="mb-3 text-3xl font-bold">
                Stay in the <span className="text-amber-500">Loop</span>
              </h2>
              <p className="mb-6 text-stone-400">
                Get the latest beer news, reviews, and guides delivered to your
                inbox weekly.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-stone-700 bg-stone-900 px-5 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-500/50"
                />
                <motion.button
                  className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-stone-950"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

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
