import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, SectionTitle, TiltCard } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Skills — Rohit Raj Sharma" },
      { name: "description", content: "Tech stack and certifications of Rohit Raj Sharma: Python, React, Vue, Java, PostgreSQL, SQL, Figma." },
      { property: "og:title", content: "About & Skills — Rohit Raj Sharma" },
      { property: "og:description", content: "Tech stack and certifications of Rohit Raj Sharma." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const stack = ["Python", "React JS", "Vue JS", "JavaScript", "Java", "PostgreSQL", "SQL", "Figma"];
const certs = [
  { title: "Google Digital Marketing Expert", by: "Google" },
  { title: "Topper as Sophomore", by: "Academic excellence award" },
];

function About() {
  return (
    <>
      <SectionTitle eyebrow="About" title="Engineer. Automator. Scholar." />
      <Reveal>
        <p className="max-w-3xl text-lg text-muted-foreground">
          I build full stack web products and AI/ML automation pipelines — from clean interfaces
          designed in Figma to data models and prediction systems running in production.
        </p>
      </Reveal>

      <h2 className="mb-6 mt-20 text-3xl font-bold">Tech stack</h2>
      <div className="flex flex-wrap gap-3">
        {stack.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.08 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
            className="glass rounded-full px-5 py-2.5 font-medium hover:border-primary"
          >
            {s}
          </motion.span>
        ))}
      </div>

      <h2 className="mb-6 mt-20 text-3xl font-bold">Certifications & honours</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <TiltCard>
              <p className="text-sm uppercase tracking-widest text-accent">{c.by}</p>
              <h3 className="mt-2 text-2xl font-bold">{c.title}</h3>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}
