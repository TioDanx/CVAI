"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserQuota = {
  quota: number | null;   
  used: number;           
  unlimited: boolean;     
  remaining: number | "∞";
  loading: boolean;
  error?: string;
};

export function useUserQuota(uid?: string | null) {
  const [state, setState] = useState<UserQuota>({
    quota: null,
    used: 0,
    unlimited: false,
    remaining: 0,
    loading: !!uid,
  });

  useEffect(() => {
    if (!uid) {
      setState({
        quota: null,
        used: 0,
        unlimited: false,
        remaining: 0,
        loading: false,
      });
      return;
    }

    const ref = doc(db, "users", uid);
    const unsub = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      (snap) => {
        console.log(snap.data())
        const data = snap.data() as { cvCredits?: number; cvUsed?: number; unlimited?: boolean } | undefined;
        const quota = data?.cvCredits ?? 0;
        const used = data?.cvUsed ?? 0;
        const unlimited = Boolean(data?.unlimited);
        const remaining = unlimited ? ("∞" as const) : Math.max(quota - used, 0);

        setState({ quota, used, unlimited, remaining, loading: false });
      },
      (err) => {
        setState((s) => ({ ...s, loading: false, error: err.message }));
      }
    );

    return () => unsub();
  }, [uid]);

  return state;
}
