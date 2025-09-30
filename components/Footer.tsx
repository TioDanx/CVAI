"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("¡Gracias! Te avisaremos de las novedades.");
  };

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full  bg-black text-gray-300">
 
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              RESUME.AI
            </Link>
            <p className="mt-3 text-sm text-white/80">
              Generate optimized resumes from your profile and a job offer. Simple, quick and professional.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Novedades
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Recibí updates y mejoras del generador de CV.
            </p>
            <form onSubmit={onSubmit} className="mt-3 flex gap-2">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
              >
                Suscribirme
              </button>
            </form>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              No spam. Podés desuscribirte cuando quieras.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/Profile" className="hover:text-gray-900 dark:hover:text-white">
                  Perfil
                </Link>
              </li>
              <li>
                <Link href="/Personalise" className="hover:text-gray-900 dark:hover:text-white">
                  Personalizar CV
                </Link>
              </li>
              <li>
                <Link href="/Donate" className="hover:text-gray-900 dark:hover:text-white">
                  Donar
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="hover:text-gray-900 dark:hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Conectar
            </h3>
            <div className="mt-3 flex gap-3">
              <a
                href="https://github.com/TioDanx"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-gray-300 hover:bg-gray-100 dark:ring-gray-700 dark:hover:bg-gray-900"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.21.69.83.57A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-campuzano-7149552b7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-gray-300 hover:bg-gray-100 dark:ring-gray-700 dark:hover:bg-gray-900"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06c.53-1 1.82-2.2 3.76-2.2 4.02 0 4.77 2.65 4.77 6.1V24h-4v-7.1c0-1.7-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.74V24h-4V8z" />
                </svg>
              </a>
            </div>

            <div className="mt-4 text-sm">
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
                Términos
              </Link>
              <span className="mx-2 text-gray-400">•</span>
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                Privacidad
              </Link>
              <span className="mx-2 text-gray-400">•</span>
              <Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-gray-600 sm:flex-row dark:text-gray-400">
          <p>
            © {year} Daniel Campuzano — All rights reserved
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollTop}
              className="rounded-lg px-3 py-1.5 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:ring-gray-700 dark:hover:bg-gray-900"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              ↑ Volver arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
