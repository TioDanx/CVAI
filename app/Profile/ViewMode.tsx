"use client";

import React from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/UserProfile";

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-200 ring-1 ring-white/10">
    {children}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-6">
    <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary/80">
      {title}
    </h2>
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
      {children}
    </div>
  </section>
);

export default function ViewMode({
  profile,
  user,
  setIsEditing,
}: {
  profile: UserProfile;
  user: User;
  setIsEditing: (value: boolean) => void;
}) {
  const toList = (csv?: string) =>
    (csv || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const softSkills = toList(profile.softSkills);
  const hardSkills = toList(profile.hardSkills);
  const languages = toList(profile.languages);

  return (
    <>
      <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {profile.name || user.displayName || "Tu nombre"}
          </h3>
          <p className="text-sm text-gray-300">{profile.shortDescription}</p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="rounded-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/5"
        >
          Editar
        </button>
      </div>

      <Section title="Contacto">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">Teléfono</p>
            <p className="text-sm text-gray-100">{profile.phone || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="break-all text-sm text-gray-100">{profile.mail || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Idiomas</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {languages.length ? languages.map((l) => <Chip key={l}>{l}</Chip>) : "—"}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Habilidades">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-200">Hard skills</p>
            <div className="flex flex-wrap gap-2">
              {hardSkills.length ? hardSkills.map((s) => <Chip key={s}>{s}</Chip>) : "—"}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-2 00">Soft skills</p>
            <div className="flex flex-wrap gap-2">
              {softSkills.length ? softSkills.map((s) => <Chip key={s}>{s}</Chip>) : "—"}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Experiencia laboral">
        <ul className="space-y-4">
          {profile.experience?.length ? (
            profile.experience.map((exp, i) => (
              <li key={`${exp.company}-${exp.role}-${i}`} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    {exp.role} <span className="text-gray-400">·</span> {exp.company}
                  </h4>
                  <span className="text-xs text-gray-400">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-line text-sm text-gray-300">
                    {exp.description}
                  </p>
                )}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-300">Sin experiencia cargada.</li>
          )}
        </ul>
      </Section>

      <Section title="Educación">
        <ul className="space-y-2">
          {profile.education?.length ? (
            profile.education.map((edu, i) => (
              <li key={`${edu.institution}-${edu.degree}-${i}`} className="text-sm text-gray-100">
                <span className="font-medium">{edu.degree}</span>{" "}
                <span className="text-gray-300">— {edu.institution}</span>{" "}
                <span className="text-gray-400">({edu.year})</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-300">Sin formación cargada.</li>
          )}
        </ul>
      </Section>
    </>
  );
}
