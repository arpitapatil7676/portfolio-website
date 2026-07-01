import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar, ChevronRight, Award } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 04</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Experience</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-foreground bg-card shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))]"
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-foreground bg-foreground/5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary font-bold mt-1">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground border-2 border-foreground/30 px-3 py-1.5">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 border-2 border-foreground bg-primary text-primary-foreground font-mono text-xs font-black">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Achievement */}
                <div className="flex items-start gap-3 border-2 border-primary bg-primary/10 p-4 mb-6">
                  <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="font-black text-sm text-foreground">{exp.achievement}</p>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="flex items-start gap-3 text-muted-foreground font-mono text-sm"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      {resp}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
