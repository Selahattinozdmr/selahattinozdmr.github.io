"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Avoids reading the clock during prerender (cacheComponents); hydrates to the live year.
export default function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
  return <>{year}</>;
}
