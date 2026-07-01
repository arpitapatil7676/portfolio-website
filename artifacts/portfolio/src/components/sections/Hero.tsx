import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight, Mail, Download } from "lucide-react";
import { SiPython, SiReact, SiJavascript } from "react-icons/si";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = portfolioData.titles[titleIndex];
    let typingSpeed = isDeleting ? 60 : 110;

    if (!isDeleting && displayedText === currentTitle) {
      setTimeout(() => setIsDeleting(true), 2000);
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

  return (
    <section id="home" className="min-h-[100dvh] flex items-center pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 rounded-none mb-8 bg-background font-mono text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              VTU Computer Science · B.E 2022–2026
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6">
              {portfolioData.name.split(" ")[0]}<br />
              <span className="text-primary">{portfolioData.name.split(" ")[1]}</span>
            </h1>

            {/* Typewriter subtitle */}
            <div className="font-mono text-xl md:text-2xl text-muted-foreground mb-6 h-8">
              &gt;_{" "}
              <span className="text-foreground font-bold">
                {displayedText}
              </span>
              <span className="animate-pulse text-primary font-bold">|</span>
            </div>

            {/* Summary */}
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
              {portfolioData.summary}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#projects")}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-black border-2 border-foreground text-base hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 px-6 py-3 bg-background text-foreground font-black border-2 border-foreground text-base hover:bg-secondary hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <Mail className="h-4 w-4" /> Contact Me
              </button>
              <a
                href={portfolioData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-background text-foreground font-black border-2 border-border text-base hover:border-foreground hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </motion.div>

          {/* ── Right column — visual card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="border-2 border-foreground bg-card overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.9)] dark:shadow-[8px_8px_0_0_rgba(245,197,24,0.4)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-foreground bg-foreground">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-background font-mono text-xs">arpita@dev:~$</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm bg-foreground/5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1.5"
                >
                  <p><span className="text-primary font-bold">$</span> <span className="text-muted-foreground">whoami</span></p>
                  <p className="text-foreground font-bold pl-3">Python Developer &amp; Generative AI Engineer</p>
                  <p className="mt-4"><span className="text-primary font-bold">$</span> <span className="text-muted-foreground">cat skills.py</span></p>
                  <div className="pl-3 space-y-0.5 text-foreground">
                    <p><span className="text-purple-500">skills</span> = &#123;</p>
                    <p className="pl-4"><span className="text-blue-500">"languages"</span>: [<span className="text-green-600">"Python"</span>, <span className="text-green-600">"JS"</span>],</p>
                    <p className="pl-4"><span className="text-blue-500">"frontend"</span>: [<span className="text-green-600">"HTML"</span>, <span className="text-green-600">"CSS"</span>, <span className="text-green-600">"React"</span>],</p>
                    <p className="pl-4"><span className="text-blue-500">"ai_tools"</span>: [<span className="text-green-600">"ChatGPT"</span>, <span className="text-green-600">"Gemini"</span>],</p>
                    <p className="pl-4"><span className="text-blue-500">"status"</span>: <span className="text-primary font-bold">"Available for hire"</span></p>
                    <p>&#125;</p>
                  </div>
                  <p className="mt-4"><span className="text-primary font-bold">$</span> <span className="text-muted-foreground">python main.py</span></p>
                  <p className="pl-3 text-green-500 font-bold">→ Building something awesome... ✓</p>
                  <p className="animate-pulse text-primary font-bold">▋</p>
                </motion.div>
              </div>

              {/* Tech stack footer */}
              <div className="px-6 py-4 border-t-2 border-foreground bg-background flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider">Built with</span>
                <SiPython className="h-5 w-5 text-blue-500" />
                <SiReact className="h-5 w-5 text-cyan-400" />
                <SiJavascript className="h-5 w-5 text-yellow-400" />
              </div>
            </div>

            {/* Floating info chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-primary border-2 border-foreground px-4 py-2 font-black text-primary-foreground text-sm shadow-[3px_3px_0_0_rgba(0,0,0,0.9)]"
            >
              ✦ Available for Hire
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -bottom-4 -left-4 bg-background border-2 border-foreground px-4 py-2 font-black text-foreground text-sm shadow-[3px_3px_0_0_rgba(0,0,0,0.9)]"
            >
              B.E 2022 – 2026
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute top-1/2 -right-6 -translate-y-1/2 bg-foreground text-background border-2 border-foreground px-3 py-2 font-black text-xs shadow-[3px_3px_0_0_hsl(var(--primary))] rotate-90"
            >
              Gen AI
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <button
            onClick={() => scrollTo("#about")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5"
            >
              <div className="w-1 h-2 bg-current rounded-full" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
