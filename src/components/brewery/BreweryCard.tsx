"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brewery } from "@/lib/types";
import { TiltCard } from "@/components/animations/TiltCard";

interface BreweryCardProps {
  brewery: Brewery;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export function BreweryCard({
  brewery,
  isActive = false,
  onHover,
  onLeave,
}: BreweryCardProps) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = brewery.hours?.[today] || "Hours not available";

  return (
    <TiltCard tiltAmount={6}>
      <Link href={`/breweries/${brewery.slug}`}>
        <motion.div
          className={`group cursor-pointer rounded-2xl border p-5 transition-colors ${
            isActive
              ? "border-amber-500/50 bg-amber-500/5"
              : "border-stone-800 bg-stone-900 hover:border-stone-700"
          }`}
          whileHover={{ y: -3 }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold transition-colors group-hover:text-amber-400">
                {brewery.name}
              </h3>
              <p className="text-sm text-stone-500">
                {brewery.location.city}, {brewery.location.state}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-stone-800 px-2.5 py-1">
              <span className="text-sm text-amber-400">★</span>
              <span className="text-sm font-medium">{brewery.rating}</span>
            </div>
          </div>

          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-stone-400">
            {brewery.description}
          </p>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-stone-500">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                className={
                  todayHours === "Closed" ? "text-red-400" : "text-green-400"
                }
              >
                {todayHours === "Closed" ? "Closed Today" : todayHours}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-stone-500">
              <svg
                className="h-3.5 w-3.5"
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
              <span>{brewery.location.address}</span>
            </div>
          </div>

          {/* Beer count */}
          <div className="mt-3 border-t border-stone-800 pt-3">
            <span className="text-xs text-stone-500">
              {brewery.beers.length} beer{brewery.beers.length !== 1 ? "s" : ""}{" "}
              on tap · {brewery.reviewCount} reviews
            </span>
          </div>
        </motion.div>
      </Link>
    </TiltCard>
  );
}
