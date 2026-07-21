import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { DecisionSignal } from "@/types/analysis";

const priorityStyles = { high: "bg-[#fff0ed] text-[#a8402d]", medium: "bg-[#fff6df] text-[#9a6b1f]", low: "bg-[#edf5f0] text-[#41745e]" };

export function DecisionSignalsList({ signals, onSelect }: { signals: DecisionSignal[]; onSelect: (signal: DecisionSignal) => void }) {
  return (
    <section className="rounded-2xl border border-[#dce7e1] bg-white shadow-[0_4px_16px_rgba(25,65,49,0.04)]">
      <div className="flex items-center justify-between px-6 pb-4 pt-6 sm:px-7"><div><h2 className="text-lg font-semibold tracking-[-0.025em] text-[#244b3d]">Decision signals</h2><p className="mt-1 text-sm text-[#71837a]">The five findings that most affect execution readiness.</p></div><span className="hidden rounded-full bg-[#edf5f0] px-2.5 py-1 text-xs font-medium text-[#4d7867] sm:block">{signals.length} open</span></div>
      <div className="border-t border-[#edf2ef]">
        {signals.map((signal) => (
          <button key={signal.id} type="button" onClick={() => onSelect(signal)} className="group flex w-full items-center gap-3 border-b border-[#edf2ef] px-6 py-4 text-left transition last:border-b-0 hover:bg-[#f8fbf9] sm:gap-5 sm:px-7">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f2f6f3] text-xs font-semibold text-[#587469]">{signal.id}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#2d5144]">{signal.title}</span><span className="mt-1 hidden text-xs text-[#7b8c84] sm:block">{signal.exposure.join(" · ")}</span></span>
            <span className={`hidden rounded-full px-2 py-1 text-xs font-medium capitalize sm:block ${priorityStyles[signal.priority]}`}>{signal.priority}</span>
            <span className="hidden rounded-full bg-[#edf5f0] px-2 py-1 text-xs text-[#557369] md:block"><strong className="font-semibold text-[#2d5b49]">{signal.confidence}%</strong> confidence</span>
            <ChevronRight className="size-4 shrink-0 text-[#91a299] transition group-hover:translate-x-0.5 group-hover:text-[#39765e]" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="px-6 py-4 sm:px-7"><p className="flex items-center gap-1.5 text-xs font-medium text-[#5d7b6e]"><ArrowUpRight className="size-3.5" aria-hidden="true" /> Select a signal to review its evidence and recommendation.</p></div>
    </section>
  );
}
