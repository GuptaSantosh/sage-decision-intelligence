import { Quote } from "lucide-react";

export function ExecutiveSummary({ summary }: { summary: string[] }) {
  return (
    <section className="rounded-2xl border border-[#dce7e1] bg-white p-6 shadow-[0_4px_16px_rgba(25,65,49,0.04)] sm:p-7">
      <div className="flex items-center gap-2 text-[#315446]"><Quote className="size-4 text-[#4d9477]" aria-hidden="true" /><h2 className="text-sm font-semibold">Executive summary</h2></div>
      <ul className="mt-5 space-y-4">
        {summary.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-[#61756b]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#68a78a]" />{point}</li>)}
      </ul>
    </section>
  );
}
