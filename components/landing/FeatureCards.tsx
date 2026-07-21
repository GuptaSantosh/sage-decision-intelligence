import { BadgeAlert, BriefcaseBusiness, Lightbulb } from "lucide-react";

const features = [
  { icon: BadgeAlert, title: "Decision Signals", description: "Prioritized risks, dependencies, and gaps that need executive attention.", output: "Top 5 prioritized signals" },
  { icon: BriefcaseBusiness, title: "Business Exposure", description: "A clear view of regulatory, timeline, and financial exposure.", output: "3 exposure dimensions" },
  { icon: Lightbulb, title: "Executive Recommendations", description: "Practical next actions to move forward with confidence.", output: "Focused next actions" },
];

export function FeatureCards() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 sm:grid-cols-3 sm:pb-24">
      {features.map(({ icon: Icon, title, description, output }) => (
        <article key={title} className="rounded-xl border border-[#e0e9e4] bg-white p-5 shadow-[0_1px_2px_rgba(21,61,47,0.03)]">
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#e7f2ec] text-[#34745c]">
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-sm font-semibold text-[#23493b]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#71827a]">{description}</p>
          <div className="mt-5 border-t border-[#edf2ef] pt-3">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#9aaaA2]">OUTPUT</p>
            <p className="mt-1 text-xs font-medium text-[#4f6f62]">{output}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
