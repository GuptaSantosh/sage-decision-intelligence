import { Check } from "lucide-react";

export function RecommendedActions({ actions }: { actions: string[] }) {
  return <section id="next-actions" className="rounded-2xl border border-[#dce7e1] bg-white p-6 shadow-[0_4px_16px_rgba(25,65,49,0.04)] sm:p-7"><h2 className="text-lg font-semibold tracking-[-0.025em] text-[#244b3d]">Recommended next actions</h2><p className="mt-1 text-sm text-[#71837a]">Resolve these conditions before committing the initiative to execution.</p><ol className="mt-5 space-y-3">{actions.map((action, index) => <li key={action} className="flex items-start gap-3 rounded-xl bg-[#f6f9f7] p-3.5"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dceee3] text-xs font-semibold text-[#3d775f]">{index + 1}</span><span className="pt-0.5 text-sm leading-5 text-[#47665a]">{action}</span><Check className="ml-auto mt-0.5 size-4 shrink-0 text-[#81aa96]" aria-hidden="true" /></li>)}</ol></section>;
}
