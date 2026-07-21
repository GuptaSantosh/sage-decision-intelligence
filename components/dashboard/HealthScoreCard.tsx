import { Activity } from "lucide-react";

interface HealthScoreCardProps {
  score: number;
  status: string;
}

export function HealthScoreCard({ score, status }: HealthScoreCardProps) {
  return (
    <section className="rounded-2xl border border-[#dce7e1] bg-white p-6 shadow-[0_4px_16px_rgba(25,65,49,0.04)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#315446]">Project health</p>
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#e7f2ec] text-[#37755e]"><Activity className="size-4" aria-hidden="true" /></span>
      </div>
      <div className="mt-8 flex items-end gap-2">
        <span className="text-5xl font-semibold tracking-[-0.06em] text-[#1e4e3c]">{score}</span>
        <span className="mb-1 text-sm text-[#74867d]">/ 100</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e6eeea]">
        <div className="h-full rounded-full bg-[#4d9477]" style={{ width: `${score}%` }} />
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-[#497063]"><span className="size-2 rounded-full bg-[#d89d3e]" />{status}</p>
    </section>
  );
}
