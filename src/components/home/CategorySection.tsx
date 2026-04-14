import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/Animations";
import { ArrowRight } from "lucide-react";

export const CategorySection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeUp className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Explore our complete range of solar and electrical products</p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link to={`/products?category=${cat.slug}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden bg-gray-800 shadow-md border border-gray-700 aspect-[4/3] flex flex-col items-center justify-end p-6 transition-shadow hover:shadow-[var(--shadow-hover)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                />
                <div className="relative z-10 text-center bg-gray-800/90 shadow-md backdrop-blur-sm rounded-xl px-4 py-3 w-full">
                  <h3 className="font-display font-semibold text-sm md:text-base">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.productCount} products</p>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
