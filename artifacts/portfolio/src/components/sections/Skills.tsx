import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code2, BrainCircuit, Cloud, Monitor, Lightbulb } from "lucide-react";

export function Skills() {
  const categories = [
    { title: "Programming Languages", icon: Code2, type: "bars" as const, data: portfolioData.skills.programming },
    { title: "AI & Machine Learning", icon: BrainCircuit, type: "chips" as const, items: portfolioData.skills.aiml },
    { title: "Front-End Technologies", icon: Monitor, type: "chips" as const, items: portfolioData.skills.frontend },
    { title: "Cloud & Infrastructure", icon: Cloud, type: "chips" as const, items: portfolioData.skills.cloud },
    { title: "Core Competencies", icon: Lightbulb, type: "chips" as const, items: portfolioData.skills.soft },
  ];

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 03</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Technical Arsenal</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
              }}
              whileHover={{ x: -3, y: -3, transition: { duration: 0.15 } }}
              className="bg-card border-2 border-foreground p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] dark:shadow-[4px_4px_0_0_hsl(var(--primary))] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:hover:shadow-[6px_6px_0_0_hsl(var(--primary))] transition-all"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-foreground/20">
                <div className="p-2 bg-primary border-2 border-foreground">
                  <category.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-black">{category.title}</h3>
              </div>

              {category.type === "bars" && category.data ? (
                <div className="space-y-5">
                  {category.data.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between font-mono text-sm mb-2 font-bold">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-3 w-full bg-secondary border border-border overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {category.items?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 border-2 border-foreground/30 bg-secondary font-mono text-sm font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
