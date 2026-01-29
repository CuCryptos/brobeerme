"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StarRatingInteractiveProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const sizes = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
};

export function StarRatingInteractive({
  rating,
  size = "md",
  interactive = false,
  onRate,
}: StarRatingInteractiveProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const displayRating = hoveredStar || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${sizes[size]} transition-colors ${
            star <= displayRating ? "text-amber-400" : "text-stone-700"
          } ${interactive ? "cursor-pointer" : "cursor-default"}`}
          onMouseEnter={() => interactive && setHoveredStar(star)}
          onMouseLeave={() => interactive && setHoveredStar(0)}
          onClick={() => interactive && onRate?.(star)}
          whileHover={interactive ? { scale: 1.3 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
        >
          ★
        </motion.button>
      ))}
    </div>
  );
}
