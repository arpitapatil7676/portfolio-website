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
    const steps = 60;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased = 1 - Math.pow(1 - current / steps, 3);
      const val = eased * num;
      setDisplay(`${prefix}${Number.isInteger(num) ? Math.round(val) : Math.round(val * 10) / 10}${suffix}`);
      if (current >= steps) { clearInterval(timer); setDisplay(value); }
    }, 1800 / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{display}</span>;
}

export function Stats() {
  return (
    <section className="py-12 border-y-2 border-foreground bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x-2 divide-foreground"
        >
          {portfolioData.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
              }}
              className="flex flex-col items-center text-center px-6 py-4"
            >
              <p className="text-4xl md:text-5xl font-black text-primary-foreground tracking-tight">
                <CountUp value={stat.value} />
              </p>
              <p className="font-mono text-xs font-bold text-primary-foreground/80 mt-2 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
