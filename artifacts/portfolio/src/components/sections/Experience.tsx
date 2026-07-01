import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar, ChevronRight, Award } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Professional Experience</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border" />

              <div className="relative flex flex-col md:flex-row items-start justify-between group">
                {/* Timeline dot */}
                <div className="absolute left-[-32px] md:left-[50%] md:-translate-x-1/2 top-1.5 md:top-6 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
                </div>

                <div className="md:w-[45%] md:pr-12 md:text-right mb-4 md:mb-0 pt-1 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{exp.title}</h3>
                  <div className="text-lg text-primary font-medium mb-3 flex items-center md:justify-end gap-2">
                    <Briefcase className="h-4 w-4 md:hidden" />
                    {exp.company}
                  </div>
                  <div className="flex items-center md:justify-end gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-secondary text-xs rounded-md font-mono text-muted-foreground border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-[45%] md:pl-12 pt-1 md:pt-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 text-primary flex items-start gap-3">
                    <Award className="h-5 w-5 shrink-0 mt-0.5" />
                    <p className="font-semibold text-sm leading-snug">{exp.achievement}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.4 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <ChevronRight className="h-5 w-5 shrink-0 text-primary/60 mt-0.5" />
                        <span className="text-sm leading-relaxed">{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
