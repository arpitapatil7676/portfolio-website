import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!WEB3FORMS_KEY) {
      toast({ title: "Not configured yet", description: "Please reach out at " + portfolioData.email, variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        toast({ title: "Message Sent!", description: "Thank you — I'll get back to you soon." });
      } else {
        throw new Error(data.message ?? "Submission failed");
      }
    } catch {
      toast({ title: "Failed to send", description: "Please email me directly at " + portfolioData.email, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">// 08</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Get In Touch</h2>
          <div className="h-1 w-24 bg-primary mt-4" />
          <p className="font-mono text-muted-foreground mt-6 max-w-xl text-sm leading-relaxed">
            Ready to build something intelligent together? Drop a message and let's make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="border-2 border-foreground bg-card shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))] p-8">
              <h3 className="text-2xl font-black mb-8 pb-4 border-b-2 border-foreground/20">Contact Info</h3>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: portfolioData.email, href: `mailto:${portfolioData.email}` },
                  { icon: MapPin, label: "Location", value: "India", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-2 bg-primary border-2 border-foreground shrink-0">
                      <Icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="font-mono text-sm text-foreground hover:text-primary transition-colors font-bold break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="font-mono text-sm text-foreground font-bold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t-2 border-foreground/20">
                <p className="font-mono text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Socials</p>
                <div className="flex gap-3">
                  <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href={portfolioData.github} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="border-2 border-foreground bg-card shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0_0_hsl(var(--primary))] p-8 h-full">
              <h3 className="text-2xl font-black mb-8 pb-4 border-b-2 border-foreground/20">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="font-mono text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">{label}</label>
                      <input
                        id={id} name={id} type={type} required placeholder={placeholder}
                        className="w-full border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="font-mono text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Subject</label>
                  <input
                    id="subject" name="subject" required placeholder="Let's build something great!"
                    className="w-full border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Message</label>
                  <textarea
                    id="message" name="message" required placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full border-2 border-foreground bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-black border-2 border-foreground hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
