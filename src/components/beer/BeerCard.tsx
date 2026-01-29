"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Beer } from "@/lib/types";
import { TiltCard } from "@/components/animations/TiltCard";
import { StarRatingInteractive } from "./StarRatingInteractive";

interface BeerCardProps {
  beer: Beer;
}

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

export function BeerCard({ beer }: BeerCardProps) {
  const gradient =
    styleGradients[beer.style] || "from-amber-500 via-yellow-500 to-orange-400";

  return (
    <TiltCard tiltAmount={8} className="h-full">
      <Link href={`/beers/${beer.slug}`}>
        <motion.div
          className="group h-full cursor-pointer rounded-2xl bg-stone-900 p-1"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-6xl opacity-50"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🍺
              </motion.span>
            </div>
            {/* ABV badge */}
            <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
              {beer.abv}% ABV
            </div>
          </div>

          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-stone-800 px-3 py-0.5 text-xs text-stone-400">
                {beer.style}
              </span>
              {beer.ibu && (
                <span className="text-xs text-stone-500">{beer.ibu} IBU</span>
              )}
            </div>
            <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-amber-400">
              {beer.name}
            </h3>
            <p className="mb-3 text-sm text-stone-500">{beer.brewery}</p>
            <div className="flex items-center justify-between">
              <StarRatingInteractive rating={Math.round(beer.rating)} size="sm" />
              <span className="text-xs text-stone-500">
                {beer.reviewCount} reviews
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </TiltCard>
  );
}
