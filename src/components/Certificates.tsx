import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import google from "@/assets/google.jpg.asset.json";
import googlePdf from "@/assets/google-cert.pdf.asset.json";
import neuro from "@/assets/neurogati.png.asset.json";
import tg from "@/assets/tg.jpg.asset.json";
import tgPdf from "@/assets/tg-letter.pdf.asset.json";
import { Reveal, TiltCard } from "@/components/Layout";

const certs = [
  { title: "Foundations of Digital Marketing & E-commerce", by: "Google · Coursera · Jan 2025", img: google.url, file: googlePdf.url },
  { title: "Certificate of Internship", by: "Neurogati · CNS Lab · 2025–26", img: neuro.url, file: neuro.url },
  { title: "Internship Completion & Appraisal", by: "TG Consulting · Product Lead & Developer", img: tg.url, file: tgPdf.url },
];

export function Certificates() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <TiltCard className="h-full p-3">
              <button onClick={() => setOpen(c.img)} className="block w-full overflow-hidden rounded-xl">
                <img src={c.img} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 hover:scale-110" />
              </button>
              <div className="p-3">
                <p className="text-xs uppercase tracking-widest text-accent">{c.by}</p>
                <h3 className="mt-2 text-lg font-bold">{c.title}</h3>
                <a href={c.file} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-primary hover:underline">
                  View original →
                </a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <TiltCard className="flex h-full flex-col justify-center">
            <p className="font-display text-6xl font-bold text-primary">#1</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-accent">Academic honour</p>
            <h3 className="mt-2 text-lg font-bold">Topper as Sophomore</h3>
          </TiltCard>
        </Reveal>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-6 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.8, rotateX: 20 }} animate={{ scale: 1, rotateX: 0 }} exit={{ scale: 0.8 }}
              src={open} alt="Certificate" className="ring-glow max-h-[85vh] max-w-full rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
