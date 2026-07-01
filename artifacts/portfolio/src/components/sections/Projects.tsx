import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github } from "lucide-react";

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const match = value.match(/([^0-9]*)([0-9.]+)([^0-9]*)/);
  const prefix = match ? match[1] : "";
  const num = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : value;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && match) {
      let start = 0;
      const steps = 60;
      const timer = setInterval(() => {
        start++;
        const eased = 1 - Math.pow(1 - start / steps, 3);
        setCount(eased * num);
        if (start >= steps) { clearInterval(timer); setCount(num); }
      }, 1500 / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, num, match]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="text-xl font-black font-mono text-primary">
        {match ? <>{prefix}{Math.round(count * 10) / 10}{suffix}</> : value}
      </div>
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 05</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Featured Projects</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ x: -4, y: -4, transition: { duration: 0.15 } }}
              className="bg-card border-2 border-foreground shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.85)] dark:hover:shadow-[8px_8px_0_0_hsl(var(--primary))] transition-all flex flex-col"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b-2 border-foreground/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-primary border-2 border-foreground flex items-center justify-center font-black text-primary-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-3 leading-tight">{project.title}</h3>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary/15 border border-primary/40 font-mono text-xs font-bold text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex-1 flex flex-col">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.map((feat, i) => (
                      <span key={i} className="text-xs px-2 py-1 border border-foreground/20 bg-secondary font-mono text-muted-foreground">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics strip */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t-2 border-foreground/10">
                  {project.metrics.map((metric, i) => (
                    <AnimatedCounter key={i} value={metric.value} label={metric.label} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
