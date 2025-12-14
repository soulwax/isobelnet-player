// File: src/components/AutoQueueBadge.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AutoQueueBadgeProps {
  count: number;
  onDismiss?: () => void;
}

export function AutoQueueBadge({ count, onDismiss }: AutoQueueBadgeProps) {
  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={onDismiss}
        className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-2.5 py-1 shadow-lg hover:bg-[var(--color-accent-strong)] transition-colors"
        aria-label={`${count} tracks added to queue`}
        title="Auto-queue added tracks"
      >
        <Sparkles className="h-3 w-3 text-white" />
        <span className="text-xs font-semibold text-white">+{count}</span>
      </motion.button>
    </AnimatePresence>
  );
}
