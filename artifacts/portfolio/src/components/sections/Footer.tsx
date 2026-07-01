import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      // Show/hide button
      if (totalScroll > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center rounded-xl shadow-lg font-bold text-2xl mb-4">
              AP
            </span>
            <h2 className="text-xl font-bold mb-2">{portfolioData.name}</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Python Developer & Generative AI Specialist building intelligent solutions for the modern web.
            </p>
          </div>

          <div className="flex gap-4">
            <a 
              href={portfolioData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={portfolioData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={`mailto:${portfolioData.email}`}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed and Developed with <span className="text-red-500 mx-1 animate-pulse">❤️</span>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="relative">
          <svg className="absolute -inset-1 w-[3.5rem] h-[3.5rem] -rotate-90 pointer-events-none">
            <circle 
              cx="28" cy="28" r="26" 
              stroke="currentColor" strokeWidth="2" fill="none" 
              className="text-border" 
            />
            <circle 
              cx="28" cy="28" r="26" 
              stroke="currentColor" strokeWidth="2" fill="none" 
              className="text-primary"
              strokeDasharray="163.36"
              strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <Button 
            size="icon" 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-primary/25 bg-background text-foreground border border-border hover:bg-muted relative z-10"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
