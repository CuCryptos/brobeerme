"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  wobble: number;
}

export function BeerBubbles({ count = 30 }: { count?: number }) {
  const bubbles = useRef<Bubble[]>(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
      wobble: Math.random() * 30 + 10,
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: "-20px",
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%, rgba(245, 158, 11, ${bubble.opacity + 0.1}), rgba(217, 119, 6, ${bubble.opacity}))`,
            boxShadow: `inset -1px -1px 2px rgba(0,0,0,0.1), 0 0 ${bubble.size}px rgba(245, 158, 11, ${bubble.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight + 40 : 1000)],
            x: [0, bubble.wobble, -bubble.wobble, bubble.wobble * 0.5, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            y: {
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "linear",
            },
            x: {
              duration: bubble.duration * 0.8,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            },
            scale: {
              duration: bubble.duration * 0.6,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
