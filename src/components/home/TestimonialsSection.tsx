import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Animations";
import { Star } from "lucide-react";
import { testimonials } from "@/data/products";

export const TestimonialsSection = () => (
  <section className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <FadeUp className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Real feedback from businesses and homeowners across India</p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t) => (
          <StaggerItem key={t.id}>
            <motion.div whileHover={{ y: -4 }} className="bg-gray-800 shadow-md border border-gray-700 rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{t.avatar}</div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
