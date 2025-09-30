"use client";

import ViewMode from "./ViewMode";
import EditMode from "./EditMode";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { Loader } from "@deemlol/next-icons";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, setProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user)
    return (
      <section className="mx-auto max-w-5xl px-4 py-24 text-center text-gray-300">
        Please sign in to view your profile
      </section>
    );

  return (
    <section className="relative isolate min-h-dvh w-full bg-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4
            h-[70vmin] w-[70vmin] rounded-full
            bg-[radial-gradient(circle,_var(--primary)_30%,_transparent_70%)]
            opacity-35 blur-[100px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary/80">
              YOUR PROFILE
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Keep your personal and work info up to date to generate tailored CVs for each role.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-gradient-to-r from-[var(--primary)] to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
            >
              Edit profile
            </button>
          )}
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-[var(--primary)]">
              <Loader size={28} />
            </div>
          ) : !isEditing ? (
            <ViewMode profile={profile} user={user} setIsEditing={setIsEditing} />
          ) : (
            <EditMode
              profile={profile}
              user={user}
              setIsLoading={setIsLoading}
              setIsEditing={setIsEditing}
              setProfile={setProfile}
            />
          )}
        </div>
      </div>
    </section>
  );
}
