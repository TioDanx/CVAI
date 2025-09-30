"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const tiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    blurb: "Get started with basic access.",
    cta: "Start for free",
    href: "/Personalise",
    gradient: "from-white/15 to-white/0",
    features: [
      "5 CV generations",
      "ATS-friendly format",
      "ES/EN language support",
      "Download as PDF",
    ],
    limits: "5 CVs total",
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$10",
    blurb: "Perfect for active job seekers.",
    cta: "Get Starter",
    href: "/checkout?plan=starter",
    gradient: "from-primary/35 to-secondary/20",
    features: [
      "50 CV generations",
      "ATS keyword alignment",
      "Priority generation queue",
      "Email support",
    ],
    limits: "50 CVs",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$20",
    blurb: "For heavy usage and ongoing searches.",
    cta: "Get Pro",
    href: "/checkout?plan=pro",
    gradient: "from-secondary/45 to-primary/35",
    features: [
      "100 CV generations",
      "Faster queue + retries",
      "Early access to new templates",
      "Priority support",
    ],
    limits: "100 CVs",
    highlight: true, // Puedes dejar este como destacado
  },
];


export default function PricingPage() {
  const router = useRouter();

  return (
    <section className="relative isolate min-h-dvh w-full bg-black pt-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-8rem] -translate-x-1/2 h-[70vmin] w-[70vmin] rounded-full opacity-30 blur-[100px]
          bg-[radial-gradient(circle,_var(--primary)_25%,_transparent_70%)]" />
        <div className="absolute right-[-10%] top-[35%] h-[60vmin] w-[60vmin] rounded-full opacity-20 blur-[110px]
          bg-[radial-gradient(circle,_var(--secondary)_25%,_transparent_70%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
        <header className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest text-secondary/80">PRICING</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-white">Choose your plan</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">
            Start free with 3 CVs. Upgrade anytime for more generations, faster queue, and priority support.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6  xl:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.id}
              className={`group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1
                ${t.highlight ? "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" : ""}
                bg-gradient-to-br ${t.gradient}`}
            >
              <div className="relative flex h-full flex-col justify-between rounded-2xl bg-white/[0.04] p-5 backdrop-blur-md ring-1 ring-white/10">
                
                {t.highlight && (
                  <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                    Most popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">{t.price}</span>
                    {t.id !== "free" && <span className="text-xs text-gray-400">one-time</span>}
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{t.blurb}</p>
                  <p className="mt-1 text-xs text-gray-400">Limit: <span className="text-white/90">{t.limits}</span></p>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-gray-200">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className="mt-[2px] shrink-0" width="16" height="16" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="url(#g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--secondary)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {t.id === "free" ? (
                  <Link
                    href={t.href}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                  >
                    {t.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => router.push(t.href)}
                    className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow
                      ${t.highlight
                        ? "bg-gradient-to-r from-primary to-secondary hover:opacity-95"
                        : "bg-white/10 ring-1 ring-white/15 hover:bg-white/15"}`}
                  >
                    {t.cta}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Prices in USD. One-time purchase adds quota to your account instantly.
        </p>
      </div>
    </section>
  );
}
