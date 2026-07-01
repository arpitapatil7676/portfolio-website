import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { SiPython, SiReact, SiJavascript, SiMysql, SiHuggingface } from "react-icons/si";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    const currentTitle = portfolioData.titles[titleIndex];
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && displayedText === currentTitle) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % portfolioData.titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => 
        isDeleting 
          ? currentTitle.substring(0, prev.length - 1)
          : currentTitle.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Tech stack floating icons
  const icons = [
    { Icon: SiPython, color: "#3776AB", size: 40, delay: 0, x: "10%", y: "20%" },
    { Icon: SiReact, color: "#61DAFB", size: 50, delay: 1, x: "80%", y: "15%" },
    { Icon: SiJavascript, color: "#F7DF1E", size: 35, delay: 2, x: "70%", y: "70%" },
    { Icon: SiMysql, color: "#4479A1", size: 45, delay: 0.5, x: "20%", y: "60%" },
    { Icon: SiHuggingface, color: "#FFD21E", size: 38, delay: 1.5, x: "85%", y: "45%" },
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Particles/Dots */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] dark:opacity-[0.1]" />

      {/* Floating Icons */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute z-0 opacity-20 dark:opacity-30 pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: ["0%", "-30%", "0%"],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon size={item.size} color={item.color} />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4">
            Hi, I'm <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              {portfolioData.name}
            </span>
          </h1>
          
          <div className="h-12 md:h-16 flex items-center justify-center mb-6">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground">
              A{" "}
              <span className="text-foreground">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {portfolioData.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1 text-base h-12"
              onClick={() => scrollTo("#projects")}
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 bg-background hover:bg-muted transition-all hover:-translate-y-1 text-base h-12 border-2"
              asChild
            >
              <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="rounded-full px-8 hover:-translate-y-1 transition-all text-base h-12"
              onClick={() => scrollTo("#contact")}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollTo("#about")}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-current rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
