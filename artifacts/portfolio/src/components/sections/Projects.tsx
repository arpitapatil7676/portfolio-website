import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedCounter({ value, label }: { value: string, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number and prefix/suffix
  const match = value.match(/([^0-9]*)([0-9.]+)([^0-9]*)/);
  const prefix = match ? match[1] : "";
  const num = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : value;
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && match) {
      let start = 0;
      const end = num;
      const duration = 2000; // ms
      const incrementTime = 20; // ms
      const steps = duration / incrementTime;
      const step = end / steps;
      
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, num, match]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-2xl font-bold text-foreground font-mono">
        {match ? (
          <>
            {prefix}
            {Math.round(count)}
            {suffix}
          </>
        ) : value}
      </div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 10 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        className="h-full bg-card/40 backdrop-blur-xl border border-card-border rounded-2xl overflow-hidden shadow-xl hover:shadow-primary/20 transition-shadow group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-8 relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex gap-2">
              {project.github && (
                <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full bg-background/50 hover:bg-background border border-border">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.live && (
                <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full bg-background/50 hover:bg-background border border-border">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, i: number) => (
              <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          <div className="mb-8">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Key Features</h4>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature: string, i: number) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-border mt-auto">
            {project.metrics.map((metric: any, i: number) => (
              <AnimatedCounter key={i} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing scalable architectures, intelligent automation, and measurable impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioData.projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
