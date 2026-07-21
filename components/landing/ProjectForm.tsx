"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectFormProps {
  hasFiles: boolean;
}

export function ProjectForm({ hasFiles }: ProjectFormProps) {
  return (
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium text-[#315446]">
        Project name
        <input
          type="text"
          name="projectName"
          placeholder="e.g. Digital Claims Transformation"
          className="mt-2 h-11 w-full rounded-lg border border-[#d6e1db] bg-white px-3.5 text-sm text-[#23493b] outline-none transition placeholder:text-[#9aa9a1] focus:border-[#4d9477] focus:ring-4 focus:ring-[#4d9477]/10"
        />
      </label>
      <label className="block text-sm font-medium text-[#315446]">
        Business context <span className="font-normal text-[#84938c]">(optional)</span>
        <textarea
          name="businessContext"
          placeholder="What decision or initiative is this supporting?"
          rows={1}
          className="mt-2 min-h-11 w-full resize-none rounded-lg border border-[#d6e1db] bg-white px-3.5 py-3 text-sm text-[#23493b] outline-none transition placeholder:text-[#9aa9a1] focus:border-[#4d9477] focus:ring-4 focus:ring-[#4d9477]/10"
        />
      </label>
      <div className="sm:col-span-2 flex flex-col items-center gap-3 border-t border-[#e3ebe6] pt-6 sm:flex-row sm:justify-between">
        <p className="text-xs leading-5 text-[#77887f]">Upload your project artifacts to generate an executive decision assessment.</p>
        <Button
          type="button"
          size="lg"
          disabled={!hasFiles}
          className="h-12 rounded-lg bg-[#1f5945] px-6 text-sm font-semibold shadow-[0_6px_16px_rgba(31,89,69,0.22)] transition-all hover:-translate-y-px hover:bg-[#174d3c] hover:shadow-[0_9px_22px_rgba(31,89,69,0.28)] disabled:bg-[#c8d3cd] disabled:text-white disabled:shadow-none"
        >
          Analyze initiative
          <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
