import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* BG gradient layers */}
    <div className="absolute inset-0 bg-solar-gradient-dark" />
    <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 70% 30%, hsl(25 95% 53% / 0.4), transparent 50%)" }} />
    <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 20% 80%, hsl(45 93% 47% / 0.3), transparent 50%)" }} />

    {/* Floating elements */}
    <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-[15%] w-32 h-32 rounded-2xl bg-primary/10 backdrop-blur border border-primary/20 hidden lg:block" />
    <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 right-[25%] w-20 h-20 rounded-xl bg-accent/10 backdrop-blur border border-accent/20 hidden lg:block" />
    <motion.div animate={{ y: [10, -20, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 left-[8%] w-16 h-16 rounded-lg bg-solar-green/10 backdrop-blur border border-solar-green/20 hidden lg:block" />

    <div className="container mx-auto px-4 relative z-10 pt-20">
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Trusted by 500+ Businesses Across India</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: "hsl(0 0% 100%)" }}
        >
          Powering the Future with{" "}
          <span className="text-gradient">Smart Energy</span>{" "}
          Solutions
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
          style={{ color: "hsl(0 0% 100% / 0.7)" }}
        >
          Advanced Solar & Electrical Systems for Homes & Businesses. Premium quality products backed by years of expertise.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <Button asChild size="lg" className="bg-solar-gradient text-primary-foreground hover:opacity-90 px-8 h-12 text-base">
            <Link to="/products">
              Explore Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 h-12 px-8 text-base" style={{ color: "hsl(0 0% 100%)" }}>
            <Link to="/contact">Request Bulk Quote</Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="flex gap-8 md:gap-12 mt-16"
        >
          {[{ n: "500+", l: "Businesses" }, { n: "25+", l: "Products" }, { n: "10K+", l: "Units Sold" }, { n: "4.5★", l: "Rating" }].map(s => (
            <div key={s.l}>
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">{s.n}</div>
              <div className="text-sm" style={{ color: "hsl(0 0% 100% / 0.5)" }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
