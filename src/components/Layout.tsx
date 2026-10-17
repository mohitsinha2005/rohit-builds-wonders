import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const Scene3D = lazy(() => import("./Scene3D"));

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative isolate min-h-screen">
      <div className="bg-pro pointer-events-none fixed inset-0 -z-10" />
      {mounted && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="glass flex items-center gap-1 px-2 py-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {path === l.to && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-secondary" />
              )}
              <span className="hidden sm:inline">{l.label}</span>
              <span className="sm:hidden">{l.label.slice(0, 4)}</span>
            </Link>
          ))}
        </nav>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={path}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <footer className="relative z-10 pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rohit Raj Sharma
      </footer>
    </div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      style={{ transformPerspective: 900 }}
      className={`glass p-6 transition-colors hover:border-primary/50 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 font-mono text-sm text-accent">{"// "}{eyebrow.toLowerCase()}</p>
      <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
    </Reveal>
  );
}
