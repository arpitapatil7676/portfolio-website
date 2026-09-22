import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, ExternalLink, Building2 } from "lucide-react";

const iconColors = [
  "bg-primary",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
];

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
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Certifications &amp; Achievements</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ x: -4, y: -4, transition: { duration: 0.15 } }}
              className="group bg-card border-2 border-foreground p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] dark:shadow-[4px_4px_0_0_hsl(var(--primary))] hover:shadow-[7px_7px_0_0_rgba(0,0,0,0.85)] dark:hover:shadow-[7px_7px_0_0_hsl(var(--primary))] transition-all flex flex-col gap-4"
            >
              {/* Icon + org row */}
              <div className="flex items-start gap-4">
                <div className={`shrink-0 p-2.5 border-2 border-foreground ${iconColors[idx % iconColors.length]}`}>
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-black leading-snug line-clamp-2">{cert.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <p className="text-primary font-bold font-mono text-xs truncate">{cert.organization}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground leading-relaxed flex-1">
                {cert.description}
              </p>

              {/* View on LinkedIn */}
              <a
                href={cert.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background font-mono text-sm font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all self-start"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View on LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
