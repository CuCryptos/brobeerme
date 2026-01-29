"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sampleBreweries } from "@/lib/sample-data";
import { getBreweries } from "@/lib/wordpress";
import { Brewery } from "@/lib/types";
import { BreweryCard } from "@/components/brewery/BreweryCard";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { WordReveal } from "@/components/animations/TextReveal";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

const BreweryMap = dynamic(
  () =>
    import("@/components/brewery/BreweryMap").then((mod) => ({
      default: mod.BreweryMap,
    })),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl bg-stone-900">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-3 h-8 w-8 rounded-full border-2 border-stone-700 border-t-amber-500"
        />
        <p className="text-sm text-stone-500">Loading map...</p>
      </div>
    </div>
  );
}

const sortOptions = [
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
  { label: "Name A-Z", value: "name" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export default function BreweriesPage() {
  const [allBreweries, setAllBreweries] = useState<Brewery[]>(sampleBreweries);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("rating");
  const [activeBrewery, setActiveBrewery] = useState<Brewery | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "list" | "map">("split");

  useEffect(() => {
    getBreweries().then(setAllBreweries);
  }, []);

  const filteredBreweries = useMemo(() => {
    let breweries = [...allBreweries];

    if (search) {
      const q = search.toLowerCase();
      breweries = breweries.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.location.city.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "rating":
        breweries.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        breweries.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "name":
        breweries.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return breweries;
  }, [allBreweries, search, sort]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Hero */}
        <section className="pb-8 pt-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeInOnScroll>
              <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                Discover Local
              </span>
            </FadeInOnScroll>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              <WordReveal text="Find Breweries" />
            </h1>
            <FadeInOnScroll delay={0.3}>
              <p className="max-w-xl text-lg text-stone-400">
                Explore craft breweries near you. See what&apos;s on tap, check
                hours, and plan your next visit.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[65px] z-40 border-y border-stone-800/50 bg-stone-950/90 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative max-w-sm flex-1">
                  <input
                    type="text"
                    placeholder="Search breweries..."
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
              </div>

              <div className="flex items-center gap-2">
                {/* View toggle */}
                {(["split", "list", "map"] as const).map((mode) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      viewMode === mode
                        ? "bg-amber-500 text-stone-950"
                        : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode === "split" ? "Split View" : mode}
                  </motion.button>
                ))}

                <span className="ml-2 text-sm text-stone-500">
                  {filteredBreweries.length} breweries
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatePresence mode="wait">
              {viewMode === "split" && (
                <motion.div
                  key="split"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 lg:grid-cols-2"
                >
                  {/* List */}
                  <div className="space-y-4 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-2">
                    {filteredBreweries.map((brewery) => (
                      <BreweryCard
                        key={brewery.id}
                        brewery={brewery}
                        isActive={activeBrewery?.id === brewery.id}
                        onHover={() => setActiveBrewery(brewery)}
                        onLeave={() => setActiveBrewery(null)}
                      />
                    ))}
                  </div>

                  {/* Map */}
                  <div className="sticky top-[140px] h-[calc(100vh-200px)]">
                    <BreweryMap
                      breweries={filteredBreweries}
                      activeBrewery={activeBrewery}
                      onMarkerClick={(b) => setActiveBrewery(b)}
                      className="h-full"
                    />
                  </div>
                </motion.div>
              )}

              {viewMode === "list" && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredBreweries.map((brewery) => (
                    <BreweryCard key={brewery.id} brewery={brewery} />
                  ))}
                </motion.div>
              )}

              {viewMode === "map" && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[calc(100vh-200px)]"
                >
                  <BreweryMap
                    breweries={filteredBreweries}
                    activeBrewery={activeBrewery}
                    onMarkerClick={(b) => setActiveBrewery(b)}
                    className="h-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {filteredBreweries.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="mb-2 text-2xl">🏭</p>
                <p className="text-lg font-medium text-stone-400">
                  No breweries found
                </p>
                <p className="text-sm text-stone-500">
                  Try adjusting your search
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
