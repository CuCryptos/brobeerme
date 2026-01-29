"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { getBreweryBySlug as wpGetBreweryBySlug } from "@/lib/wordpress";
import { Brewery } from "@/lib/types";
import { BeerCard } from "@/components/beer/BeerCard";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { WordReveal, LineReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import {
  StaggerContainerOnScroll,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

const BreweryMap = dynamic(
  () =>
    import("@/components/brewery/BreweryMap").then((mod) => ({
      default: mod.BreweryMap,
    })),
  { ssr: false }
);

export default function BreweryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [brewery, setBrewery] = useState<Brewery | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wpGetBreweryBySlug(slug).then((data) => {
      setBrewery(data);
      setLoading(false);
    });
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

  if (!brewery) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-100">
        <div className="text-center">
          <p className="mb-4 text-6xl">🏭</p>
          <h1 className="mb-2 text-2xl font-bold">Brewery Not Found</h1>
          <p className="mb-6 text-stone-400">
            This brewery might have moved or closed.
          </p>
          <Link
            href="/breweries"
            className="text-amber-500 hover:text-amber-400"
          >
            ← Back to all breweries
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const isOpenToday = brewery.hours?.[today] !== "Closed";

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-28">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-stone-950 to-stone-900/50" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link
                href="/breweries"
                className="text-sm text-stone-500 transition-colors hover:text-amber-400"
              >
                ← All Breweries
              </Link>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              {/* Info */}
              <div>
                <motion.div
                  className="mb-3 flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isOpenToday
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {isOpenToday ? "Open Today" : "Closed Today"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="font-medium">{brewery.rating}</span>
                    <span className="text-sm text-stone-500">
                      ({brewery.reviewCount} reviews)
                    </span>
                  </div>
                </motion.div>

                <h1 className="mb-3 text-4xl font-bold md:text-5xl">
                  <WordReveal text={brewery.name} />
                </h1>

                <LineReveal delay={0.3}>
                  <p className="mb-2 text-stone-400">
                    {brewery.location.address}, {brewery.location.city},{" "}
                    {brewery.location.state} {brewery.location.zip}
                  </p>
                </LineReveal>

                <LineReveal delay={0.4}>
                  <p className="mb-6 leading-relaxed text-stone-300">
                    {brewery.description}
                  </p>
                </LineReveal>

                {/* Action buttons */}
                <motion.div
                  className="mb-6 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <MagneticButton strength={0.3}>
                    <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-stone-950 shadow-lg shadow-amber-500/20">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Get Directions
                    </button>
                  </MagneticButton>
                  {brewery.phone && (
                    <MagneticButton strength={0.2}>
                      <a
                        href={`tel:${brewery.phone}`}
                        className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-6 py-3 font-semibold transition-colors hover:border-amber-500/50 hover:text-amber-400"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Call
                      </a>
                    </MagneticButton>
                  )}
                  {brewery.website && (
                    <MagneticButton strength={0.2}>
                      <button className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-6 py-3 font-semibold transition-colors hover:border-amber-500/50 hover:text-amber-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Website
                      </button>
                    </MagneticButton>
                  )}
                </motion.div>
              </div>

              {/* Map */}
              <FadeInOnScroll direction="right">
                <div className="h-[300px] lg:h-[400px]">
                  <BreweryMap
                    breweries={[brewery]}
                    activeBrewery={brewery}
                    className="h-full"
                  />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Hours & Info */}
        <section className="border-t border-stone-800/50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Hours */}
              {brewery.hours && (
                <FadeInOnScroll>
                  <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
                    <h2 className="mb-4 text-xl font-bold">
                      <span className="text-amber-500">Hours</span>
                    </h2>
                    <div className="space-y-2">
                      {Object.entries(brewery.hours).map(([day, hours]) => {
                        const isToday = day === today;
                        return (
                          <motion.div
                            key={day}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                              isToday
                                ? "bg-amber-500/10 font-medium"
                                : ""
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                          >
                            <span
                              className={
                                isToday ? "text-amber-400" : "text-stone-400"
                              }
                            >
                              {day}
                              {isToday && (
                                <span className="ml-2 text-xs text-amber-500">
                                  Today
                                </span>
                              )}
                            </span>
                            <span
                              className={
                                hours === "Closed"
                                  ? "text-red-400"
                                  : isToday
                                  ? "text-green-400"
                                  : "text-stone-300"
                              }
                            >
                              {hours}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </FadeInOnScroll>
              )}

              {/* Contact & Details */}
              <FadeInOnScroll delay={0.2}>
                <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
                  <h2 className="mb-4 text-xl font-bold">
                    <span className="text-amber-500">Details</span>
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-stone-400">
                          {brewery.location.address}
                          <br />
                          {brewery.location.city}, {brewery.location.state}{" "}
                          {brewery.location.zip}
                        </p>
                      </div>
                    </div>

                    {brewery.phone && (
                      <div className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <a
                            href={`tel:${brewery.phone}`}
                            className="text-sm text-amber-400 hover:text-amber-300"
                          >
                            {brewery.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {brewery.website && (
                      <div className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-amber-400">
                            {brewery.website}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm text-stone-400">
                          <span className="text-amber-400">
                            {brewery.rating}
                          </span>{" "}
                          / 5 based on {brewery.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Beers on Tap */}
        {brewery.beers.length > 0 && (
          <section className="border-t border-stone-800/50 bg-stone-900/30 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <FadeInOnScroll>
                <h2 className="mb-8 text-2xl font-bold">
                  <span className="text-amber-500">On Tap</span> at{" "}
                  {brewery.name}
                </h2>
              </FadeInOnScroll>

              <StaggerContainerOnScroll
                staggerDelay={0.15}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {brewery.beers.map((beer) => (
                  <StaggerItem key={beer.id}>
                    <BeerCard beer={beer} />
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
