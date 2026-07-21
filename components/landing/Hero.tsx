import { ArrowDown, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 text-center sm:pt-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e1dc] bg-white px-3 py-1.5 text-xs font-medium text-[#46665b] shadow-sm">
        <span className="size-1.5 rounded-full bg-[#4d9477]" />
        Pre-execution decision validation
      </div>
      <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-[#173d31] sm:text-6xl sm:leading-[1.04]">
        Transform complex decisions into <span className="text-[#31715a]">confident execution.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#62746d] sm:text-lg">
        Surface hidden risks, missing stakeholders, and fragile assumptions before your initiative becomes expensive to change.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#547066]">
        {['Evidence-backed', 'Executive-ready', 'Action-oriented'].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-[#4d9477]" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
      <ArrowDown className="mx-auto mt-12 size-4 text-[#9aaca5]" aria-hidden="true" />
    </section>
  );
}
