"use client";

import { motion } from "framer-motion";
import { BeerReview } from "@/lib/types";
import { StarRatingInteractive } from "./StarRatingInteractive";
import { RatingBar } from "./RatingBar";

interface ReviewCardProps {
  review: BeerReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-sm font-bold text-stone-950">
            {initials}
          </div>
          <div>
            <p className="font-semibold">{review.author}</p>
            <p className="text-xs text-stone-500">
              {new Date(review.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <StarRatingInteractive rating={review.rating} size="sm" />
      </div>

      <p className="mb-4 text-sm leading-relaxed text-stone-300">{review.content}</p>

      <div className="grid grid-cols-2 gap-3">
        <RatingBar
          label="Appearance"
          value={review.tastingNotes.appearance}
          delay={0}
        />
        <RatingBar
          label="Aroma"
          value={review.tastingNotes.aroma}
          delay={0.1}
        />
        <RatingBar
          label="Taste"
          value={review.tastingNotes.taste}
          delay={0.2}
        />
        <RatingBar
          label="Mouthfeel"
          value={review.tastingNotes.mouthfeel}
          delay={0.3}
        />
      </div>
    </motion.div>
  );
}
