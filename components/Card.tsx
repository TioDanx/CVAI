import React from "react";
import Link from "next/link";

interface ICardProps {
  title: string;
  description: string;
  cta: string;
}

const Card = ({ title, description, cta }: ICardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md py-30">

      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-40 bg-gradient-to-br from-blue-200/30 via-transparent to-purple-200/30 blur-2xl" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header>
          <h3 className="text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-md text-gray-600">{description}</p>
        </header>

        <div className="mt-4 pt-2">
          <Link
            href={cta}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label={`${title} - abrir`}
          >
            {title}
            <svg
              className="w-4 h-4 rtl:rotate-180"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;
