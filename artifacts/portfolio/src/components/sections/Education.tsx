import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Education</h2>
          <div className="h-1 w-20 bg-primary rounded-full md:mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-card-border rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden"
            >
              {/* Decorative side border */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      {edu.degree}
                    </h3>
                  </div>
                  
                  <div className="text-lg text-muted-foreground font-medium mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {edu.university}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary w-fit px-3 py-1.5 rounded-md border border-border">
                    <Calendar className="h-4 w-4" />
                    {edu.period}
                  </div>
                </div>

                <div className="md:w-32 flex flex-col items-start md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-8">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    CGPA
                  </div>
                  <AnimatedGPA target={parseFloat(edu.cgpa)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedGPA({ target }: { target: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const step = target / steps;
      
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setValue(target);
          clearInterval(timer);
        } else {
          setValue(start);
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-primary font-mono tracking-tighter">
      {value.toFixed(1)}
    </div>
  );
}
