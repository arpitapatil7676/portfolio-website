import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

function AnimatedGPA({ target }: { target: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const timer = setInterval(() => {
      start++;
      const eased = 1 - Math.pow(1 - start / steps, 3);
      setValue(eased * target);
      if (start >= steps) { clearInterval(timer); setValue(target); }
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-5xl font-black font-mono text-primary tracking-tighter">
      {value.toFixed(1)}
    </div>
  );
}

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 07</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Education</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-foreground bg-card shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))]"
            >
              {/* Left accent bar */}
              <div className="flex">
                <div className="w-2 bg-primary shrink-0" />
                <div className="p-8 md:p-10 flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary border-2 border-foreground">
                          <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black leading-tight">{edu.degree}</h3>
                      </div>

                      <div className="font-mono text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        {edu.university}
                      </div>

                      <div className="inline-flex items-center gap-2 font-mono text-sm border-2 border-foreground/30 bg-secondary px-3 py-1.5 font-bold">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                    </div>

                    <div className="md:pl-8 md:border-l-2 border-foreground/20 flex flex-col items-start md:items-end">
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">CGPA</p>
                      <AnimatedGPA target={parseFloat(edu.cgpa)} />
                      <p className="font-mono text-xs text-muted-foreground mt-1">/ 10.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
