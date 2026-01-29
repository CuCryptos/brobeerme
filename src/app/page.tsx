"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { BeerBubbles } from "@/components/animations/BeerBubbles";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TiltCard } from "@/components/animations/TiltCard";
import { TextReveal, WordReveal, LineReveal } from "@/components/animations/TextReveal";
import { FadeInOnScroll } from "@/components/animations/FadeIn";
import { StaggerContainerOnScroll, StaggerItem } from "@/components/animations/StaggerChildren";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CountUp } from "@/components/animations/CountUp";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Beer } from "@/lib/types";
import { getBeers } from "@/lib/wordpress";

const styleGradientMap: Record<string, string> = {
  "New England IPA": "from-amber-500 via-yellow-500 to-orange-400",
  "Vienna Lager": "from-orange-600 via-red-500 to-amber-600",
  "Imperial Stout": "from-stone-700 via-stone-800 to-stone-900",
  "Fruited Sour Ale": "from-pink-500 via-purple-400 to-fuchsia-500",
  "American IPA": "from-green-600 via-emerald-500 to-teal-500",
  "Belgian Tripel": "from-yellow-400 via-amber-400 to-orange-400",
  "Oatmeal Stout": "from-stone-600 via-stone-700 to-amber-900",
  Hefeweizen: "from-yellow-300 via-orange-300 to-amber-400",
};

const defaultFeaturedBeers = [
  {
    id: 1,
    name: "Hazy IPA",
    brewery: "Local Craft Co.",
    rating: 4.5,
    style: "IPA",
    abv: "6.8%",
    description: "Juicy, tropical hop bomb with notes of mango and citrus",
    gradient: "from-amber-500 via-yellow-500 to-orange-400",
  },
  {
    id: 2,
    name: "Amber Lager",
    brewery: "Mountain Brewing",
    rating: 4.2,
    style: "Lager",
    abv: "5.2%",
    description: "Crisp and clean with caramel malt sweetness",
    gradient: "from-orange-600 via-red-500 to-amber-600",
  },
  {
    id: 3,
    name: "Chocolate Stout",
    brewery: "Dark Horse Brewery",
    rating: 4.8,
    style: "Stout",
    abv: "7.5%",
    description: "Rich, velvety dark chocolate with espresso finish",
    gradient: "from-stone-700 via-stone-800 to-stone-900",
  },
  {
    id: 4,
    name: "Tropical Sour",
    brewery: "Wild Side Ales",
    rating: 4.3,
    style: "Sour",
    abv: "4.5%",
    description: "Tart passionfruit and guava with a refreshing finish",
    gradient: "from-pink-500 via-purple-400 to-fuchsia-500",
  },
];

const stats = [
  { label: "Beers Reviewed", value: 2847, suffix: "+" },
  { label: "Breweries Listed", value: 512, suffix: "" },
  { label: "Active Members", value: 15000, suffix: "+" },
  { label: "Cities Covered", value: 128, suffix: "" },
];

const beerStyles = [
  { name: "IPA", count: 124, icon: "🍺", color: "from-amber-500 to-orange-600" },
  { name: "Stout", count: 87, icon: "🖤", color: "from-stone-600 to-stone-900" },
  { name: "Lager", count: 156, icon: "🍻", color: "from-yellow-400 to-amber-500" },
  { name: "Sour", count: 43, icon: "🍋", color: "from-pink-400 to-purple-500" },
  { name: "Wheat", count: 68, icon: "🌾", color: "from-orange-300 to-yellow-500" },
  { name: "Porter", count: 91, icon: "☕", color: "from-amber-800 to-stone-800" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? "text-amber-400" : "text-stone-600"}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1, type: "spring", stiffness: 300 }}
        >
          ★
        </motion.span>
      ))}
      <span className="ml-1 text-sm text-stone-400">{rating}</span>
    </div>
  );
}

export default function Home() {
  const [featuredBeers, setFeaturedBeers] = useState(defaultFeaturedBeers);

  useEffect(() => {
    getBeers().then((beers) => {
      const mapped = beers.slice(0, 4).map((b: Beer) => ({
        id: b.id,
        name: b.name,
        brewery: b.brewery,
        rating: b.rating,
        style: b.style,
        abv: `${b.abv}%`,
        description: b.description.slice(0, 60),
        gradient:
          styleGradientMap[b.style] ||
          "from-amber-500 via-yellow-500 to-orange-400",
      }));
      if (mapped.length > 0) setFeaturedBeers(mapped);
    });
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.9]);
  const imageScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const imageY = useTransform(heroScroll, [0, 1], [0, 80]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <ScrollProgress />

        {/* ===== HERO SECTION - FULL BLEED IMAGE ===== */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: imageScale, y: imageY }}
          >
            <Image
              src="/hero-beer.jpg"
              alt="Craft beer being poured"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
          </motion.div>

          {/* Ambient glow */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(180, 83, 9, 0.2) 0%, transparent 60%)",
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <BeerBubbles count={20} />

          <motion.div
            className="relative z-10 mx-auto max-w-7xl px-6"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400 backdrop-blur-sm"
              >
                Discover Your Next Favorite Brew
              </motion.div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
                <TextReveal
                  text="Bro,"
                  className="block text-white drop-shadow-lg"
                  delay={0.3}
                />
                <TextReveal
                  text="Beer Me."
                  className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                  delay={0.8}
                />
              </h1>

              <LineReveal delay={1.2}>
                <p className="mb-8 max-w-lg text-lg text-stone-300 md:text-xl">
                  The ultimate platform for craft beer enthusiasts. Rate brews,
                  discover breweries, and connect with fellow beer lovers.
                </p>
              </LineReveal>

              <motion.div
                className="flex flex-col items-start gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <MagneticButton strength={0.4}>
                  <Link
                    href="/beers"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-semibold text-stone-950 shadow-lg shadow-amber-500/25 transition-shadow hover:shadow-amber-500/40"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative flex items-center gap-2">
                      Explore Beers
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.3}>
                  <Link
                    href="/breweries"
                    className="group rounded-full border-2 border-white/20 px-8 py-4 font-semibold backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                  >
                    Find Breweries
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: heroOpacity }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-stone-400">
                Scroll to explore
              </span>
              <div className="h-14 w-8 rounded-full border-2 border-white/20 p-2 backdrop-blur-sm">
                <motion.div
                  className="h-3 w-3 rounded-full bg-amber-500"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="relative z-10 border-y border-stone-800 bg-stone-900/80 py-12 backdrop-blur-md">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeInOnScroll key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mb-1 text-3xl font-bold text-amber-400 md:text-4xl">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-stone-500">{stat.label}</div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>

        {/* ===== FEATURED BEERS ===== */}
        <section className="py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <FadeInOnScroll>
                <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                  Top Rated
                </span>
              </FadeInOnScroll>
              <h2 className="text-4xl font-bold md:text-6xl">
                <WordReveal text="Featured Brews" />
              </h2>
            </div>

            <StaggerContainerOnScroll
              staggerDelay={0.15}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {featuredBeers.map((beer) => (
                <StaggerItem key={beer.id}>
                  <TiltCard tiltAmount={10} className="h-full">
                    <motion.div
                      className="group h-full cursor-pointer rounded-2xl bg-stone-900 p-1"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`mb-0 aspect-[4/3] rounded-xl bg-gradient-to-br ${beer.gradient} flex items-center justify-center overflow-hidden`}
                      >
                        <motion.span
                          className="text-6xl"
                          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          🍺
                        </motion.span>
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-stone-800 px-3 py-0.5 text-xs text-stone-400">
                            {beer.style}
                          </span>
                          <span className="text-xs text-amber-500">
                            {beer.abv} ABV
                          </span>
                        </div>
                        <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-amber-400">
                          {beer.name}
                        </h3>
                        <p className="mb-2 text-sm text-stone-500">
                          {beer.brewery}
                        </p>
                        <p className="mb-3 text-xs leading-relaxed text-stone-400">
                          {beer.description}
                        </p>
                        <StarRating rating={beer.rating} />
                      </div>
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainerOnScroll>

            <FadeInOnScroll delay={0.6}>
              <div className="mt-12 text-center">
                <MagneticButton>
                  <Link
                    href="/beers"
                    className="inline-flex items-center gap-2 text-amber-500 transition-colors hover:text-amber-400"
                  >
                    View all beers
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </MagneticButton>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ===== BEER STYLES ===== */}
        <section className="overflow-hidden bg-stone-900 py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <FadeInOnScroll>
                <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                  Categories
                </span>
              </FadeInOnScroll>
              <h2 className="text-4xl font-bold md:text-6xl">
                <WordReveal text="Find Your Style" />
              </h2>
            </div>

            <StaggerContainerOnScroll
              staggerDelay={0.08}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
            >
              {beerStyles.map((style) => (
                <StaggerItem key={style.name}>
                  <MagneticButton strength={0.2}>
                    <motion.div
                      className="group cursor-pointer rounded-2xl bg-stone-800 p-6 text-center"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${style.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl">{style.icon}</span>
                      </motion.div>
                      <h3 className="mb-1 font-semibold transition-colors group-hover:text-amber-400">
                        {style.name}
                      </h3>
                      <p className="text-sm text-stone-500">{style.count} beers</p>
                    </motion.div>
                  </MagneticButton>
                </StaggerItem>
              ))}
            </StaggerContainerOnScroll>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-20 text-center">
              <FadeInOnScroll>
                <span className="mb-4 inline-block text-sm uppercase tracking-widest text-amber-500">
                  Simple & Fun
                </span>
              </FadeInOnScroll>
              <h2 className="text-4xl font-bold md:text-6xl">
                <WordReveal text="How It Works" />
              </h2>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent md:block" />

              {[
                {
                  step: "01",
                  title: "Discover",
                  desc: "Browse thousands of craft beers from breweries near you and around the world.",
                },
                {
                  step: "02",
                  title: "Taste & Rate",
                  desc: "Log your tasting notes, rate appearance, aroma, taste, and mouthfeel.",
                },
                {
                  step: "03",
                  title: "Share & Connect",
                  desc: "Share reviews, follow fellow enthusiasts, and build your beer journey.",
                },
              ].map((item, i) => (
                <FadeInOnScroll
                  key={item.step}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.2}
                >
                  <div
                    className={`mb-16 flex items-center gap-8 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col`}
                  >
                    <div className="flex-1 text-center md:text-left">
                      <span className="mb-2 inline-block text-5xl font-bold text-amber-500/20">
                        {item.step}
                      </span>
                      <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                      <p className="text-stone-400">{item.desc}</p>
                    </div>
                    <motion.div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-stone-900"
                      whileHover={{ scale: 1.2, borderColor: "#f59e0b" }}
                      whileInView={{
                        boxShadow: [
                          "0 0 0 0 rgba(245, 158, 11, 0)",
                          "0 0 0 20px rgba(245, 158, 11, 0)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-2xl font-bold text-amber-500">
                        {item.step}
                      </span>
                    </motion.div>
                    <div className="hidden flex-1 md:block" />
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700" />
          <BeerBubbles count={20} />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <FadeInOnScroll>
              <h2 className="mb-6 text-4xl font-bold text-stone-950 md:text-6xl">
                <WordReveal text="Ready to Tap In?" className="text-stone-950" />
              </h2>
            </FadeInOnScroll>
            <LineReveal delay={0.3}>
              <p className="mb-10 text-lg text-stone-800 md:text-xl">
                Join thousands of craft beer lovers. Your next favorite beer is
                waiting to be discovered.
              </p>
            </LineReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton strength={0.4}>
                <motion.button
                  className="rounded-full bg-stone-950 px-10 py-5 text-lg font-semibold text-white shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Started — It&apos;s Free
                </motion.button>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-stone-800 bg-stone-950 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
              <motion.span
                className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-2xl font-bold text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                BroBeerMe
              </motion.span>
              <div className="flex gap-8 text-sm text-stone-500">
                {["Beers", "Breweries", "Blog", "About"].map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="transition-colors hover:text-amber-400"
                    whileHover={{ y: -2 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="text-center text-sm text-stone-600">
              <p>© 2025 BroBeerMe. Drink responsibly.</p>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
