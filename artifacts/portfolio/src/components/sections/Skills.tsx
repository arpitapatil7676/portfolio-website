import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code2, BrainCircuit, Wrench, Database, Layers, Lightbulb } from "lucide-react";

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const categories = [
    { title: "Programming Languages", icon: Code2, items: portfolioData.skills.programming.map(s => s.name), data: portfolioData.skills.programming },
    { title: "Generative AI", icon: BrainCircuit, items: portfolioData.skills.genAI },
    { title: "AI Tools", icon: Wrench, items: portfolioData.skills.tools },
    { title: "Databases", icon: Database, items: portfolioData.skills.databases },
    { title: "Core Skills", icon: Layers, items: portfolioData.skills.core },
    { title: "Soft Skills", icon: Lightbulb, items: portfolioData.skills.soft }
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit designed to build robust backend systems and intelligent AI solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card border border-card-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              {category.data ? (
                // Render progress bars for programming languages
                <div className="space-y-5">
                  {category.data.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Render chips for other categories
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-secondary hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-transparent text-sm rounded-md transition-colors font-medium"
                    >
                      {typeof skill === 'string' ? skill : ''}
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
