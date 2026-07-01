import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useEffect, useState } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((total / height) * 100);
      setShowScrollTop(total > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="border-t-2 border-foreground bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center font-black text-primary-foreground text-sm">
                AP
              </span>
              <span className="text-2xl font-black">
                Arpita<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="font-mono text-sm text-background/60 max-w-sm leading-relaxed">
              Python Developer &amp; Generative AI Engineer building intelligent solutions, one commit at a time.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border-2 border-background/40 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border-2 border-background/40 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${portfolioData.email}`}
              className="w-11 h-11 border-2 border-background/40 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-background/50">
          <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <p>Designed &amp; Developed with <span className="text-primary">♥</span></p>
        </div>
      </div>

      {/* Back to top */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="relative">
          <svg className="absolute -inset-1 w-[3.5rem] h-[3.5rem] -rotate-90 pointer-events-none">
            <circle cx="28" cy="28" r="26" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
            <circle
              cx="28" cy="28" r="26"
              stroke="hsl(var(--primary))" strokeWidth="2" fill="none"
              strokeDasharray="163.36"
              strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-background text-foreground border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors relative z-10"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
