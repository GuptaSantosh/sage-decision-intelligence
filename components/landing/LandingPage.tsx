"use client";

import { useState } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { FeatureCards } from "./FeatureCards";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { ProjectForm } from "./ProjectForm";
import { UploadZone } from "./UploadZone";

export function LandingPage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="min-h-screen bg-[#f6f7f5] text-[#173d31]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:py-7">
        <BrandMark />
        <span className="hidden rounded-full border border-[#dce8e1] bg-white px-3 py-1.5 text-xs font-medium text-[#597166] sm:block">Enterprise decision validation</span>
      </header>
      <main>
        <Hero />
        <section className="mx-auto mt-8 max-w-4xl px-6 pb-12 sm:mt-10 sm:pb-16">
          <div className="rounded-2xl border border-[#d6e4dc] bg-white p-6 shadow-[0_18px_48px_rgba(25,65,49,0.1)] sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#21483a]">Prepare your initiative for review</h2>
                <p className="mt-1 text-sm leading-6 text-[#71827a]">Add the core documents that describe the work, plan, and decision context.</p>
              </div>
              <span className="hidden rounded-md bg-[#edf5f0] px-2.5 py-1 text-xs font-medium text-[#4d7867] sm:block">Step 1 of 1</span>
            </div>
            <div className="mt-6">
              <UploadZone files={files} onFilesChange={setFiles} />
              <ProjectForm hasFiles={files.length > 0} />
            </div>
          </div>
        </section>
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
}
