"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RatingBarProps {
  label: string;
  value: number;
  maxValue?: number;
  delay?: number;
}

export function RatingBar({ label, value, maxValue = 5, delay = 0 }: RatingBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percentage = (value / maxValue) * 100;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-stone-400">{label}</span>
        <span className="font-medium text-amber-400">{value}/{maxValue}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </div>
  );
}
