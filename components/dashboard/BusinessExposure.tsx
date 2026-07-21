import { BadgeDollarSign, CalendarClock, Scale } from "lucide-react";
import type { BusinessExposure as BusinessExposureType } from "@/types/analysis";

const icons = { Regulatory: Scale, Timeline: CalendarClock, Financial: BadgeDollarSign };
const levelStyles = { high: "bg-[#fff0ed] text-[#a8402d]", medium: "bg-[#fff6df] text-[#9a6b1f]", low: "bg-[#edf5f0] text-[#41745e]" };

export function BusinessExposure({ exposures }: { exposures: BusinessExposureType[] }) {
  return <section className="rounded-2xl border border-[#dce7e1] bg-white p-6 shadow-[0_4px_16px_rgba(25,65,49,0.04)] sm:p-7"><h2 className="text-lg font-semibold tracking-[-0.025em] text-[#244b3d]">Business exposure</h2><p className="mt-1 text-sm text-[#71837a]">The dimensions requiring active oversight.</p><div className="mt-5 space-y-4">{exposures.map(({ area, level, detail }) => { const Icon = icons[area]; return <div key={area} className="flex gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf5f0] text-[#3d7961]"><Icon className="size-[18px]" aria-hidden="true" /></span><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><h3 className="text-sm font-semibold text-[#35584a]">{area}</h3><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${levelStyles[level]}`}>{level}</span></div><p className="mt-1 text-xs leading-5 text-[#5e756b]">{detail}</p></div></div>; })}</div></section>;
}
