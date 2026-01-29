"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { TiltCard } from "@/components/animations/TiltCard";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          className="group cursor-pointer overflow-hidden rounded-3xl bg-stone-900"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-600 via-amber-700 to-stone-800 md:aspect-auto md:min-h-[400px]">
              <div className="flex h-full items-center justify-center">
                <motion.span
                  className="text-8xl opacity-40"
                  whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  📝
                </motion.span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h2 className="mb-3 text-2xl font-bold leading-tight transition-colors group-hover:text-amber-400 md:text-3xl">
                {post.title}
              </h2>
              <p className="mb-4 leading-relaxed text-stone-400">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xs font-bold text-stone-950">
                    {post.author.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <span>{post.author}</span>
                </div>
                <span>·</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <TiltCard tiltAmount={6} className="h-full">
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          className="group flex h-full cursor-pointer flex-col rounded-2xl bg-stone-900"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[16/9] rounded-t-2xl bg-gradient-to-br from-amber-700/60 via-stone-800 to-stone-900">
            <div className="flex h-full items-center justify-center">
              <motion.span
                className="text-5xl opacity-40"
                whileHover={{ scale: 1.2 }}
              >
                📝
              </motion.span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-2 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-amber-400">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-400">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-[10px] font-bold text-stone-950">
                {post.author.split(" ").map((w) => w[0]).join("")}
              </div>
              <span>{post.author}</span>
              <span>·</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </TiltCard>
  );
}
