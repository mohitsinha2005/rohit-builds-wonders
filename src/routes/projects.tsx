import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionTitle, TiltCard } from "@/components/Layout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Rohit Raj Sharma" },
      { name: "description", content: "Selected projects: parking website, campus placement portal, Difa revenue growth and ML prediction models." },
      { property: "og:title", content: "Projects — Rohit Raj Sharma" },
      { property: "og:description", content: "Parking website, campus placement portal, Difa growth and ML models." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Projects,
});

const projects = [
  { n: "01", title: "Parking Website", desc: "Full stack platform for finding and booking parking slots.", tags: ["React", "PostgreSQL"] },
  { n: "02", title: "Campus Placement Website", desc: "Portal connecting students, recruiters and placement cells.", tags: ["Vue", "SQL"] },
  { n: "03", title: "Difa Revenue & Advertising", desc: "Data-driven ad strategy and funnel improvements for Difa Fashion.", tags: ["Analytics", "Digital marketing"] },
  { n: "04", title: "Prediction Models", desc: "Machine learning models trained for forecasting and prediction tasks.", tags: ["Python", "ML"] },
];

function Projects() {
  return (
    <>
      <SectionTitle eyebrow="Selected work" title="Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1}>
            <TiltCard className="h-full min-h-60">
              <p className="font-display text-5xl font-bold text-primary/40">{p.n}</p>
              <h3 className="mt-4 text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-accent">{t}</span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}
