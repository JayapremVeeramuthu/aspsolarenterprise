import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Animations";
import { Target, Eye, Lightbulb, Award, Users, TrendingUp } from "lucide-react";

const timeline = [
  { year: "2019", title: "Company Founded", desc: "ASP Solar Enterprise began with a vision to make solar energy accessible to all." },
  { year: "2020", title: "Product Line Expanded", desc: "Partnered with ASP Solar Enterprise to bring quality solar and electrical products." },
  { year: "2021", title: "500+ Clients Milestone", desc: "Reached 500+ business clients across India." },
  { year: "2023", title: "Pan-India Distribution", desc: "Expanded distribution network to cover major cities and rural areas." },
  { year: "2024", title: "Digital Transformation", desc: "Launched online platform for easier ordering and bulk inquiries." },
];

const About = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <FadeUp className="text-center mb-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">About ASP Solar Enterprise</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We are a trusted distributor of premium solar and electrical products, committed to powering India's sustainable future with quality and innovation.
        </p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <FadeUp>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">To accelerate India's transition to clean energy by providing affordable, high-quality solar products to every home and business.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">A solar-powered India where every household and business benefits from clean, renewable energy solutions.</p>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, n: "500+", l: "Happy Clients" },
              { icon: Award, n: "25+", l: "Products" },
              { icon: TrendingUp, n: "10K+", l: "Units Sold" },
              { icon: Lightbulb, n: "5+", l: "Years Experience" },
            ].map(s => (
              <StaggerItem key={s.l}>
                <motion.div whileHover={{ y: -4 }} className="bg-gray-800 shadow-md border border-gray-700 rounded-xl p-6 text-center">
                  <s.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="font-display text-2xl font-bold">{s.n}</div>
                  <p className="text-xs text-gray-400">{s.l}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeUp>
      </div>

      {/* Timeline */}
      <FadeUp className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Our Journey</h2>
      </FadeUp>
      <div className="max-w-2xl mx-auto space-y-8">
        {timeline.map((t, i) => (
          <FadeUp key={t.year} delay={i * 0.1}>
            <div className="flex gap-6">
              <div className="w-16 shrink-0 text-right">
                <span className="font-display font-bold text-primary">{t.year}</span>
              </div>
              <div className="relative pb-8 border-l-2 border-primary/20 pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-semibold mb-1">{t.title}</h4>
                <p className="text-sm text-gray-400">{t.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </div>
);

export default About;
