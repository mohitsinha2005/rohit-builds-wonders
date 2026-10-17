import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, SectionTitle, TiltCard } from "@/components/Layout";
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

const stack = ["Python", "React JS", "Vue JS", "JavaScript", "Java", "PostgreSQL", "SQL", "Figma"];

const orgs = [
  { name: "Neurogati · CNS Lab", tag: "Internship · Oct 2025 – Mar 2026" },
  { name: "TG Consulting", tag: "Product Lead & Developer" },
  { name: "Gedi Foods", tag: "Food & Beverage" },
  { name: "Coding Bits", tag: "Tech education" },
  { name: "IIT Madras", tag: "Academia & research" },
  { name: "Difa Fashion", tag: "Fashion brand" },
];

const projects = [
  { n: "01", title: "Parking Website", desc: "Full stack platform for finding and booking parking slots.", tags: ["React", "PostgreSQL"] },
  { n: "02", title: "Campus Placement Website", desc: "Portal connecting students, recruiters and placement cells.", tags: ["Vue", "SQL"] },
  { n: "03", title: "Difa Revenue & Advertising", desc: "Data-driven ad strategy and funnel improvements.", tags: ["Analytics", "Marketing"] },
  { n: "04", title: "Prediction Models", desc: "Machine learning models for forecasting tasks.", tags: ["Python", "ML"] },
];

const certs = [
  { name: "Google Digital Marketing Expert", by: "Coursera · Google" },
  { name: "AI/ML Internship — Neurogati", by: "CNS Lab" },
  { name: "Internship Letter — TG Consulting", by: "Product Lead" },
  { name: "Topper as Sophomore", by: "Academic honour" },
];

function Home() {
  return (
    <>
      <section className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-mono text-sm tracking-wide text-accent"
          >
            {">"} data_scientist.init(name="Rohit") <span className="animate-pulse">▍</span>
          </motion.p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 80, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mr-4 inline-block text-foreground"
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <Reveal delay={0.8}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
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
            {[["7+", "organisations"], ["4", "ml_projects"], ["8", "tech_stack"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl font-semibold tracking-tight text-primary">{n}</p>
                <p className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <Portrait />
      </section>

      {/* About */}
      <section className="mt-32">
        <SectionTitle eyebrow="// about" title="What I do" />
        <Reveal>
          <p className="max-w-3xl text-lg text-muted-foreground">
            I build full stack web products and AI/ML automation pipelines — from clean interfaces
            designed in Figma to data models and prediction systems running in production.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          {stack.map((s) => (
            <span key={s} className="glass rounded-full px-5 py-2 text-sm font-medium">
              {s}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mt-6">
          <Link to="/about" className="font-mono text-sm text-accent hover:text-primary">
            more about me & certificates →
          </Link>
        </Reveal>
      </section>

      {/* Experience */}
      <section className="mt-32">
        <SectionTitle eyebrow="// experience" title="Teams I've built for" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orgs.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.06}>
              <TiltCard className="h-full">
                <h3 className="text-xl font-bold">{o.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{o.tag}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-6">
          <Link to="/experience" className="font-mono text-sm text-accent hover:text-primary">
            full experience →
          </Link>
        </Reveal>
      </section>

      {/* Projects */}
      <section className="mt-32">
        <SectionTitle eyebrow="// projects" title="Selected work" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <TiltCard className="h-full min-h-56">
                <p className="font-display text-5xl font-bold text-primary/40">{p.n}</p>
                <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-accent">{t}</span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-6">
          <Link to="/projects" className="font-mono text-sm text-accent hover:text-primary">
            all projects →
          </Link>
        </Reveal>
      </section>

      {/* Certifications */}
      <section className="mt-32">
        <SectionTitle eyebrow="// certifications" title="Certificates & honours" />
        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <TiltCard className="flex h-full items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.by}</p>
                </div>
                <span className="font-mono text-xs text-accent">✓</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-6">
          <Link to="/about" className="font-mono text-sm text-accent hover:text-primary">
            view certificate gallery →
          </Link>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="mt-32 pb-4 text-center">
        <SectionTitle eyebrow="// contact" title="Let's build something." />
        <Reveal>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Open to full stack, AI/ML automation and freelance collaborations.
          </p>
          <a href="mailto:rohitraj932005@gmail.com" className="mt-8 inline-block font-display text-2xl font-bold text-gradient md:text-4xl">
            rohitraj932005@gmail.com
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/downloads/Rohit_Raj_Sharma_Resume.pdf" download="Rohit_Raj_Sharma_Resume.pdf" className="ring-glow rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105">
              Download resume ↓
            </a>
            <Link to="/contact" className="glass rounded-full px-8 py-3.5 font-semibold transition-colors hover:border-primary">
              Contact page →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
