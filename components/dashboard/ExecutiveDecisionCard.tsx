import { ArrowRight, CircleCheckBig } from "lucide-react";

interface ExecutiveDecisionCardProps {
  recommendation: string;
  detail: string;
}

export function ExecutiveDecisionCard({ recommendation, detail }: ExecutiveDecisionCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#174d3c] p-6 text-white shadow-[0_14px_30px_rgba(23,77,60,0.2)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#b9d7c9]">Executive question</p>
          <h2 className="mt-2 text-xl font-medium tracking-[-0.025em] sm:text-2xl">Should this initiative proceed to execution?</h2>
        </div>
        <CircleCheckBig className="size-7 shrink-0 text-[#9ed0b6]" aria-hidden="true" />
      </div>
      <div className="mt-7 border-y border-white/15 py-5">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#afd0c0]">RECOMMENDATION</p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">{recommendation}</p>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-[#c7ddd2]">{detail}</p>
      <a href="#next-actions" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d8ebdf] transition hover:text-white">Review next actions <ArrowRight className="size-4" aria-hidden="true" /></a>
    </section>
  );
}
