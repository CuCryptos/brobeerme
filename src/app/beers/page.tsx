"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleBeers } from "@/lib/sample-data";
import { getBeers } from "@/lib/wordpress";
import { Beer } from "@/lib/types";
import { BeerCard } from "@/components/beer/BeerCard";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { WordReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import Link from "next/link";

const sortOptions = [
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
  { label: "ABV: High to Low", value: "abv-desc" },
  { label: "ABV: Low to High", value: "abv-asc" },
  { label: "Name A-Z", value: "name" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export default function BeersPage() {
  const [allBeers, setAllBeers] = useState<Beer[]>(sampleBeers);
  const [search, setSearch] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("rating");

  useEffect(() => {
    getBeers().then(setAllBeers);
  }, []);

  const allStyles = Array.from(new Set(allBeers.map((b) => b.style)));

  const filteredBeers = useMemo(() => {
    let beers = [...allBeers];

    if (search) {
      const q = search.toLowerCase();
      beers = beers.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.brewery.toLowerCase().includes(q) ||
          b.style.toLowerCase().includes(q)
      );
    }

    if (selectedStyle) {
      beers = beers.filter((b) => b.style === selectedStyle);
    }

    switch (sort) {
      case "rating":
        beers.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        beers.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "abv-desc":
        beers.sort((a, b) => b.abv - a.abv);
        break;
      case "abv-asc":
        beers.sort((a, b) => a.abv - b.abv);
        break;
      case "name":
        beers.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return beers;
  }, [allBeers, search, selectedStyle, sort]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Hero */}
        <section className="pb-12 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeInOnScroll>
              <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                Browse Collection
              </span>
            </FadeInOnScroll>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              <WordReveal text="Explore Beers" />
            </h1>
            <FadeInOnScroll delay={0.3}>
              <p className="max-w-xl text-lg text-stone-400">
                Discover craft beers rated by real enthusiasts. Filter by style,
                sort by what matters to you.
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
                  placeholder="Search beers, breweries, styles..."
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

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                  className="rounded-xl border border-stone-800 bg-stone-900 px-3 py-2.5 text-sm text-stone-300 outline-none transition-colors focus:border-amber-500/50"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Result count */}
                <span className="text-sm text-stone-500">
                  {filteredBeers.length} beers
                </span>
              </div>
            </div>

            {/* Style filters */}
            <div className="mt-3 flex flex-wrap gap-2">
              <motion.button
                onClick={() => setSelectedStyle(null)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  !selectedStyle
                    ? "bg-amber-500 text-stone-950"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                All Styles
              </motion.button>
              {allStyles.map((style) => (
                <motion.button
                  key={style}
                  onClick={() =>
                    setSelectedStyle(selectedStyle === style ? null : style)
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedStyle === style
                      ? "bg-amber-500 text-stone-950"
                      : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {style}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Beer Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${search}-${selectedStyle}-${sort}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredBeers.map((beer) => (
                  <BeerCard key={beer.id} beer={beer} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredBeers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="mb-2 text-2xl">🍺</p>
                <p className="text-lg font-medium text-stone-400">
                  No beers found
                </p>
                <p className="text-sm text-stone-500">
                  Try adjusting your filters or search
                </p>
              </motion.div>
            )}
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
