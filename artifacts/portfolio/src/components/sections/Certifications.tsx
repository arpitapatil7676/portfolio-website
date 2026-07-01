import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, CheckCircle2 } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 06</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Certifications</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ x: -4, y: -4, transition: { duration: 0.15 } }}
              className="bg-card border-2 border-foreground p-8 shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.85)] dark:hover:shadow-[8px_8px_0_0_hsl(var(--primary))] transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary border-2 border-foreground">
                  <Award className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-muted-foreground">{cert.year}</span>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-mono font-bold mt-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-black mb-1 leading-tight">{cert.title}</h3>
              <p className="text-primary font-bold font-mono text-sm mb-6">{cert.organization}</p>

              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Topics Covered</p>
                <div className="flex flex-wrap gap-2">
                  {cert.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 border-2 border-foreground/30 bg-secondary font-mono font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                      {topic}
                    </span>
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
