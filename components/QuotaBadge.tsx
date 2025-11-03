"use client";
import React from "react";
import { useUserQuota } from "@/hooks/useUserQuota";

export default function QuotaBadge({ uid }: { uid?: string | null }) {
  const { remaining, loading, unlimited } = useUserQuota(uid);

  if (!uid) return null;

  return (
    <span
      title={unlimited ? "Unlimited CVs" : "Remaining CVs"}
      className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/15 "
    >
      <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-80">
        <path
          d="M12 3l2.09 6.26H21l-5.17 3.76L17.91 21 12 16.98 6.09 21l2.08-7.98L3 9.26h6.91L12 3z"
          fill="currentColor"
        />
      </svg>
      {loading ? "…" : remaining}
    </span>
  );
}
