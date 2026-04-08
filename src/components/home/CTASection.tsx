import { FadeUp } from "@/components/motion/Animations";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export const CTASection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl bg-solar-gradient-dark p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, hsl(25 95% 53% / 0.3), transparent 70%)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(0 0% 100%)" }}>
              Start Your Solar Journey Today
            </h2>
            <p className="text-lg mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
              Get expert consultation, competitive pricing, and reliable solar solutions for your home or business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-solar-gradient text-primary-foreground hover:opacity-90 h-12 px-8">
                <Link to="/products">Browse Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 border-primary/30 hover:bg-primary/10" style={{ color: "hsl(0 0% 100%)" }}>
                <Link to="/contact"><Phone className="mr-2 w-4 h-4" /> Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);
