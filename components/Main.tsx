import React from "react";
import Card from "@/components/Card";
import Link from "next/link";
import DarkVeil from "./DarkVeil";
const Main = () => {
  return (
    <main className="w-full h-full bg-black">
      <div className="absolute top-0 left-0 w-full h-[calc(100dvh-16px)]">
        <DarkVeil />
      </div>
      <section className="relative w-full h-[calc(100dvh-16px)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 flex flex-column justify-center items-center h-full">
          <div className="max-w-3xl ">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-white -mt-[20%]">
              Generate personalised CV's based on real job offers
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 w-[70%]">
              Create a profile and start sending custom-made CV's that
              recruiters just can't ignore.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/Profile"
                className="rounded-lg bg-purple-700 px-10 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:bg-purple-600 transition-all duration-300"
              >
                Start now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
