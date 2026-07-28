import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code2, Briefcase, Mail, Moon, Sun, Menu, X, GraduationCap } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const NAVBAR_HEIGHT = 80;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - NAVBAR_HEIGHT - 10) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setMobileMenuOpen(false);
    // Wait for mobile menu to finish closing before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 border-b-2 border-border py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-2 shrink-0 group"
        >
          <span className="w-9 h-9 rounded-full bg-primary border-2 border-foreground flex items-center justify-center text-sm font-black text-primary-foreground">
            AP
          </span>
          <span className="font-black text-lg tracking-tight hidden sm:block">
            Arpita<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Desktop centered nav */}
        <nav className="hidden md:flex items-center gap-2 mx-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all duration-150 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
                    : "border-border bg-background text-foreground hover:border-foreground hover:bg-primary/10"
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full border-2 border-border bg-background flex items-center justify-center hover:border-foreground transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-foreground bg-primary text-primary-foreground text-sm font-bold hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] transition-all"
          >
            Resume ↗
          </a>
          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-full border-2 border-border bg-background flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-b-2 border-border"
          >
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </a>
                );
              })}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-foreground bg-primary text-primary-foreground font-bold mt-2"
              >
                Download Resume ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
