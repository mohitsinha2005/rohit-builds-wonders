import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionTitle, TiltCard } from "@/components/Layout";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Rohit Raj Sharma" },
      { name: "description", content: "Organisations Rohit Raj Sharma has worked with: Gedi Foods, Coding Bits, Cosmic Soul, IIT Madras, Difa Fashion." },
      { property: "og:title", content: "Experience — Rohit Raj Sharma" },
      { property: "og:description", content: "Gedi Foods, Coding Bits, Cosmic Soul, IIT Madras, Difa Fashion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Experience,
});

const orgs = [
  { name: "Gedi Foods", tag: "Food & Beverage" },
  { name: "Coding Bits", tag: "Tech education" },
  { name: "Cosmic Soul", tag: "Brand & wellness" },
  { name: "IIT Madras", tag: "Academia & research" },
  { name: "Difa Fashion", tag: "Fashion brand" },
];

function Experience() {
  return (
    <>
      <SectionTitle eyebrow="Worked with" title="Teams I've built for" />
      <div className="relative space-y-6 border-l border-border pl-8">
        {orgs.map((o, i) => (
          <Reveal key={o.name} delay={i * 0.08} className="relative">
            <span className="absolute -left-[41px] top-8 h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
            <TiltCard className="flex items-center justify-between">
              <h3 className="text-2xl font-bold md:text-3xl">{o.name}</h3>
              <p className="text-sm text-muted-foreground">{o.tag}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}
