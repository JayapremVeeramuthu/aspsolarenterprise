import { FadeUp } from "@/components/motion/Animations";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { sendToWhatsApp } from "@/utils/whatsapp";

export const CTASection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl bg-solar-gradient-dark p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, hsl(25 95% 53% / 0.3), transparent 70%)" }} />
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-accent/5 translate-x-1/3 translate-y-1/3" />

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
              <Button
                size="lg"
                onClick={() => sendToWhatsApp("Hello! I'm interested in your solar products. Can you help me find the right solution?")}
                className="h-12 px-8 bg-green-500 text-white hover:bg-green-400 text-white font-semibold shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Chat with Us
              </Button>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);
