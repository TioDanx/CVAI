import React from "react";
import Image from "next/image";

type Step = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const StepsSection = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Register",
      desc: "Create your account in seconds with email or Google.",
      img: "/register.png",
    },
    {
      id: 2,
      title: "Complete your profile",
      desc: "Add your experience, education and key skills.",
      img: "/profile.png",
    },
    {
      id: 3,
      title: "Paste the job offer",
      desc: "We tailor your resume to match the role and keywords.",
      img: "/job.png",
    },
    {
      id: 4,
      title: "Download your resume",
      desc: "Preview, refine, and export your ATS-friendly PDF.",
      img: "/download.png",
    },
  ];

  return (
    <section className="relative w-full bg-black py-20">
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
        <div
          className="
        mt-[-4rem]
        h-[60vmin] w-[100vmin] rounded-full
        bg-[radial-gradient(circle,_var(--primary)_35%,_transparent_70%)]
        opacity-40 blur-[80px]
      "
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          How does it work?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-300">
          From signup to a polished, tailored resume — in just a few steps.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.id}
              className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1 cursor-pointer mb-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/60 via-white/5 to-[var(--primary)]/30 opacity-80 blur-[2px]" />
              <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10">
                <div className="absolute -top-3 -left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-white shadow-md ring-1 ring-[var(--primary)]/40">
                  {step.id}
                </div>

                <div className="relative mx-auto mt-8 h-28 w-28 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Image
                    alt={step.title}
                    src={step.img}
                    fill
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="px-5 pb-6 pt-5 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    {step.desc}
                  </p>
                </div>

                <div className="mx-5 mb-5 flex items-center justify-center gap-2">
                  <span className="h-px flex-1 bg-white/10" />
                  <svg
                    className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
