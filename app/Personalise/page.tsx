"use client";

import { useUserProfile } from "@/contexts/UserProfileContext";
import { useState, useMemo } from "react";
import Link from "next/link";
import CVData from "@/types/CVData";
import GeneratedCV from "@/components/GeneratedCV";
import GeneratingOverlay from "@/components/GeneratingOverlay";

export default function Personalise() {
  const { profile } = useUserProfile();

  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvOutput, setCvOutput] = useState<CVData | null>(null);
  const [pdfLang, setPdfLang] = useState<"es" | "en">("en");

  const isProfileComplete = useMemo(() => {
    const { name, shortDescription, softSkills, hardSkills, experience, education } = profile || {};
    return Boolean(
      name &&
        shortDescription &&
        (softSkills?.length || 0) > 0 &&
        (hardSkills?.length || 0) > 0 &&
        (experience?.length || 0) > 0 &&
        (education?.length || 0) > 0
    );
  }, [profile]);

  const handleGenerateCV = async () => {
    setError(null);

    if (!isProfileComplete) {
      setError("Your profile is incomplete. Please fill it out before personalizing your CV.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Paste the job description to personalize your CV.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/generate-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, jobDescription, targetLang: pdfLang }),
      });

      if (!res.ok) throw new Error("Bad response");

      const data = await res.json();
      const cleaned = (data.text ?? data).toString().replace(/```json|```/g, "").trim();
      const parsed: CVData = JSON.parse(cleaned);
      setCvOutput(parsed);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the CV.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isLoading) handleGenerateCV();
    }
  };

  return (
    <section className="relative isolate min-h-dvh w-full bg-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4
            h-[66vmin] w-[66vmin] rounded-full opacity-30 blur-[100px]
            bg-[radial-gradient(circle_at_50%_50%,_var(--primary)_0%,_transparent_60%)]
          "
        />
        <div
          className="
            absolute right-[-10%] top-[30%]
            h-[60vmin] w-[60vmin] rounded-full opacity-25 blur-[110px]
            bg-[radial-gradient(circle_at_50%_50%,_var(--secondary)_0%,_transparent_65%)]
          "
        />
      </div>

      <GeneratingOverlay open={isLoading} />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">
       
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-widest text-primary/80">
            PERSONALIZE YOUR CV
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
            Personalize CV
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Paste the job description and generate a tailored CV. Then download it as a PDF.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md">
         
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-200">CV Language</label>

            <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-inset ring-white/15">
              <button
                type="button"
                onClick={() => setPdfLang("es")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  pdfLang === "es"
                    ? "text-white bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                    : "text-gray-200/90 bg-white/[0.02] hover:bg-white/[0.06]"
                }`}
                aria-pressed={pdfLang === "es"}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setPdfLang("en")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  pdfLang === "en"
                    ? "text-white bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                    : "text-gray-200/90 bg-white/[0.02] hover:bg-white/[0.06]"
                }`}
                aria-pressed={pdfLang === "en"}
              >
                EN
              </button>
            </div>
          </div>

          <label htmlFor="jd" className="mb-2 block text-sm font-medium text-gray-200">
            Job Description
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste the full job posting here (responsibilities, requirements, skills, etc.)"
            rows={8}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[var(--primary)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/30"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateCV}
              disabled={isLoading || !jobDescription.trim()}
              className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/40"
            >
              {isLoading ? "Generating…" : "Generate CV"}
            </button>

            {cvOutput && (
              <button
                onClick={() => setCvOutput(null)}
                className="text-sm font-medium text-gray-300 underline-offset-4 hover:text-white hover:underline"
              >
                Clear result
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-200">
              <p>{error}</p>
              {!isProfileComplete && (
                <p className="mt-1">
                  <Link href="/Profile" className="text-secondary underline underline-offset-4">
                    Go to complete profile
                  </Link>
                </p>
              )}
            </div>
          )}
        </section>

        {cvOutput && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-secondary/80">
              CV Preview
            </h2>
            <GeneratedCV data={cvOutput} lang={pdfLang} />
          </section>
        )}
      </div>
    </section>
  );
}
