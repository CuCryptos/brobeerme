"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { sampleBeers } from "@/lib/sample-data";
import { getBeerBySlug as wpGetBeerBySlug, getBeerReviews as wpGetBeerReviews, getBeers as wpGetBeers } from "@/lib/wordpress";
import { Beer, BeerReview } from "@/lib/types";
import { StarRatingInteractive } from "@/components/beer/StarRatingInteractive";
import { RatingBar } from "@/components/beer/RatingBar";
import { ReviewCard } from "@/components/beer/ReviewCard";
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

const styleGradients: Record<string, string> = {
  "New England IPA": "from-amber-500 via-yellow-500 to-orange-400",
  "American IPA": "from-green-600 via-emerald-500 to-teal-500",
  "Vienna Lager": "from-orange-600 via-red-500 to-amber-600",
  "Imperial Stout": "from-stone-700 via-stone-800 to-stone-900",
  "Oatmeal Stout": "from-stone-600 via-stone-700 to-amber-900",
  "Fruited Sour Ale": "from-pink-500 via-purple-400 to-fuchsia-500",
  "Belgian Tripel": "from-yellow-400 via-amber-400 to-orange-400",
  Hefeweizen: "from-yellow-300 via-orange-300 to-amber-400",
};

export default function BeerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [beer, setBeer] = useState<Beer | undefined>(undefined);
  const [reviews, setReviews] = useState<BeerReview[]>([]);
  const [relatedBeers, setRelatedBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const beerData = await wpGetBeerBySlug(slug);
      setBeer(beerData);

      if (beerData) {
        const [reviewData, allBeers] = await Promise.all([
          wpGetBeerReviews(beerData.id),
          wpGetBeers(),
        ]);
        setReviews(reviewData);
        setRelatedBeers(
          allBeers
            .filter((b) => b.id !== beerData.id)
            .sort(() => Math.random() - 0.5)
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

  if (!beer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-100">
        <div className="text-center">
          <p className="mb-4 text-6xl">🍺</p>
          <h1 className="mb-2 text-2xl font-bold">Beer Not Found</h1>
          <p className="mb-6 text-stone-400">
            This beer might have been drunk already.
          </p>
          <Link
            href="/beers"
            className="text-amber-500 hover:text-amber-400"
          >
            ← Back to all beers
          </Link>
        </div>
      </div>
    );
  }

  const gradient =
    styleGradients[beer.style] || "from-amber-500 via-yellow-500 to-orange-400";

  const avgTasting = reviews.length
    ? {
        appearance:
          reviews.reduce((s, r) => s + r.tastingNotes.appearance, 0) /
          reviews.length,
        aroma:
          reviews.reduce((s, r) => s + r.tastingNotes.aroma, 0) / reviews.length,
        taste:
          reviews.reduce((s, r) => s + r.tastingNotes.taste, 0) / reviews.length,
        mouthfeel:
          reviews.reduce((s, r) => s + r.tastingNotes.mouthfeel, 0) /
          reviews.length,
      }
    : null;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* Hero / Beer Header */}
        <section className="relative overflow-hidden pb-16 pt-28">
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/80 to-stone-950" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/beers"
                className="text-sm text-stone-500 transition-colors hover:text-amber-400"
              >
                ← All Beers
              </Link>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
              {/* Beer Image / Gradient Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className={`aspect-square overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                >
                  <motion.span
                    className="text-[120px] opacity-60"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🍺
                  </motion.span>
                </div>
              </motion.div>

              {/* Beer Info */}
              <div>
                <motion.div
                  className="mb-3 flex flex-wrap items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="rounded-full bg-stone-800 px-3 py-1 text-sm text-stone-300">
                    {beer.style}
                  </span>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400">
                    {beer.abv}% ABV
                  </span>
                  {beer.ibu && (
                    <span className="rounded-full bg-stone-800 px-3 py-1 text-sm text-stone-400">
                      {beer.ibu} IBU
                    </span>
                  )}
                </motion.div>

                <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                  <WordReveal text={beer.name} />
                </h1>

                <LineReveal delay={0.3}>
                  <p className="mb-6 text-lg text-stone-400">
                    by{" "}
                    <span className="font-medium text-amber-400">
                      {beer.brewery}
                    </span>
                  </p>
                </LineReveal>

                {/* Rating summary */}
                <FadeInOnScroll delay={0.4}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-bold text-amber-400">
                        {beer.rating.toFixed(1)}
                      </span>
                      <div>
                        <StarRatingInteractive
                          rating={Math.round(beer.rating)}
                          size="md"
                        />
                        <p className="text-xs text-stone-500">
                          {beer.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>

                <LineReveal delay={0.5}>
                  <p className="mb-8 leading-relaxed text-stone-300">
                    {beer.description}
                  </p>
                </LineReveal>

                {/* CTA Buttons */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <MagneticButton strength={0.3}>
                    <button className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-shadow hover:shadow-amber-500/30">
                      Write a Review
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.2}>
                    <button className="rounded-full border border-stone-700 px-6 py-3 font-semibold transition-colors hover:border-amber-500/50 hover:text-amber-400">
                      Add to Wishlist
                    </button>
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Tasting Notes */}
        <section className="border-t border-stone-800/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Detailed tasting notes */}
              <div>
                <FadeInOnScroll>
                  <h2 className="mb-8 text-2xl font-bold">
                    <span className="text-amber-500">Tasting</span> Notes
                  </h2>
                </FadeInOnScroll>

                <div className="space-y-6">
                  {Object.entries(beer.tastingNotes).map(
                    ([key, value], i) => (
                      <FadeInOnScroll
                        key={key}
                        delay={i * 0.1}
                        direction="left"
                      >
                        <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
                          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
                            {key}
                          </h3>
                          <p className="text-sm leading-relaxed text-stone-300">
                            {value}
                          </p>
                        </div>
                      </FadeInOnScroll>
                    )
                  )}
                </div>
              </div>

              {/* Average ratings */}
              {avgTasting && (
                <div>
                  <FadeInOnScroll>
                    <h2 className="mb-8 text-2xl font-bold">
                      <span className="text-amber-500">Average</span> Ratings
                    </h2>
                  </FadeInOnScroll>

                  <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
                    <div className="mb-6 text-center">
                      <motion.div
                        className="mb-2 text-6xl font-bold text-amber-400"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                      >
                        {beer.rating.toFixed(1)}
                      </motion.div>
                      <StarRatingInteractive
                        rating={Math.round(beer.rating)}
                        size="lg"
                      />
                      <p className="mt-1 text-sm text-stone-500">
                        Based on {beer.reviewCount} reviews
                      </p>
                    </div>

                    <div className="space-y-4">
                      <RatingBar
                        label="Appearance"
                        value={Math.round(avgTasting.appearance * 10) / 10}
                        delay={0.1}
                      />
                      <RatingBar
                        label="Aroma"
                        value={Math.round(avgTasting.aroma * 10) / 10}
                        delay={0.2}
                      />
                      <RatingBar
                        label="Taste"
                        value={Math.round(avgTasting.taste * 10) / 10}
                        delay={0.3}
                      />
                      <RatingBar
                        label="Mouthfeel"
                        value={Math.round(avgTasting.mouthfeel * 10) / 10}
                        delay={0.4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-t border-stone-800/50 bg-stone-900/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeInOnScroll>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  <span className="text-amber-500">Community</span> Reviews
                </h2>
                <MagneticButton strength={0.2}>
                  <button className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-950 transition-transform hover:scale-105">
                    Write a Review
                  </button>
                </MagneticButton>
              </div>
            </FadeInOnScroll>

            {reviews.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <FadeInOnScroll>
                <div className="rounded-2xl border border-dashed border-stone-800 py-16 text-center">
                  <p className="mb-2 text-4xl">✍️</p>
                  <p className="mb-1 text-lg font-medium text-stone-300">
                    No reviews yet
                  </p>
                  <p className="mb-4 text-sm text-stone-500">
                    Be the first to share your thoughts on this beer
                  </p>
                  <button className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-950">
                    Write the First Review
                  </button>
                </div>
              </FadeInOnScroll>
            )}
          </div>
        </section>

        {/* Related Beers */}
        <section className="border-t border-stone-800/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeInOnScroll>
              <h2 className="mb-8 text-2xl font-bold">
                You Might <span className="text-amber-500">Also Like</span>
              </h2>
            </FadeInOnScroll>

            <StaggerContainerOnScroll
              staggerDelay={0.15}
              className="grid gap-6 md:grid-cols-3"
            >
              {relatedBeers.map((b) => (
                <StaggerItem key={b.id}>
                  <BeerCard beer={b} />
                </StaggerItem>
              ))}
            </StaggerContainerOnScroll>
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
