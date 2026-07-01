import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 01</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">About Me</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed font-mono">
              <p>
                I'm a detail-oriented developer specialising in{" "}
                <strong className="text-foreground">Python</strong> and{" "}
                <strong className="text-foreground">Generative AI</strong>. I love building systems
                that are not just functional — but intelligent and forward-thinking.
              </p>
              <p>
                Whether I'm architecting multi-agent AI workflows, writing clean Python backends,
                or crafting responsive interfaces with HTML, CSS, and React, I approach every
                problem with curiosity and a commitment to quality.
              </p>
              <p>
                I'm a fresh graduate (B.E 2026) eager to grow alongside a team that values
                impactful software and continuous learning.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-3">
              {portfolioData.aboutTags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="px-4 py-2 border-2 border-foreground bg-background font-mono text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — code card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="border-2 border-foreground bg-card shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))]">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-foreground bg-foreground">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 font-mono text-xs text-background/80">developer.py</span>
              </div>

              {/* Code block */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-purple-500 dark:text-purple-400">class</span>{" "}
                  <span className="text-blue-500 dark:text-blue-400">Developer</span>:
                </p>
                <p className="pl-4">
                  <span className="text-purple-500 dark:text-purple-400">def</span>{" "}
                  <span className="text-blue-500 dark:text-blue-400">__init__</span>(self):
                </p>
                <p className="pl-8">
                  self.name = <span className="text-green-600 dark:text-green-400">"Arpita Patil"</span>
                </p>
                <p className="pl-8">
                  self.roles = [<span className="text-green-600 dark:text-green-400">"Python Dev"</span>,{" "}
                  <span className="text-green-600 dark:text-green-400">"Gen AI Eng"</span>]
                </p>
                <p className="pl-8">
                  self.location = <span className="text-green-600 dark:text-green-400">"India"</span>
                </p>
                <p className="pl-8">
                  self.open_to_work = <span className="text-primary font-bold">True</span>
                </p>
                <br />
                <p className="pl-4">
                  <span className="text-purple-500 dark:text-purple-400">def</span>{" "}
                  <span className="text-blue-500 dark:text-blue-400">build</span>(self):
                </p>
                <p className="pl-8">
                  <span className="text-purple-500 dark:text-purple-400">while</span>{" "}
                  <span className="text-primary font-bold">True</span>:
                </p>
                <p className="pl-12">code.write()</p>
                <p className="pl-12">
                  <span className="text-purple-500 dark:text-purple-400">if</span> bugs:
                </p>
                <p className="pl-16">code.refactor()</p>
                <p className="pl-12">
                  <span className="text-purple-500 dark:text-purple-400">else</span>:
                </p>
                <p className="pl-16">deploy() <span className="text-green-500">✓</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
