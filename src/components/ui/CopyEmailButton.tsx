"use client";

import { useEffect, useState } from "react";

export default function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: {
  email: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-fg/[0.04] px-6 py-3 text-sm font-medium text-fg transition hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {copied ? (
          <path d="m5 12 5 5 9-10" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
