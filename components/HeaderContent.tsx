"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const HeaderContent = () => {
  const { user, logout, loginWithGoogle } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {[
        { href: "/Profile", label: "Profile" },
        { href: "/Personalise", label: "Generate CV" },
        { href: "/Donate", label: "Donate" },
        { href: "/Contact", label: "Contact" },
      ].map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClick}
          className={`relative text-sm text-gray-200 hover:text-white transition-colors
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
            after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 
            after:transition-[width] after:duration-300 hover:after:w-full`}
        >
          {l.label}
        </Link>
      ))}
    </>
  );

  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      await loginWithGoogle();
      setMobileOpen(false);
    } catch (e) {
      console.error("Google login failed", e);
      // opcional: mostrar toast/toaster si tenés uno
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 ${jakarta.className} transition-all duration-300`}>
      <div
        className={`mx-auto max-w-6xl px-4 ${
          scrolled ? "h-14" : "h-16"
        } flex items-center justify-between rounded-b-2xl
        backdrop-blur-xl bg-gradient-to-r from-[#3C005E]/90 via-purple-700/70 to-[#3C005E]/90
        shadow-[0_2px_20px_rgba(60,0,94,0.3)] transition-all duration-300`}
      >
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-100 hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/"
            className={`font-semibold tracking-tight bg-gradient-to-r from-pink-300 to-purple-100 bg-clip-text text-transparent
              ${scrolled ? "text-xl" : "text-2xl"}`}
          >
            AICV
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="text-sm font-medium text-pink-300 hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>
            <Image
              src={user.photoURL || "/default-avatar.jpg"}
              alt="User avatar"
              width={34}
              height={34}
              className="rounded-full ring-2 ring-pink-400"
            />
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            disabled={authLoading}
            className="inline-flex items-center gap-2 rounded-lg 
              bg-gradient-to-r from-pink-500 to-purple-700
              px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60"
          >
            {authLoading ? "Conectando…" : "Iniciar sesión"}
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[80%] max-w-xs bg-gradient-to-b from-[#3C005E]/95 to-purple-800/90
          backdrop-blur-xl shadow-xl transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 h-14">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-semibold text-white tracking-tight"
            >
              AICV
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-4 flex flex-col gap-3 px-6 text-gray-200">
            <NavLinks onClick={() => setMobileOpen(false)} />
          </nav>

          <div className="mt-6 border-t border-white/20 px-6 pt-4">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {authLoading ? "Conectando…" : "Iniciar sesión"}
              </button>
            )}
          </div>
        </aside>
      </div>
    </header>
  );
};

export default HeaderContent;
