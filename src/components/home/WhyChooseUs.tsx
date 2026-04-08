import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Animations";
import { Zap, Shield, Award, Truck } from "lucide-react";

const features = [
  { icon: Zap, title: "High Efficiency", desc: "Industry-leading solar conversion rates for maximum energy output", color: "text-primary" },
  { icon: Shield, title: "Long Lifespan", desc: "Built to last with premium materials and rigorous testing", color: "text-solar-green" },
  { icon: Award, title: "Certified Quality", desc: "ISI marked and BIS certified products you can trust", color: "text-accent" },
  { icon: Truck, title: "Bulk Supply", desc: "Large inventory ready for bulk orders across India", color: "text-solar-blue" },
];

export const WhyChooseUs = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeUp className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Why Choose ASP Solar?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Trusted by businesses for quality, reliability and value</p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-2xl p-6 text-center transition-shadow hover:shadow-[var(--shadow-hover)] h-full"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Animated counters */}
      <FadeUp className="mt-16">
        <div className="bg-solar-gradient rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ n: "10,000+", l: "Units Sold" }, { n: "500+", l: "Happy Clients" }, { n: "25+", l: "Products" }, { n: "5+", l: "Years Experience" }].map(s => (
              <div key={s.l}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-1"
                >{s.n}</motion.div>
                <p className="text-primary-foreground/70 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);
