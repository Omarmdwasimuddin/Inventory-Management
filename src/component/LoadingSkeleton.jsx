"use client";

import React from "react";

export default function LoadingSkeleton({ variant = "card", count = 3 }) {
  const items = Array.from({ length: count });

  if (variant === "avatar") {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse" aria-hidden>
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
              <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="space-y-4 animate-pulse" aria-hidden>
            <div className="h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((_, i) => (
        <article
          key={i}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white/60 dark:bg-gray-900/60 shadow-sm"
          aria-hidden
        >
          <div className="h-28 w-full sm:w-32 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />

          <div className="flex-1 w-full">
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>

          <div className="hidden sm:block h-8 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </article>
      ))}
    </div>
  );
}
