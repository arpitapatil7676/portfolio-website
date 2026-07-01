import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

function CountUp({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
    if (!match) { setDisplay(value); return; }

    const prefix = match[1];
    const num = parseFloat(match[2]);
    const suffix = match[3];
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * num * 10) / 10;
      setDisplay(`${prefix}${Number.isInteger(num) ? Math.round(val) : val}${suffix}`);
      if (current >= steps) { clearInterval(timer); setDisplay(value); }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {portfolioData.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative text-4xl md:text-5xl font-black tracking-tight text-primary">
                  <CountUp value={stat.value} />
                </p>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium mt-1">{stat.label}</p>
              <div className="h-0.5 w-8 bg-primary/40 rounded-full mt-3 group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
