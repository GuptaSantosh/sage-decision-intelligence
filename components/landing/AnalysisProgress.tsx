"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle, Sparkles } from "lucide-react";

const progressSteps = [
  "Preparing initiative context",
  "Reviewing submitted artifacts",
  "Mapping objectives and stakeholders",
  "Identifying dependencies",
  "Evaluating execution risks",
  "Preparing executive assessment",
];

export function AnalysisProgress({ fileCount }: { fileCount: number }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((currentStep) => Math.min(currentStep + 1, progressSteps.length - 1));
    }, 1_600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24" aria-live="polite">
      <div className="rounded-2xl border border-[#d6e4dc] bg-white p-7 shadow-[0_18px_48px_rgba(25,65,49,0.1)] sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e4f1ea] text-[#31715a]">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-medium text-[#4c7162]">Sage is analyzing your initiative</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#21483a]">
          Turning evidence into an executive decision.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#647970]">
          Reviewing {fileCount} selected {fileCount === 1 ? "artifact" : "artifacts"}. This usually takes a few moments.
        </p>
        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-[#e8efeb]">
          <div
            className="h-full rounded-full bg-[#4d9477] transition-all duration-700"
            style={{ width: `${Math.max(12, ((activeStep + 1) / progressSteps.length) * 92)}%` }}
          />
        </div>
        <ol className="mt-8 space-y-4">
          {progressSteps.map((step, index) => {
            const isComplete = index < activeStep;
            const isActive = index === activeStep;

            return (
              <li key={step} className={`flex items-center gap-3 text-sm ${isActive ? "font-medium text-[#285440]" : "text-[#7e9087]"}`}>
                <span className={`flex size-5 items-center justify-center rounded-full ${isComplete ? "bg-[#4d9477] text-white" : isActive ? "text-[#39765e]" : "border border-[#d9e4de] bg-white"}`}>
                  {isComplete ? <Check className="size-3" aria-hidden="true" /> : isActive ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
                </span>
                {step}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
