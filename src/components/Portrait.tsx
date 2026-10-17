import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profile from "@/assets/profile.webp.asset.json";

export function Portrait() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="mx-auto w-full max-w-[17rem]"
    >
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="absolute -inset-3 rounded-[1.75rem] border border-primary/30" style={{ transform: "translateZ(-40px)" }} />
        <img
          src={profile.url}
          alt="Rohit Raj Sharma"
          className="ring-glow aspect-[4/5] w-full rounded-2xl object-cover object-top"
        />
        <div className="glass absolute -bottom-5 -left-5 px-4 py-2.5" style={{ transform: "translateZ(60px)" }}>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Currently</p>
          <p className="font-display text-sm font-bold text-primary">Data Science · AI/ML</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
