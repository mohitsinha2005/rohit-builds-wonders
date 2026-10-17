import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Layout";
import { Portrait } from "@/components/Portrait";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rohit Raj Sharma — Full Stack & AI/ML Developer" },
      { name: "description", content: "Portfolio of Rohit Raj Sharma: full stack developer, AI/ML automation engineer and scholar." },
      { property: "og:title", content: "Rohit Raj Sharma — Full Stack & AI/ML Developer" },
      { property: "og:description", content: "Full stack developer, AI/ML automation engineer and scholar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const words = ["Rohit", "Raj", "Sharma"];

function Home() {
  return (
    <section className="grid min-h-[75vh] items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
      <div>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-sm uppercase tracking-[0.35em] text-primary"
      >
        Portfolio · 2026
      </motion.p>
      <h1 className="text-5xl font-extrabold leading-[0.95] md:text-7xl">
        {words.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0, y: 80, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`mr-4 inline-block ${i === 2 ? "text-gradient" : ""}`}
          >
            {w}
          </motion.span>
        ))}
      </h1>
      <Reveal delay={0.8}>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
          Full stack developer, AI/ML automation engineer and scholar — building products that
          ship, scale and learn.
        </p>
      </Reveal>
      <Reveal delay={1} className="mt-10 flex flex-wrap gap-4">
        <Link to="/projects" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">
          View projects
        </Link>
        <Link to="/contact" className="glass rounded-full px-7 py-3 font-semibold transition-colors hover:border-primary">
          Get in touch
        </Link>
        <a href="/downloads/Rohit_Raj_Sharma_Resume.pdf" download="Rohit_Raj_Sharma_Resume.pdf" className="glass rounded-full px-7 py-3 font-semibold text-accent transition-colors hover:border-primary">
          Resume ↓
        </a>
      </Reveal>
      <Reveal delay={1.2} className="mt-20 grid max-w-2xl grid-cols-3 gap-6">
        {[["7+", "Organisations"], ["4", "Key projects"], ["8", "Technologies"]].map(([n, l]) => (
          <div key={l}>
            <p className="font-display text-4xl font-bold text-primary">{n}</p>
            <p className="text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </Reveal>
      </div>
      <Portrait />
    </section>
  );
}
