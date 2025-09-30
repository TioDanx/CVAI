// components/WhyUs.tsx
import React from "react";

const features = [
  {
    title: "ATS-Friendly",
    desc: "CV.AI structures your resume with the right keywords and formatting so it sails through Applicant Tracking Systems while staying human-readable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 3l9 6v6l-9 6-9-6V9l9-6zm0 2.2L5 9l7 4.8L19 9 12 5.2zM7 13.2v2.4L12 19l5-3.4v-2.4L12 16.6 7 13.2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Tailored to Each Job",
    desc: "Every application gets its own focus — highlighting the most relevant achievements and skills for that specific role.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M4 4h10l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm10 1.5V8h2.5L14 5.5z"
          fill="currentColor"
        />
        <path d="M6 10h8v2H6zm0 4h8v2H6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Achievement-Driven",
    desc: "We craft bullet points with strong action verbs and measurable impact — no fluff, just clear results.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M3 13h4l3-8 4 14 3-6h4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Fast & Consistent",
    desc: "Generate a polished one-page resume in minutes while keeping your personal brand consistent across all applications.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M13 3a9 9 0 1 1-6.36 2.64"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M13 8v6l4 2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="relative w-full bg-black py-20">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 h-[40vmin] w-[100vmin] -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <header className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Why use CV.AI
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Boost your chances of landing interviews
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            We build resumes that combine{" "}
            <span className="text-secondary">relevance</span>,{" "}
            <span className="text-secondary">clarity</span>, and{" "}
            <span className="text-secondary">ATS-compatibility</span> — so your
            profile stands out for both machines and recruiters.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={i}
              className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/50 via-white/5 to-transparent opacity-70 blur-[2px]" />
              <div className="relative h-full rounded-2xl bg-white/5 p-5 backdrop-blur-md ring-1 ring-white/10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {f.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-extrabold text-white">+80%</p>
            <p className="text-xs text-white/70">
              better keyword match with job postings*
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-extrabold text-white">1 page</p>
            <p className="text-xs text-white/70">
              concise Harvard-style format
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-extrabold text-white">Minutes</p>
            <p className="text-xs text-white/70">
              to personalize each application
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-white/50">
          *Estimates based on ATS best-practice alignment; results may vary.
        </p>
      </div>
    </section>
  );
}
