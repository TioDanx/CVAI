"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onCancel?: () => void;
  tips?: string[];
};

const defaultTips = [
  "Afinando verbos de acción…",
  "Alineando palabras clave con la oferta…",
  "Cuantificando logros sin inventar nada…",
  "Formateando sección de educación…",
  "Puliendo bullets con punch…",
  "Chequeando consistencia de fechas…",
  "Cazando buzzwords innecesarios…",
  "Ordenando logros por impacto…",
  "Ajustando el tono al seniority del puesto…",
  "Destacando métricas que importan al reclutador…",
  "Eliminando redundancias y relleno…",
  "Traduciendo responsabilidades en resultados…",
  "Detectando palabras clave faltantes para el ATS…",
  "Normalizando fechas y formatos…",
  "Resumiendo sin perder sustancia…",
  "Cruzando requisitos con tu experiencia…",
  "Convirtiendo tareas en bullets accionables…",
  "Leyendo tu perfil con lupa…",
  "Alineando con la oferta…",
  "Eligiendo verbos con carácter…",
  "Midiendo logros con números…",
  "Hablándole bonito al ATS…",
];

export default function GeneratingOverlay({ open, onCancel, tips }: Props) {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const msgs = useMemo(
    () => (tips && tips.length ? tips : defaultTips),
    [tips]
  );

  useEffect(() => {
    setMounted(true);
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % msgs.length), 3000);
    return () => clearInterval(id);
  }, [open, msgs.length]);

  if (!mounted || !open) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[9999] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Generando CV"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel?.()}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Generando tu CV…
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-sm text-gray-600 hover:text-gray-900 rounded-md px-2 py-1 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200 progress">
          <div className="progress-bar h-full w-1/3 rounded-full"></div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="h-6 w-2/3 skeleton" />
          <div className="h-4 w-1/3 skeleton" />
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-3">
              <div className="h-4 w-5/6 skeleton" />
              <div className="h-3 w-[92%] skeleton" />
              <div className="h-3 w-4/5 skeleton" />
              <div className="h-3 w-3/5 skeleton" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-2/3 skeleton" />
              <div className="h-3 w-5/6 skeleton" />
              <div className="h-3 w-3/4 skeleton" />
              <div className="h-3 w-2/3 skeleton" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          {msgs[idx]}
          <span className="typing-dots ml-1" aria-hidden="true">
            ...
          </span>
        </p>
      </div>

      <style jsx>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          background: #eaeef5;
        }
        .skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.4s infinite;
        }
        .progress-bar {
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          animation: slide 1.6s ease-in-out infinite;
          border-radius: 9999px;
        }
        @keyframes slide {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(30%);
          }
          100% {
            transform: translateX(220%);
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .typing-dots::after {
          content: " ";
          animation: dots 1.4s steps(4, end) infinite;
          white-space: pre;
        }
        @keyframes dots {
          0% {
            content: "";
          }
          25% {
            content: ".";
          }
          50% {
            content: "..";
          }
          75% {
            content: "...";
          }
          100% {
            content: "";
          }
        }
      `}</style>
    </div>
  );

  return createPortal(overlay, document.body);
}
