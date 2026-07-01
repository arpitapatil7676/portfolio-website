import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, CheckCircle2 } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Certifications</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-card-border rounded-2xl p-8 shadow-md relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              
              <div className="flex items-start justify-between relative z-10 mb-6">
                <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <Award className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-muted-foreground">{cert.year}</span>
                  <div className="flex items-center gap-1 text-xs text-green-500 font-medium mt-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </div>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2">{cert.title}</h3>
              <p className="text-primary font-medium mb-6">{cert.organization}</p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Key Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
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
