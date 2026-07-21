import { Sparkles } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="Sage Decision Intelligence">
      <span className="flex size-9 items-center justify-center rounded-xl bg-[#174d3c] text-white shadow-sm">
        <Sparkles className="size-[18px]" aria-hidden="true" />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#173d31]">
        Sage <span className="font-normal text-[#668077]">Decision Intelligence</span>
      </span>
    </div>
  );
}
