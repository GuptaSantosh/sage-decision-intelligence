"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Layers3 } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { mockAnalysis } from "@/lib/mock-data";
import type { DecisionSignal } from "@/types/analysis";
import { BusinessExposure } from "./BusinessExposure";
import { DecisionSignalDrawer } from "./DecisionSignalDrawer";
import { DecisionSignalsList } from "./DecisionSignalsList";
import { ExecutiveDecisionCard } from "./ExecutiveDecisionCard";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { HealthScoreCard } from "./HealthScoreCard";
import { RecommendedActions } from "./RecommendedActions";

export function ExecutiveDashboard() {
  const [selectedSignal, setSelectedSignal] = useState<DecisionSignal | null>(null);
  const analysis = mockAnalysis;
  return <div className="min-h-screen bg-[#f6f7f5] text-[#173d31]"><header className="border-b border-[#dfe8e3] bg-white/85 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"><BrandMark /><Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-[#5b766b] transition hover:text-[#1f5945]"><ArrowLeft className="size-4" aria-hidden="true" />New assessment</Link></div></header><main className="mx-auto max-w-7xl px-6 py-9 sm:py-12"><div className="flex flex-col justify-between gap-5 border-b border-[#dce7e1] pb-8 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold tracking-[0.13em] text-[#6d887c]">EXECUTIVE DECISION ASSESSMENT</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#1f493a] sm:text-4xl">{analysis.projectName}</h1><p className="mt-2 text-sm text-[#72867c]">Analysis prepared {analysis.analyzedAt} <span className="mx-1.5 text-[#b0bdb6]">•</span> {analysis.documentCount} documents reviewed</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dae7e0] bg-white px-3 py-1.5 text-xs font-medium text-[#567568]"><Layers3 className="size-3.5 text-[#4d9477]" aria-hidden="true" />Mock assessment</span></div><div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.8fr)]"><ExecutiveDecisionCard recommendation={analysis.recommendation} detail={analysis.recommendationDetail} /><HealthScoreCard score={analysis.healthScore} status={analysis.healthStatus} /></div><div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.8fr)]"><ExecutiveSummary summary={analysis.summary} /><BusinessExposure exposures={analysis.businessExposure} /></div><div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.8fr)]"><DecisionSignalsList signals={analysis.signals} onSelect={setSelectedSignal} /><RecommendedActions actions={analysis.nextActions} /></div><div className="mt-7 flex items-center gap-2 text-xs text-[#83948c]"><FileText className="size-3.5" aria-hidden="true" />This dashboard is populated with representative mock data for the MVP.</div></main><DecisionSignalDrawer signal={selectedSignal} onClose={() => setSelectedSignal(null)} /></div>;
}
