"use client";
import React, { useRef } from "react";
import { generatePDF } from "@/utils/generatePDF";
import CVData from "@/types/CVData";

const dict = {
  es: {
    profile: "Perfil profesional",
    education: "Educación",
    experience: "Experiencia laboral",
    hard: "Habilidades técnicas",
    soft: "Habilidades blandas",
    languages: "Idiomas",
    download: "Descargar PDF",
  },
  en: {
    profile: "Professional Summary",
    education: "Education",
    experience: "Work Experience",
    hard: "Technical Skills",
    soft: "Soft Skills",
    languages: "Languages",
    download: "Download PDF",
  },
};

function normalizeLinkedin(url?: string) {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function GeneratedCV({
  data,
  lang,
}: {
  data: CVData;
  lang: "es" | "en";
}) {
  const cvRef = useRef<HTMLDivElement>(null);
  const t = lang === "es" ? dict.es : dict.en;

  const handleDownloadPDF = () => {
    if (!cvRef.current) return;
    generatePDF(data, lang);
  };

  const hard = data.additional_info?.hard_skills ?? [];
  const soft = data.additional_info?.soft_skills ?? [];
  const langs = data.additional_info?.languages ?? [];
  const experiences = data.experience ?? [];
  const education = data.education ?? [];

  return (
    <div className="relative">
      {/* Header actions */}
      <div className="mb-4 flex items-center justify-end">
        <button
          onClick={handleDownloadPDF}
          className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                     px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95
                     focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/40"
        >
          {t.download}
        </button>
      </div>

      {/* Card */}
      <div
        ref={cvRef}
        className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-white/10
                   bg-white/[0.04] p-6 text-gray-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                   backdrop-blur-md sm:p-8"
      >
        {/* Contact / Header */}
        <div>
          <h1 className="mb-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {data.contact_info.name}
            {data.contact_info.role ? (
              <span className="text-gray-300"> — {data.contact_info.role}</span>
            ) : null}
          </h1>

          <div className="text-sm text-gray-300">
            <span>{data.contact_info.email}</span>
            {data.contact_info.phone && <span className="mx-2">·</span>}
            <span>{data.contact_info.phone}</span>
            {data.contact_info.linkedin && (
              <>
                <span className="mx-2">·</span>
                <a
                  href={normalizeLinkedin(data.contact_info.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[var(--secondary)]/60 underline-offset-4 hover:text-white"
                >
                  {data.contact_info.linkedin}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.description && (
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/80">
              {t.profile}
            </h2>
            <p className="leading-relaxed text-gray-200">{data.description}</p>
          </section>
        )}

        {/* Experience */}
        {!!experiences.length && (
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/80">
              {t.experience}
            </h2>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <article
                  key={`${exp.company}-${exp.position}-${i}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {exp.position} <span className="text-gray-400">·</span>{" "}
                      {exp.company}
                    </h3>
                    <p className="text-xs text-gray-400">{[exp.location, exp.dates].filter(Boolean).join(" · ")}</p>
                  </div>
                  {exp.bullet_points?.length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-200">
                      {exp.bullet_points.map((bp, j) => (
                        <li key={j}>{bp}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {!!education.length && (
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/80">
              {t.education}
            </h2>
            <ul className="space-y-2 text-sm text-gray-200">
              {education.map((edu, i) => (
                <li key={`${edu.institution}-${edu.degree}-${i}`}>
                  <strong className="text-white">{edu.degree}</strong>
                  {", "} {edu.institution}{" "}
                  {edu.year && <span className="text-gray-400">({edu.year})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills grid */}
        {(hard.length || soft.length || langs.length) && (
          <section>
            <div className="grid gap-4 sm:grid-cols-3">
              {!!hard.length && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/80">
                    {t.hard}
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-200">
                    {hard.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!soft.length && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/80">
                    {t.soft}
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-200">
                    {soft.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!langs.length && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/80">
                    {t.languages}
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-200">
                    {langs.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
