import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Terminal, Code, Cpu } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-mono text-primary flex items-center gap-2">
              <Terminal className="h-6 w-6" /> root@arpita:~# whoami
            </h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a detail-oriented developer specializing in <strong className="text-foreground">Python</strong> and <strong className="text-foreground">Generative AI</strong>. My passion lies in architecting systems that are not just functional, but intelligent and forward-thinking.
              </p>
              <p>
                Whether I'm building multi-agent AI workflows, optimizing databases, or crafting seamless user experiences with React, I approach every problem with a deep curiosity and a commitment to engineering excellence.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-3">
              {portfolioData.aboutTags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
            <div className="bg-card border border-card-border rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-card-border bg-muted/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-xs font-mono text-muted-foreground">main.py</div>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto whitespace-pre">
                <span className="text-purple-500 dark:text-purple-400">class</span> <span className="text-blue-500 dark:text-blue-400">Developer</span>:
                <br />    <span className="text-purple-500 dark:text-purple-400">def</span> <span className="text-blue-500 dark:text-blue-400">__init__</span>(<span className="text-orange-500 dark:text-orange-400">self</span>):
                <br />        <span className="text-orange-500 dark:text-orange-400">self</span>.name = <span className="text-green-600 dark:text-green-400">"Arpita Patil"</span>
                <br />        <span className="text-orange-500 dark:text-orange-400">self</span>.roles = [<span className="text-green-600 dark:text-green-400">"Python Dev"</span>, <span className="text-green-600 dark:text-green-400">"Gen AI Eng"</span>]
                <br />        <span className="text-orange-500 dark:text-orange-400">self</span>.coffee_status = <span className="text-green-600 dark:text-green-400">"Full"</span>
                <br />
                <br />    <span className="text-purple-500 dark:text-purple-400">def</span> <span className="text-blue-500 dark:text-blue-400">build_future</span>(<span className="text-orange-500 dark:text-orange-400">self</span>):
                <br />        <span className="text-purple-500 dark:text-purple-400">while</span> <span className="text-orange-500 dark:text-orange-400">True</span>:
                <br />            code.write()
                <br />            <span className="text-purple-500 dark:text-purple-400">if</span> code.has_bugs():
                <br />                code.refactor()
                <br />            <span className="text-purple-500 dark:text-purple-400">else</span>:
                <br />                deploy()
                <br />                break
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
