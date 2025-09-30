"use client";

import React, { useEffect } from "react";
import { User } from "firebase/auth";
import { useForm, useFieldArray } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/types/UserProfile";

type FormData = {
  name: string;
  shortDescription: string;
  phone: string;
  mail: string;
  languages: string;
  softSkills: string;
  hardSkills: string;
  experience: { company: string; role: string; duration: string; description?: string }[];
  education: { institution: string; degree: string; year: string }[];
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30 ${props.className || ""}`}
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30 ${props.className || ""}`}
  />
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-1 block text-sm font-medium text-gray-200">{children}</label>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary/80">
    {children}
  </h2>
);

export default function EditMode({
  profile,
  user,
  setIsLoading,
  setIsEditing,
  setProfile,
}: {
  profile: UserProfile;
  user: User;
  setIsLoading: (arg: boolean) => void;
  setIsEditing: (arg: boolean) => void;
  setProfile: (data: UserProfile) => void;
}) {
  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: profile as unknown as FormData,
  });

  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experience" });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (!user) return;

    const normalizeCsv = (v: string) =>
      (v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");

    const oneExperience = (Array.isArray(data.experience) ? data.experience : []).slice(0, 1);

    const profileData: UserProfile = {
      ...data,
      experience: oneExperience as any,
      softSkills: normalizeCsv(data.softSkills),
      hardSkills: normalizeCsv(data.hardSkills),
      languages: normalizeCsv(data.languages),
    } as unknown as UserProfile;

    try {
      setProfile(profileData);
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, profileData, { merge: true });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset(profile as unknown as FormData);
  }, [profile, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-white">
      <section>
        <SectionTitle>Personal info</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <Input {...register("name")} placeholder="e.g., Daniela Pérez" />
          </div>

          <div className="sm:col-span-2">
            <Label>Short description</Label>
            <Textarea rows={3} {...register("shortDescription")} placeholder="Brief summary of your professional profile…" />
          </div>

          <div>
            <Label>Phone</Label>
            <Input {...register("phone")} placeholder="e.g., +54 9 11 1234 5678" />
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register("mail")} placeholder="you@email.com" />
          </div>

          <div className="sm:col-span-2">
            <Label>Languages (comma-separated)</Label>
            <Input {...register("languages")} placeholder="Spanish, English (B2)" />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Skills</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Hard skills (comma)</Label>
            <Input {...register("hardSkills")} placeholder="React, TypeScript, Testing, SQL…" />
          </div>
          <div>
            <Label>Soft skills (comma)</Label>
            <Input {...register("softSkills")} placeholder="Teamwork, Communication…" />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Work experience (only the most relevant)</SectionTitle>
        <div className="space-y-5">
          {experienceFields.slice(0, 1).map((field, index) => (
            <div key={field.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <Label>Company</Label>
                  <Input {...register(`experience.${index}.company`)} placeholder="Acme Inc." />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input {...register(`experience.${index}.role`)} placeholder="Front-end Developer" />
                </div>
                <div>
                  <Label>Dates</Label>
                  <Input {...register(`experience.${index}.duration`)} placeholder="2023 – Present" />
                </div>
                <div className="sm:col-span-3">
                  <Label>Description</Label>
                  <Textarea rows={3} {...register(`experience.${index}.description`)} placeholder="Responsibilities, achievements, and tech…" />
                </div>
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-sm font-medium text-rose-400 hover:text-rose-300"
                >
                  Remove experience
                </button>
              </div>
            </div>
          ))}

          {experienceFields.length === 0 && (
            <button
              type="button"
              onClick={() => addExperience({ company: "", role: "", duration: "", description: "" })}
              className="text-sm font-semibold text-primary hover:underline"
            >
              + Add experience
            </button>
          )}
        </div>
      </section>

      <section>
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-5">
          {educationFields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <Label>Institution</Label>
                  <Input {...register(`education.${index}.institution`)} placeholder="University / Institute" />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input {...register(`education.${index}.degree`)} placeholder="BSc / Diploma" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input {...register(`education.${index}.year`)} placeholder="2024" />
                </div>
              </div>
              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-sm font-medium text-rose-400 hover:text-rose-300"
                >
                  Remove education
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEducation({ institution: "", degree: "", year: "" })}
            className="text-sm font-semibold text-primary hover:underline"
          >
            + Add education
          </button>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-primary to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-white/15 hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
