import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, SectionTitle } from "@/components/Layout";
import { Certificates } from "@/components/Certificates";
import profile from "@/assets/profile.webp.asset.json";

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

function About() {
  return (
    <>
      <SectionTitle eyebrow="About" title="Engineer. Automator. Scholar." />
      <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <img src={profile.url} alt="Rohit Raj Sharma" className="ring-glow h-40 w-40 rounded-full object-cover object-top" />
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
      <Certificates />
    </>
  );
}
